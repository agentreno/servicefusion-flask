import re
from flask import Flask, render_template
from flask_restful import reqparse, Resource, Api

app = Flask(__name__)
api = Api(app)

# Validators
def valid_zipcode(value):
   if re.match(r"^[0-9]{5}(?:-[0-9]{4})?$", value) is None:
      raise ValueError("Invalid zipcode format")
   return value

# Parsers and internal data structures
people = {}
pid = 1
parser = reqparse.RequestParser()
parser.add_argument("firstname", required=True)
parser.add_argument("lastname", required=True)
parser.add_argument("dateofbirth", required=True)
parser.add_argument("zipcode", type=valid_zipcode, required=True)

# REST API resources
class Person(Resource):
   def get(self, person_id):
      return {person_id: people[person_id]}

   def delete(self, person_id):
      del people[person_id]
      return '', 204


class PersonList(Resource):
   def get(self):
      return people

   def post(self):
      global pid
      args = parser.parse_args()
      person_id = pid
      pid += 1
      people[person_id] = {
         "firstname": args["firstname"],
         "lastname": args["lastname"],
         "dateofbirth": args["dateofbirth"],
         "zipcode": args["zipcode"]
      }
      return people[person_id], 201

api.add_resource(PersonList, "/persons")
api.add_resource(Person, "/person/<int:person_id>")

# Static content and application launcher
@app.route("/")
def home():
   return render_template("home.html")

if __name__ == "__main__":
   app.run()
