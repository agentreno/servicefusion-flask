angular.module("PeopleApp", ["restangular"])
.factory("PeopleService", ["Restangular", function(Restangular){
   return {
      "post": function(person){
         return Restangular.all("people").post(person);
      },
      "all": function() {
         return Restangular.all("people").getList().$object;
      },
      "one": function(id) {
         return Restangular.one("people", id);
      }
   }
}])
.controller("PeopleController", ["PeopleService", function(PeopleService){
   var self = this;
   self.people = PeopleService.all();

   self.showModal = function(){
      $(".ui.small.modal").modal("show");
   };

   self.addPerson = function(newperson){
      $(".ui.small.modal").modal("hide");
      newperson.image = "/static/images/jenny.jpg";
      self.people.push(newperson);
      PeopleService.post(newperson);
   };

   self.deletePerson = function(person){
      var index = self.people.indexOf(person);
      if(index > -1){
         PeopleService.one(self.people[index].id).remove();
         self.people.splice(index, 1);
      }
   };
}]);
