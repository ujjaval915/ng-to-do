/**
 * Created by Ujjaval on 8/4/2016.
 */
toDoApp.factory("todoService", ["$http", function($http){

    //each function return a promise object
    return {
        get:function() {
        return $http.get("/api/todos");
        },
        create : function(todoData) {
            return $http.post("/api/todos", todoData);
        },
        delete : function(id){
            console.log(id);
            return $http.delete("/api/todos/" + id);
        }
    }

}]);