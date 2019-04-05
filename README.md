# SEI-Project-1
Vanilla JavaScript Game

### Timeframe
7 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* git

* _add other technologies here... (HTML5 Audio, CSS animation, localStorage etc)_

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

_Screen shot_

![Beyoncé](https://media.giphy.com/media/RX7N03MEUafW8/giphy.gif)

_Link to live site_

### Introduction
_Description of the game_
An updated version of the classic two player guessing game Battleships, in this format the player competes against the computer in a race to sink the opponent's fleet before the opponent can sink theirs. The game ends when one person has achieved 17 hits on the opponent's board.

### Controls
_User controls_
The player clicks to place ships on their board and then clicks on the opponent's to guess squares.

### Game Instructions
1. _How the game works. Break the process down into steps. Add a screenshot for each step_
1. On loading the player sees two blank grids and the rules menu above. The player has the option to
2. The player has the option to toggle the rules by clicking the button, although on screen updates below the grid also guide the player throughout the game.
3. The player is invited to place ships (one of each class) on their grid.
4. Ships can be placed either vertically or horizontally (by clicking the toggle buttons) anywhere on the board, provided there is space and ships do not overlap.
5. Once five ships are on the board, the player can no longer click on their own grid and now has the option to start guessing where the opponent's ships are.
6. As the player clicks on the opponent's grid, the computer simultaneously places guesses on the player's board.
7. The game ends when one player achieves 17 hits.

## Process
_Describe the process of building the game. How did you get started? How did you manage your time? How would you do things next time?_
I began by writing some pseudocode. With hindsight I now realise that I should have spent longer on this and definitely ought to have translated it into the form of Trello to do lists, as later on in the project I sometimes felt stressed if I tried to juggle multiple problems or failed to break down a big problem into smaller steps.

As for the code itself, I wrote minimal HTML, creating the starting grids with JS DOM methods and a for loop. The next stage (and biggest challenge) was to create a function to randomly place the computer's ships on the board. This required me to find a random square, pick a random orientation (horizontal or vertical) and use a for loop to place the correct number of squares. In itself this was fairly straightforward, though I also had to make sure that the ships didn't overlap or wrap around two rows. To overcome these problems I created a while loop to check that the ship would not wrap around two rows and made another for loop to test if there was a clear run of squares on which to place the ship. If the conditions are not met, the function then calls itself until they are satisfied.

The other big task I had to accomplish was to write the logic for the computer attack strategy. I did this by creating another recursive function based around an extended 'if...else' statement, which decided what to do depending on whether computer had missed, hit, or hit two times in a row. The function also made use of an array of potential next moves created after the first hit. The function then splices the array, as the computer misses adjacent squares. If the cpu achieves two hits in a row, a vector is created to determine the direction of the next hit and inverted when the cpu gets its next miss. I had to make the function recursive to prevent the cpu from attacking squares which already contained a hit or a miss.

I spent the penultimate day of the project debugging. This was the first time that I had made use of the debugger statement, which allowed me to see that on occasion my cpu attack was function was not splicing the array as I had thought.

Although the game does not rely on flashy visuals or animation, I spent part of the final day adding event listeners to buttons and spans, in order to the make the page a bit more user-friendly and guide the player through the set up phase.
### Challenges
_Describe the biggest challenges. How did you overcome them? Did you decide to pivot because of time constraints? What did you learn from these problems?_

The biggest challenge was probably the creation of the computer ship placement function. After coming close to a breakthrough on the second day of the project, I eventually concluded that I would have to start again from scratch. The biggest lessons learned from this project were not code-specific, though I enjoyed using lots of methods and strategies that I had never employed before. Rather, I learned how to manage a longer project. Where previously in test-driven coding challenges and course homework I had been able to force problems to conform to my solutions, in this project I regularly had to make the difficult decision to jettison lengthy functions and start from the beginning.

On the same theme, I learned to appreciate the importance of refactoring code as I went along. My final product is still quite convoluted in places, although the refactoring I did made debugging far easier and allowed me to navigate my own code.

### Wins
_Describe the wins. What are you most proud of? What did this project help you to understand the most?_
I picked this particular game because I thought it would present the most interesting test of my JavaScript problem-solving abilities and I feel glad that I did because the kind of logic puzzles with which I was confronted were very challenging at times.

I am really proud of my computer strategy logic. There are still modifications I would like to make, but as it stands it is good enough to make the game genuinely competitive. It makes use of things like vectors, array splicing, and recursion, which I would not have known how to use at the start of my coding course, three weeks before this project began.

Though it's not visible on the page, I am also very pleased by the progress I've made with refactoring and debugging. I learned how to write reusable functions that took several arguments, as opposed to the more convoluted functions I wrote earlier in the project when solving the computer strategy problems. I also became more adept at identifying the source of bugs, making better use of console logs and the debugger statement.

## Future features
_If you were to revisit this project in the future what features would you add?_
The game would benefit from some logic to prevent the player from placing multiple ships of the same type. It would also be useful to have the game alert the player when a ship type has been sunk. This logic could then be used to make the cpu strategy more intelligent, as currently it keeps guessing squares until it gets a miss on either side of the ship regardless of whether the ship has already been sunk. On the same note, if the computer gets a hit at the edge of the board, it will guess the next index on a new row.

I would also like to add some cannonball sound effects and a score counter.
