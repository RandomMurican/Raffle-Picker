var app = angular.module("rafflePicker", []);
app.controller("myCtrl", function($scope) {
    $scope.entries = [];
    $scope.errorMessage = "";
    $scope.winner = "";
    $scope.success = true;
    $scope.addItem = function () {
        if ($scope.addUser == "") {
          $scope.errorMessage = "NULL NULL NULL NULL NULL NULL.";
          return
        }
        if ($scope.addEntry < 0) {
          $scope.errorMessage = "I banned negative entries. Sorry if you're trying to delete some.";
          return
        }
        if ($scope.addEntry == 0) {
          $scope.errorMessage = "Entries should be greater than 0 stupid.";
          return
        }
        if (isNaN($scope.addEntry)) {
          $scope.errorMessage = "Try again with a valid number of entries.";
          return
        }
        $scope.errorMessage = "";
        for (person in $scope.entries) {
          console.log($scope.entries[person].Name + " " + $scope.addUser)
          if ($scope.entries[person].Name == $scope.addUser) {
            $scope.entries[person].Entries += $scope.addEntry;
            $scope.addUser = "";
            $scope.addEntry = 0;
            document.getElementById('main').focus();
            return;
          }
        }
        $scope.entries.push({Name: $scope.addUser, Entries: $scope.addEntry});
        $scope.addUser = "";
        $scope.addEntry = "";
        document.getElementById('main').focus();
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.entries.splice(x, 1);
    }
    $scope.pickWinner = function () {
      $scope.success = true;
      $scope.errorMessage = "";
      var sum = 0;

      for (person in $scope.entries) {
        sum += $scope.entries[person].Entries;
      }

      var winner = Math.random() * sum;

      for (person in $scope.entries) {
        winner -= $scope.entries[person].Entries;
        if (winner <= 0) {
          $scope.winner = $scope.entries[person].Name;
          return;
        }
      }
      $scope.winner = "There was an issue picking the winner. Sorry.";
      $scope.success = false;
    }
    $scope.clearWinner = function () {
      $scope.success = true;
      $scope.winner = "";
      $scope.errorMessage = "";
    }
});
