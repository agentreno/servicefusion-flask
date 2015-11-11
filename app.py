from flask import Flask
from flask_restful import reqparse, Resource, Api

app = Flask(__name__)
api = Api(app)

people = {}
pid = 1
parser = reqparse.RequestParser()
parser.add_argument("name")

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
      people[person_id] = {"name": args["name"]}
      return people[person_id], 201

api.add_resource(PersonList, "/persons")
api.add_resource(Person, "/person/<int:person_id>")

@app.route("/")
def home():
   return "Homepage"

if __name__ == "__main__":
   app.run()
