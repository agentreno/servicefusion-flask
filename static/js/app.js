angular.module("PeopleApp", ["restangular"])
.factory("PeopleService", ["Restangular", function(Restangular){
   return Restangular.all("people");
}])
.controller("PeopleController", ["PeopleService", function(PeopleService){
   var self = this;
   self.people = PeopleService.getList().$object;

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
         self.people.splice(index, 1);
      }
   };
}]);
