# Homework 2 - Rock, Paper, Scissors

Work with your partner to create a game of 'Rock Paper Scissors' that runs until one player has three wins

* Store the player names and number of wins for each player in variables
* Use a while loop to run the game until one player has 3 wins
* Use the following code to randomly select a weapon

```javascript
var weapons = ["rock", "paper", "scissors"];

var weaponOfChoice = weapons[parseInt(Math.random() * weapons.length) % 3];
```

* Output each players hand to the console
* Use an `if` or `switch` statement to determine a winner of the round
* Output the round winner's name to the console
* Create a way to track how many rounds each player has won
* When one player wins 3 rounds, announce that player's name as the game winner
* Push the code to our class GitHub Repo
* See below for all possible winning outcomes
