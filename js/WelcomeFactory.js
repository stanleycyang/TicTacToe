(function(){

	angular
		.module("TicTacToe")
		.factory("WelcomeFactory", WelcomeFactory);
		
		

		function WelcomeFactory(){

			var Welcome = function(Player, Players, turn){
				// capture variable
				var self = this;

				// Define players				
				self.Players = Players;														

				// Define turns 
				self.turn = turn;				
				
				// If self.turn already exists
				if(self.turn.length === 0){
					// Determines who starts the turn randomly
					var randomTurn = Math.floor(Math.random() * 2) + 1;											
					self.turn.$add(randomTurn);																		
				}				

				(function init(){	
					personArrivesOnPage(Player);	
																											
				})();

				// Function to run when person arrives
				function personArrivesOnPage(player){
					// Procedural: only allow 2 players to play. Add else if we want to create a queue.
					
					if(self.Players.length < 2){

						var name = prompt("What is your name?", "Harry Potter");
						// alert(name + (self.Players.length + 1));
						player.setAttr(name, self.Players.length + 1);

						// Save the player's attributes
						var Player = player.getAttr();						

						// // Push the new Player into the array
						self.Players.$add(Player);						
												
					}
				}
			};
			
			return Welcome;

		}

})();