// Global Variables
var currentTeamElement = document.getElementById("currentTeam");
var firstSquare = -1;
var playerOne = true;
var unavailableSquares = [];
var squares;
var playerColour = "#5386E4";
var playerName = "Two";

function squareClicked(id) {
    // Ensure that the square that was clicked hasn't already been selected
    if(!unavailableSquares.includes(id)) {
        // Check if the player has already selected a square
        if(firstSquare == -1) { // No square has been selected yet
            // Highlight the square in the players colour
            document.getElementById(id).style.borderColor = playerColour;
            // Set the first square to the id
            firstSquare = id;
            // Add the first square to the list of unavailable squares
            unavailableSquares.push(firstSquare);
        }
        else { // A second sqaure has been selected
            // Check if the squares are adjacent
            if(firstSquare == id + 1 || firstSquare == id - 1) {
                // Colour the squares background colour
                changeSquareColour(firstSquare, id, playerColour);

                // Add the second square to the list of unavailable squares
                unavailableSquares.push(id);

                // Switch teams
                switchTeams();

                // Reset the first square
                firstSquare = -1;
                
                // Loop through all the square to determine if there are any more possible combinations
                var remainingCombinations = 0;
                for(var i = 0; i < squares; i++) {
                    var count = 0;

                    console.log(i + "," + unavailableSquares.includes(i));
                    
                    // Only check if the square is available
                    if(!unavailableSquares.includes(i)) {
                        for(var j = 0; j < unavailableSquares.length; j++) {
                            if(i == squares - 1) { // If the square is on the edge
                                // Check if there exists a square that is adjacent to the current id
                                if(i == unavailableSquares[j] + 1) {
                                    // Then there must be an adjacent square that has been highlighted
                                    count++;
                                }
                            }
                            else if(i == 0) {
                                // Check if there exists a square that is adjacent to the current id
                                if(i == unavailableSquares[j] - 1) {
                                    // Then there must be an adjacent square that has been highlighted
                                    count++;
                                }
                            }
                            else { // If the square is in the middle
                                // Check if there exists a square that is adjacent to the current id
                                if(i == unavailableSquares[j] + 1 || i == unavailableSquares[j] - 1) {
                                    // Then there must be an adjacent square that has been highlighted
                                    count++;
                                }
                            }
                        }

                        // Check if there have been 2 adjacant squares
                        console.log("Square " + i + ", has " + count + " adjacent squares");
                        if(i == 0 || i == squares - 1) {
                            if(count != 1) {
                                // Then there must be a available square combination
                                remainingCombinations++;
                            }
                        }
                        else {
                            if(count != 2) {
                                // Then there must be a available square combination
                                remainingCombinations++;
                            }
                        }
                    }
                }

                console.log(remainingCombinations);
                // Determine if there is a winner (i.e: no more remaining combinations)
                if(remainingCombinations == 0) {
                    // Alert the players of the winner
                    alert("Player " + playerName + " Wins!");
                    // Reset the game
                    reset();
                }
            }
            else {
                // Alert the player of their error
                alert("Error: Squares must be adjacent.")
            }
        }
    }
    else if(firstSquare == id) { // The player clicked on the same square
        // 'Deselect' the first square
        document.getElementById(id).style.borderColor = "white";
        unavailableSquares.pop();
        // Reset the first square
        firstSquare = -1;
    }
    else { // The player clicked on a coloured square
        // Alert the player of their error
        alert("Error: You must selelct a white square");
    }
}

// Changes the background and border colour of two squares
function changeSquareColour(square1, square2, colour) {
    document.getElementById(square1).style.backgroundColor = colour;
    document.getElementById(square2).style.backgroundColor = colour;
    document.getElementById(square1).style.borderColor = colour;
    document.getElementById(square2).style.borderColor = colour;
}

// Reset the game
function reset() {
    // Reset all variables
    unavailableSquares = [];
    firstSquare = -1;
    if(!playerOne) {
        switchTeams();
    }
    // Delete all squares and reset layout
    document.getElementById("strip").innerHTML = "";
    document.getElementById("strip").style.height = "0vh";
    document.body.style.height = "80vh";
    document.body.style.paddingTop = "0vh";
    document.body.style.justifyContent = "center";
    document.getElementById("reset-button").style.display = "none";
    document.getElementById("textBoxStripCount").style.display = "inline";
    document.getElementById("start-button").style.display = "inline";
    document.getElementById("textBoxStripCount").value = "";
}

// Switch all the team related elements
function switchTeams() {
    // Determine the current team
    if(playerOne) {
        playerColour = "#F07167";
        playerName = "One";
        playerOne = false;
    }
    else {
        playerColour = "#5386E4";
        playerName = "Two";
        playerOne = true;
    }
}

// Function to generate the strip of squares
function start() {
    // Get the number of squares
    var numSquares = document.getElementById('textBoxStripCount').value;

    // Check that the number of squares is valid
    if (numSquares > 20 || numSquares < 3) {
        // Set the number of squares to 10(default)
        numSquares = 10;
    }

    squares = numSquares;
    // Get the strip using the class name
    var stripDiv = document.getElementById("strip");
    console.log(stripDiv.children.length)
    // Remove any existing squares
    while (stripDiv.childNodes.length != 0) {
        console.log("Removed: " + stripDiv.firstChild)
        stripDiv.removeChild(stripDiv.firstChild);
    }

    // Adjust CSS
    stripDiv.setAttribute("style", "height: 60vh")
    document.body.setAttribute("style", "height: 100vh;padding-top:10vh;")
    document.getElementById("reset-button").style.display = "inline";
    document.getElementById("textBoxStripCount").style.display = "none";
    document.getElementById("start-button").style.display = "none";

    // Determine width and height of squares
    var length = ((100 / numSquares) - 2);
    if (length > 20) {
        length = 20;
    }
    var sideLength = length + "vw";
    var styleStr = "width:" + sideLength + ";height:" + sideLength + ";";

    for (var i = 0; i < numSquares; i++) {
        // Create the square element
        var square = document.createElement("button");
        square.setAttribute("class", "square");
        square.setAttribute("style", styleStr);
        square.setAttribute("id", i)
        square.setAttribute("onclick", "squareClicked(" + i + ")")
        // Add a new square
        stripDiv.appendChild(square);
    }
}