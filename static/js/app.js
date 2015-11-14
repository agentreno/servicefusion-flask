angular.module("PeopleApp", [])
.controller("PeopleController", [function(){
   var self = this;
   self.people = [
      {
         "firstname": "Karl",
         "lastname": "Hopkinson-Turrell",
         "dateofbirth": "31/08/87",
         "zipcode": "12345",
         "image": "/static/images/daniel.jpg"
      },
      {
         "firstname": "Jenny",
         "lastname": "Jennison",
         "dateofbirth": "01/01/01",
         "zipcode": "12346",
         "image": "/static/images/jenny.jpg"
      }
   ];

   self.showModal = function(){
      $(".ui.small.modal").modal("show");
   };

   self.addPerson = function(newperson){
      $(".ui.small.modal").modal("hide");
      newperson.image = "/static/images/jenny.jpg";
      self.people.push(newperson);
      console.log(self.people);
   };
}]);
