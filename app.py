import re
from flask import Flask, render_template, request
from flask_restful import reqparse, Resource, Api

app = Flask(__name__)
api = Api(app)

# Validators
def valid_zipcode(value):
   if re.match(r"^[0-9]{5}(?:-[0-9]{4})?$", value) is None:
      raise ValueError("Invalid zipcode format")
   return value

# Parsers and internal data structures
people = {
   1: {
      "firstname": "Karl", 
      "lastname": "Hopkinson-Turrell", 
      "dateofbirth": "31/08/87", 
      "zipcode": "12345", 
      "image": "/static/images/daniel.jpg"
   }
}
pid = 2
parser = reqparse.RequestParser()
parser.add_argument("firstname", required=True)
parser.add_argument("lastname", required=True)
parser.add_argument("dateofbirth", required=True)
parser.add_argument("zipcode", type=valid_zipcode, required=True)

# REST API resources
class Person(Resource):
   def get(self, person_id):
      return {person_id: people[person_id]}

   def put(self, person_id):
      if person_id in people.keys():
         people[int(person_id)] = request.json
         return {person_id: people[person_id]}

   def delete(self, person_id):
      if person_id in people.keys():
         del people[person_id]
         return '', 204
      else:
         return '', 404


class PersonList(Resource):
   def get(self):
      outlist = []
      for (key, val) in people.items():
         person = val
         person["id"] = key
         outlist.append(person)
      return outlist

   def post(self):
      global pid
      args = parser.parse_args()
      person_id = pid
      pid += 1
      people[person_id] = {
         "firstname": args["firstname"],
         "lastname": args["lastname"],
         "dateofbirth": args["dateofbirth"],
         "zipcode": args["zipcode"],
         "image": "/static/images/jenny.jpg"
      }
      return people[person_id], 201

api.add_resource(PersonList, "/people")
api.add_resource(Person, "/people/<int:person_id>")

# Static content and application launcher
@app.route("/")
def home():
   return render_template("home.html")

if __name__ == "__main__":
   app.run()
