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

  const shipLength = 5

  //const squares = document.querySelectorAll('.container > div') //

  function getRandomDirection() {
    if (Math.round(Math.random()) === 0){
      return true
    }
  }


  function clearBoard() {
    const squares = document.querySelectorAll('.container > div')
    squares.forEach(square => {
      square.classList.remove('ship')
    })
  }

  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.className === 'ship') {
        button.classList.add('hit')
        console.log(button.className)
      } else if (button.className === 'hit' || button.className === 'miss'){
        return null
      } else {
        button.classList.add('miss')
      }
    })
  } )

  playerButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.className !== 'ship' && button) {
        button.classList.add('ship')
        console.log(button.className)
      } else if (button.className === 'hit' || button.className === 'miss'){
        return null
      } else {
        button.classList.add('miss')
      }
    })
  } )





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


  computerPlaceShips()
  computerPlaceShips()
  computerPlaceShips()

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
