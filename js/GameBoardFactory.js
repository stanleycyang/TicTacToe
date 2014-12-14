(function(){

	angular
		.module("TicTacToe")
		.factory("GameBoardFactory", GameBoardFactory);
		
		GameBoardFactory.$inject = ["PlayerFactory", "WelcomeFactory", 
			"$firebase"
		];

		function GameBoardFactory(PlayerFactory, WelcomeFactory, $firebase){

			// Constructor function (add parameters)
			var GameBoard = function(){
				// Capture variable
				var self = this;

				// Set the number of tiles
				var NUM_TILES = 9;

				// Creates Firebase Arrays
				var ref = new Firebase("https://glowing-fire-8440.firebaseio.com/Board");
				self.board = $firebase(ref).$asArray();

				var ref2 = new Firebase("https://glowing-fire-8440.firebaseio.com/Players");
				self.Players = $firebase(ref2).$asArray();					

				var ref3 = new Firebase("https://glowing-fire-8440.firebaseio.com/Turn");
				self.turn = $firebase(ref3).$asArray();

				// var ref4 = new Firebase("https://glowing-fire-8440.firebaseio.com/Waiting");
				// self.waiting = $firebase(ref4).$asArray();
				

				// When the board loads
				self.board.$loaded().then(function(){
					self.Players.$loaded().then(function(){
						self.turn.$loaded().then(function(){						

						// If the board already has value, DONT RUN this code
						if(self.board.length === 0){
							// Create a storage for the board				
							for(var i = 0; i < NUM_TILES; i++){
								self.board.$add(
									{sign: ""}	
								);
							}	
						}					
						
						// Start game
						self.Player = new PlayerFactory(self.turn, self.Players);
						self.startGame = new WelcomeFactory(self.Player, self.Players, self.turn);
						// Click event
						self.clickOnTile = self.Player.clickOnTile;	

						// When the window is closed
						window.onbeforeunload = confirmExit;
						
						function confirmExit()
						{							
							self.Player.leavePage(self.Players, self.board);		
						}

						});	
					});
				});							
			};
			return GameBoard;
		}		


})();