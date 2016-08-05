/**
 * Created by Ujjaval on 8/4/2016.
 */
toDoApp.controller('todoController', ["$scope", "$http", "todoService", function($scope, $http, todoService){

    $scope.formData = {};

    //get
    //when loading on the page, get all the todos and show them
    //use the service to get all the todos
    todoService.get().success(function (data) {
       $scope.todos = data;
    });

    //create serviec
    //when submitting the add form, send the text to the node API
    $scope.createTodo = function () {

        //Validate the formData to make sure that sth is there
        //if form is empty, nothing will happen
        //can not keep adding the same to-do anymore
        if($scope.formData.text != undefined) {
            // call the create function from our service (returns a promise object)
            //if successful creation, call get function to get all the new todos
            todoService.create($scope.formData).success(function(data){
               $scope.formData = {}; //clear the form so our user is ready
               $scope.todos = data; // assign our new list of todos
            });
        };
    };

    //Delete
    //delete a todo after checking it

    $scope.deleteTodo = function (id) {
        console.log(id);
        //if successful deleation, call our get function to get all the new todos
        todoService.delete(id).success(function (data) {
            $scope.todos = data; //assign our new list of todos
        });
    };

}]);