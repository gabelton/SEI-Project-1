document.addEventListener('DOMContentLoaded', () => {

  console.log('js loaded')

  const container = document.querySelector('.container')
  console.log(container)


  function createGrid() {
    for (let i = 0; i < 100; i++) {
      const gridSquare = document.createElement('div')
      container.appendChild(gridSquare)
    }
  }

  createGrid()

  const width = 10
  const height = 10

  const shipLength = 5

  //const squares = document.querySelectorAll('.container > div') //

  function getRandomDirection() {
    if (Math.round(Math.random()) === 0){
      return true
    }
  }

  function computerPlaceShips() {

    const squares = document.querySelectorAll('.container > div')

    let randomIndex = Math.floor(Math.random() * squares.length)
    let columnIndex = (randomIndex % width)
    console.log(randomIndex, 'Not in while')

    console.log(columnIndex, 'COL')

    if (getRandomDirection()) {

      //Checking if horizontal ship fits row
      while ((width - columnIndex) < shipLength) {
        randomIndex = Math.floor(Math.random() * squares.length)
        columnIndex = (randomIndex % width)
        console.log(columnIndex)
        console.log(randomIndex, 'In while')
      }


      // Creating a horizontal ship
      for (let i = 0; i < shipLength; i++) {
        const nextIndex = randomIndex + i
        const shipSquare = squares[nextIndex]
        shipSquare.classList.add('ship')
      }
    } else {
      while (randomIndex > 100-(shipLength*10)) {
        randomIndex = Math.floor(Math.random() * squares.length)
      }
      squares[randomIndex].classList.add('ship')
      for (let i=0; i < shipLength-1; i++) {
        randomIndex += 10
        squares[randomIndex].classList.add('ship')
      }
    }
  }

  computerPlaceShips()

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
