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
   self.editperson = null;
   self.zipcoderegex = /^[0-9]{5}(?:-[0-9]{4})?$/;

   self.showAddModal = function(){
      $("#addModal").modal("show");
   };

   self.showUpdateModal = function(person){
      var index = self.people.indexOf(person);
      self.people.splice(index, 1);
      self.editperson = person;
      $("#updateModal").modal("show");
   };

   self.addPerson = function(newperson){
      $("#addModal").modal("hide");
      newperson.image = "/static/images/jenny.jpg";
      self.people.push(newperson);
      PeopleService.post(newperson);
   };

   self.updatePerson = function(){
      $("#updateModal").modal("hide");
      self.people.push(self.editperson);
      self.editperson.save();
   }

   self.deletePerson = function(person){
      var index = self.people.indexOf(person);
      if(index > -1){
         PeopleService.one(self.people[index].id).remove();
         self.people.splice(index, 1);
      }
   };
}])
.directive("applyErrorOnInvalid", ["$compile", function($compile){
   return {
      compile: function($element, $attrs){
         var formname = $element.parent("form").attr("name");
         var fieldname = $element.find("input").attr("name");
         $attrs.$set("ng-class", "{error: " + formname + "." + fieldname +
            ".$invalid && " + formname + "." + fieldname + ".$dirty }");
         $element.removeAttr("apply-error-on-invalid");
         return function($scope, $element){
            $compile($element)($scope);
         }
      }
   };
}]);
