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
    let gameEnabled = false;
    
    const enableGame = function(){
        gameEnabled = true;
    }

    const disableGame = function(){
        gameEnabled = false;
    }    

    const isGameEnabled = function(){
        return gameEnabled;
    }

    const placeMarker = function(posX, posY){
            if(!gameEnabled){
                return "none";
            }
            if (posX < 1 || posX > 3) {
                console.log("Invalid X coordinate");
                return "none";
            }
            if (posY < 1 || posY > 3) {
                console.log("Invalid Y coordinate");
                return "none";
            }
            if (board[posX - 1][posY - 1] != "e"){
                console.log("Spot already taken");
                return "none";
            }

            const markerPlaced = currentPlayer;
            board[posX - 1][posY - 1] = markerPlaced;
            currentPlayer = currentPlayer == "cross" ? "circle" : "cross";
            numMarkersPlaced++;

            return markerPlaced;
        }
    
    const getGameState = function(){
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
            switch (getGameState()){
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
    
    const newGame = function(){
            board = [
            ["e", "e", "e"], 
            ["e", "e", "e"], 
            ["e", "e", "e"]];
            currentPlayer = "cross";    
            numMarkersPlaced = 0;            
        }
    
    return {
            enableGame,
            disableGame,
            isGameEnabled,
            placeMarker,
            getGameState,
            displayBoard,
            getCurrentPlayer,
            getResult,
            newGame,
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
const CIRCLE_MARKER_PATH = "./circle-svgrepo-com.svg";
const CROSS_MARKER_PATH = "./cross-svgrepo-com.svg";

const gameboardSquares = document.querySelectorAll("div.gameboard > div");
const newGameButton = document.querySelector("div.game-inputs > button");
const gameLog = document.querySelector("div.game-log");

let player1;
let player2;
/********************************************/
/*Event listeners*/
/********************************************/
gameboardSquares.forEach((el) =>{
    el.addEventListener("click", (event) => {
        if(!game.isGameEnabled()) return;

        const [posX, posY] =
            getGameboardSquarePosition(event.currentTarget);
        
        const placedMarker = game.placeMarker(posX, posY);

        placeMarkerInGameboardSquare(event.currentTarget, placedMarker);

        checkGameStatus();
    });
});

newGameButton.addEventListener("click", () => {
    clearGameboardSquares(gameboardSquares);
    const createPlayerSuccessful = createPlayers();
    if(createPlayerSuccessful){
        updateGameLog(`New match between ${player1.getName()} and ${player2.getName()}`);
        game.enableGame();
        game.newGame();
    }
});

/********************************************/
/*Functions*/
/********************************************/
function getGameboardSquarePosition(gameboardSquare){
    const [posX, posY] = [
        +gameboardSquare.dataset.row,
        +gameboardSquare.dataset.column
    ];

    return [posX, posY];
}

function placeMarkerInGameboardSquare(gameboardSquare, placedMarker){
    if(placedMarker !== "none"){
        const gameboardSquareMarker = document.createElement("img");
        if(placedMarker === "cross"){
            gameboardSquareMarker.setAttribute("src", CROSS_MARKER_PATH);
        }
        else{
            gameboardSquareMarker.setAttribute("src", CIRCLE_MARKER_PATH);
        }
        gameboardSquare.appendChild(gameboardSquareMarker);
    }
}

function clearGameboardSquares(gameboardSquares){
    gameboardSquares.forEach((el) => {
        if(el.firstChild !== null) el.removeChild(el.firstChild);
    });
}

function checkGameStatus(){
    const gameStatus = game.getGameState();
    if(gameStatus != "play"){
        updateGameLog(game.getResult(player1, player2));
        game.disableGame();
    }
}

function updateGameLog(message){
    const gameLogMessage = document.createElement("p");
    const dateTime = new Date().toLocaleString();
    gameLogMessage.textContent = `${dateTime}: ${message}`;
    gameLog.appendChild(gameLogMessage);
}

function createPlayers(){
    const player1FieldName = document.querySelector("div.game-inputs > div.player1 > input#player1");
    const player2FieldName = document.querySelector("div.game-inputs > div.player2 > input#player2");
    let successful;

    if (player1FieldName.value === "" || player2FieldName.value === ""){
        alert("Names can't be empty!");
        successful = false;
    }
    else if(player1FieldName.value === player2FieldName.value){
        alert("Names can't be identical!");
        successful = false;
    }
    else{
        player1 = newPlayer(player1FieldName.value, "cross");
        player2 = newPlayer(player2FieldName.value, "circle");
        successful = true;
    }

    return successful;
}