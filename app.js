document.addEventListener('DOMContentLoaded', () => {

  console.log('js loaded')

  const container = document.querySelector('.container')

  const containerPlayer = document.querySelector('.containerPlayer')


  function createGrid() {
    for (let i = 0; i < 100; i++) {
      const gridSquare = document.createElement('div')
      container.appendChild(gridSquare)
    }
  }

  function createPlayerGrid() {
    for (let i = 0; i < 100; i++) {
      const gridSquare = document.createElement('div')
      containerPlayer.appendChild(gridSquare)
    }
  }

  createGrid()

  createPlayerGrid()

  const buttons = document.querySelectorAll('.container > div')

  const playerButtons = document.querySelectorAll('.containerPlayer > div')

  const width = 10
  //const height = 10



  //const squares = document.querySelectorAll('.container > div') //

  function getRandomDirection(){
    return Math.round(Math.random()) === 0
  }


  function clearBoard() {
    const squares = document.querySelectorAll('.container > div')
    squares.forEach(square => {
      square.classList.remove('ship')
    })
  }

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.classList.contains('ship')) {
        button.classList.add('hit')
        console.log(button.className)
      } else if (button.classList.contains('hit') || button.classList.contains === 'miss'){
        return null
      } else {
        button.classList.add('miss')
      }
    })
  } )

const squares = document.querySelectorAll('.container > div')

  function computerPlaceShips() {


    let randomIndex = Math.floor(Math.random() * squares.length)

    let columnIndex = (randomIndex % width)

    if (getRandomDirection()) {

      while ((width - columnIndex) < shipLength) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
      }



      let coastIsClear = true



      for(let i = 0; i<shipLength; i++){

        const nextIndex = randomIndex + i
        //const shipSquare = squares[nextIndex]
        if(squares[nextIndex].classList.contains('ship')) coastIsClear = false
        console.log(coastIsClear)
      }
      if (coastIsClear) {
        for(let i = 0; i<shipLength; i++) {
          const nextIndex = randomIndex + i
          const shipSquare = squares[nextIndex]
          shipSquare.classList.add('ship')
          if (shipLength === 5) shipSquare.classList.add('carrier')
          else if (shipLength === 4) shipSquare.classList.add('battleship')
          else if (shipLength === 3) shipSquare.classList.add('submarine')
          else if (shipLength === 2) shipSquare.classList.add('destroyer')
          else return null
        }
      } else computerPlaceShips()


    } else {
      while (randomIndex > 100-(shipLength*10)) {
        randomIndex = Math.floor(Math.random() * squares.length)
      }



      let coastIsClear = true


      for(let i = 0; i<shipLength; i++){
        if(squares[randomIndex].classList.contains('ship')) coastIsClear = false
        console.log(coastIsClear)
        let nextIndex = randomIndex + width
        nextIndex += 10

        if(squares[nextIndex].classList.contains('ship')) coastIsClear = false
        console.log(coastIsClear)
      }
      if(coastIsClear) {
        for (let i = 0; i<shipLength; i++) {
          squares[randomIndex].classList.add('ship')
          randomIndex += 10
          console.log(randomIndex)
          console.log(squares[randomIndex].classList)
        }
      } else {
        computerPlaceShips()
      }

    }
  }


  let shipLength = 5
  computerPlaceShips()
  shipLength = 4
  computerPlaceShips()
  shipLength = 3
  computerPlaceShips()
  computerPlaceShips()
  shipLength = 2
  computerPlaceShips()





/*  playerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      while
      if (e.target.className !== 'ship' && button) {
        button.classList.add('ship')
        console.log(button.className)
      } else if (button.className === 'ship'){
        button.classList.remove('ship')
      } else return null
    })
  } ) */



  /*let gameInProgress = false

  function checkPlayerBoardSetup() {
  playerButtons.forEach(playerButton => {

})

}
}



let playerGo = true
let turnCount = 0
console.log(turnCount)

function computerTurn() {
if (turnCount % 2 === 0)
let randomIndex = Math.floor(Math.random() * squares.length)
let firstGuess = squares[randomIndex]
if (firstGuess.classList.contains('ship')){
firstGuess.classList.add('hit')
}
}


/*
function computerPlaceShips() {

const squares = document.querySelectorAll('.container > div')

let randomIndex = Math.floor(Math.random() * squares.length)
let columnIndex = (randomIndex % width)
// decides whether to place right or down
if (getRandomDirection()) {

//Checking if horizontal ship fits row
while ((width - columnIndex) < shipLength) {
randomIndex = Math.floor(Math.random() * squares.length)
columnIndex = (randomIndex % width)
}


// Creating a horizontal ship
//loops through until has placed 5 ship squares

for (let i = 0; i < shipLength; i++) {
const nextIndex = randomIndex + i
const shipSquare = squares[nextIndex]
// if the loop hits a square that already has a ship placed on it, all ships are wiped and the function calls itself again and keeps calling until it can place a full five square ship
if (shipSquare.className === 'ship') {
clearBoard()
computerPlaceShips()
break
} else {
console.log(shipSquare.classList)
shipSquare.classList.add('ship')
}
}
} else {
while (randomIndex > 100-(shipLength*10)) {
randomIndex = Math.floor(Math.random() * squares.length)
}
squares[randomIndex].classList.add('ship')
for (let i=0; i < shipLength-1; i++) {
randomIndex += 10
if (squares[randomIndex].className === 'ship'){
clearBoard()
computerPlaceShips()
} else {
squares[randomIndex].classList.add('ship')
}
}
}
}
*/



const carrier = document.querySelectorAll('.carrier')

function checkForSunk(){
  const sunk = carrier.every(x => x.className === 'hit')
  if (sunk) {
    console.log('You sunk my carrier!')
  } else return null
}


/*let randomIndex = Math.floor(Math.random() * squares.length)
let columnIndex = (randomIndex % width)

console.log(randomIndex)

function getRandomStart() {
if (squares[randomIndex].className !== 'ship') {
const randomSquare = squares[randomIndex]
randomSquare.className = 'ship'
}
}

getRandomStart()
console.log(getRandomStart)



const carrier = 5

// Creating a horizontal ship
function createCarrier(){
for (let i = 0; i < carrier; i++) {
const nextIndex = randomIndex + i
console.log(nextIndex)
const shipSquare = squares[nextIndex]
shipSquare.className = 'ship'
}
}

// createCarrier()
console.log(createCarrier())

function fitRow() {
while ((width - columnIndex) < 5) {

}
}
fitRow()





function getRandomDirection() {
const rightOrDown = Math.floor(Math.random() * 2)
return rightOrDown
}


*/



/*  function createCarrier() {

getRandomStart()
getRandomDirection()
if (getRandomDirection() === 0) {
squares.forEach((square, index, array) => {
if (square.className === 'ship') {
const carrierLength = [
squares[index+1], squares[index+2], squares[index+3], squares[index+4]]
console.log(carrierLength)
const yee = carrierLength.every(x => x.className !== 'ship')
console.log(yee)
if (yee) {
carrierLength.forEach(i => {
i.className = 'ship'
})
} else {
createCarrier()
}
} else return null
})
} else return null // Change this to down direction later
}
*/

//remember to add break if successful!!!

// createCarrier()









//venture nay further, traveller
})
