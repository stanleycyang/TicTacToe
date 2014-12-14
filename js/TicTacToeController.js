(function(){

	angular
		.module("TicTacToe")
		.controller("TicTacToeController", TicTacToeController);

		// Dependencies for Controller
		TicTacToeController.$inject = ["GameBoardFactory"];

		// Define the TicTacToeController
		function TicTacToeController(GameBoardFactory){
			var self = this;			
			
			// Create objects
			self.GameBoard = new GameBoardFactory();							
			
		}


})();