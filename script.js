/********************************************/
/*Tic Tac Toe game module pattern*/
/********************************************/
const game = (function(){
    let board = [
        ["e", "e", "e"], 
        ["e", "e", "e"], 
        ["e", "e", "e"]];
    let currentPlayer = "cross";    
    let numMarkersPlaced = 0;
    
    const placeMarker = function(posX, posY){
            if (posX < 1 || posX > 3) {
                console.log("Invalid X coordinate");
                return;
            }
            if (posY < 1 || posY > 3) {
                console.log("Invalid Y coordinate");
                return;
            }
            if (board[posX - 1][posY - 1] != "e"){
                console.log("Spot already taken");
                return;
            }
            board[posX - 1][posY - 1] = currentPlayer;
            currentPlayer = currentPlayer == "cross" ? "circle" : "cross";
            numMarkersPlaced++;
        }
    
    const getGameStatus = function(){
            if (numMarkersPlaced < 3) return "play";
            else{
                const crossWin =
                    (board[0][0] == "cross" && board[0][1] == "cross" && board[0][2] == "cross") ||
                    (board[1][0] == "cross" && board[1][1] == "cross" && board[1][2] == "cross") ||
                    (board[2][0] == "cross" && board[2][1] == "cross" && board[2][2] == "cross") ||
                    (board[0][0] == "cross" && board[1][0] == "cross" && board[2][0] == "cross") ||
                    (board[0][1] == "cross" && board[1][1] == "cross" && board[2][1] == "cross") ||
                    (board[0][2] == "cross" && board[1][2] == "cross" && board[2][2] == "cross") ||
                    (board[0][0] == "cross" && board[1][1] == "cross" && board[2][2] == "cross") ||
                    (board[2][0] == "cross" && board[1][1] == "cross" && board[0][2] == "cross");
                const circleWin =
                    (board[0][0] == "circle" && board[0][1] == "circle" && board[0][2] == "circle") ||
                    (board[1][0] == "circle" && board[1][1] == "circle" && board[1][2] == "circle") ||
                    (board[2][0] == "circle" && board[2][1] == "circle" && board[2][2] == "circle") ||
                    (board[0][0] == "circle" && board[1][0] == "circle" && board[2][0] == "circle") ||
                    (board[0][1] == "circle" && board[1][1] == "circle" && board[2][1] == "circle") ||
                    (board[0][2] == "circle" && board[1][2] == "circle" && board[2][2] == "circle") ||
                    (board[0][0] == "circle" && board[1][1] == "circle" && board[2][2] == "circle") ||
                    (board[2][0] == "circle" && board[1][1] == "circle" && board[0][2] == "circle");
                if (crossWin || circleWin){
                    if(crossWin) return "cross";
                    else return "circle";
                }
                else if(numMarkersPlaced == 9){
                    return "draw";
                }
                else{
                    return "play";
                }
            }
        }

    
    const displayBoard = function(){
            board.forEach((el) => {
                    console.log(el);
                });
        }
        
    const getCurrentPlayer = function(){
            return currentPlayer;
        }
        
    const getResult = function(player1, player2){
            switch (getGameStatus()){
                case "play":
                    return "Game is not over!"
                    break;
                case "draw":
                    return "This is a draw!"
                    break;
                case "cross":
                    if (player1.getMarkerType() == "cross"){
                        return `${player1.getName()} wins!`;
                    }
                    else return `${player2.getName()} wins!`;
                    break;
                case "circle":
                    if (player1.getMarkerType() == "circle"){
                        return `${player1.getName()} wins!`;
                    }
                    else return `${player2.getName()} wins!`;
                    break;                    
            }
        }
    
    return {
            placeMarker,
            getGameStatus,
            displayBoard,
            getCurrentPlayer,
            getResult,
        };
    
  })();

/********************************************/
/*Player object factory*/
/********************************************/
function newPlayer(name, marker){
        const getName = function(){
                return name;
            }
        const getMarkerType = function(){
                return marker;
            }
        const getPlayerInfo = function() {
                return `My name is ${getName()} and I am ${getMarkerType()}`;
            }   
        return{
                getName,
                getMarkerType,
                getPlayerInfo,
            };
    }
    
/********************************************/
/*Main portion*/
/********************************************/
const nomis = newPlayer('Nomis', 'circle');
const simon = newPlayer('Simon', 'cross');


console.log(simon.getPlayerInfo());
console.log(nomis.getPlayerInfo());


while (game.getGameStatus() == "play"){
    const input = prompt(`${game.getCurrentPlayer()} plays, enter position ("x,y")`);
    const [posX, posY] = [+input.split(",")[0], +input.split(",")[1]]; 
    game.placeMarker(posX, posY);
    game.displayBoard();
}
console.log(game.getGameStatus());
console.log(game.getResult(simon, nomis));
