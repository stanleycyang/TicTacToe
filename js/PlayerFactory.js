(function(){

	angular
		.module("TicTacToe")
		.factory("PlayerFactory", PlayerFactory);
		

		function PlayerFactory(){
			// Constructor function (add parameters)
			var Player = function(turn, Players){

				var self = this;
				self.turn = turn;									

				// Set attributes of the player
				self.setAttr = function(name, number){
					self.name = name;
					self.number = number;					
					self.score = 0;

					if(self.number == 1){
						self.sign = "X";	
					}else{
						self.sign = "O";
					}									
				};

				// Get attributes of the player
				self.getAttr = function(){
					return {
						name: self.name,
						number: self.number,						
						score: self.score,
						sign: self.sign
					};	
				};
																																																																						

				// When user clicks on tile
				self.clickOnTile = function($index, board){
					// Inserts a player's sign into the box
					// console.log(self.turn[0].$value);
					if(self.turn[0].$value === self.number){
						// Add sign to the index
						board[$index].sign = self.sign;
						board.$save(board[$index]);

												

						if(self.turn[0].$value === 1){
							self.turn[0].$value += 1;							
							self.turn.$save(self.turn[0]);	
																								
						}else{
							self.turn[0].$value -= 1;							
							self.turn.$save(self.turn[0]);							
						}

						// Been clicked, check if they win
						self.determineWin(board, self.sign);
						

					}else{
						confirm("Please wait for your turn.");
					}
																																				
				};
								

				self.clearBoard = function(board){
					for(var i = 0; i < board.length; i++){
						board.$remove(board[i]);
						board.$add({sign:""});
					}
				};

				self.leavePage = function(players, board){
					for(var i = 0; i < players.length; i++){
						players.$remove(players[i]);
					}
					self.clearBoard(board);
				};


				self.determineWin = function(board, symbol){

						function CheckCatsGame(value, index, ar) {						    
							if (value.sign !== ""){
								return true;
							}else{
								return false;
							}
						}

						function addScore(){
							// Add 1 to the score of winning player
							Players[self.number-1].score += 1;							
							Players.$save(Players[self.number-1]);													
						}


						if(
							(board[0].sign === symbol && board[1].sign === symbol && board[2].sign === symbol) ||
							(board[3].sign === symbol && board[4].sign === symbol && board[5].sign === symbol) ||
							(board[6].sign === symbol && board[7].sign === symbol && board[8].sign === symbol) ||
							(board[0].sign === symbol && board[3].sign === symbol && board[6].sign === symbol) ||
							(board[1].sign === symbol && board[4].sign === symbol && board[7].sign === symbol) ||
							(board[2].sign === symbol && board[5].sign === symbol && board[8].sign === symbol) ||
							(board[0].sign === symbol && board[4].sign === symbol && board[8].sign === symbol) ||
							(board[2].sign === symbol && board[4].sign === symbol && board[6].sign === symbol)
							){

							// User has won the game!
							addScore();

							alert("Congrats! You are a winner!");
							self.clearBoard(board);							

						}else{
							// Cats game
							if (board.every(CheckCatsGame)){
							    alert("Cats game");
							    self.clearBoard(board);
							}							
						}				
				};
			};
			return Player;
		}		
})();