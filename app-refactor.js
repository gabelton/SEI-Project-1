document.addEventListener('DOMContentLoaded', () => {

  console.log('js loaded')

  let gameInPlay = false

  const container = document.querySelector('.container')
  const containerPlayer = document.querySelector('.container.player')
  const width = 10

  function createGrid(container) {
    for (let i = 0; i < 100; i++) {
      const gridSquare = document.createElement('div')
      container.appendChild(gridSquare)
    }
  }

  createGrid(container)
  createGrid(containerPlayer)

  const cpuButtons = document.querySelectorAll('.container.cpu > div')
  const playerButtons = document.querySelectorAll('.container.player > div')

  const cpuShips = {}
  const playerShips = {}

  function getRandomDirection(){
    return Math.round(Math.random()) === 0
  }

  function setShipClass(randomIndex, shipLength, i, num){
    const nextIndex = randomIndex + i * num
    const shipSquare = cpuButtons[nextIndex]
    shipSquare.classList.add('ship')
    switch (shipLength) {
      case 5: shipSquare.classList.add('carrier')
        break
      case 4: shipSquare.classList.add('battleship')
        break
      case 3: shipSquare.classList.add('submarine')
        break
      case 2: shipSquare.classList.add('destroyer')
        break
      default: null
    }
  }

  function computerPlaceShips(shipLength) {

    let randomIndex = Math.floor(Math.random() * cpuButtons.length)

    let columnIndex = (randomIndex % width)

    if (getRandomDirection()) {

      while ((width - columnIndex) < shipLength) {
        randomIndex = Math.floor(Math.random() * cpuButtons.length)
        columnIndex = (randomIndex % width)
      }

      let coastIsClear = true

      for(let i = 0; i<shipLength; i++){

        const nextIndex = randomIndex + i
        //const shipSquare = squares[nextIndex]
        if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
      }
      if (coastIsClear) {
        for(let i = 0; i<shipLength; i++) {
          setShipClass(randomIndex, shipLength, i, 1)
        }
      } else computerPlaceShips(shipLength)

    } else {
      while (randomIndex > 100-(shipLength*10)) {
        randomIndex = Math.floor(Math.random() * cpuButtons.length)
      }

      let coastIsClear = true

      for(let i = 0; i<shipLength; i++){
        if(cpuButtons[randomIndex].classList.contains('ship')) coastIsClear = false
        let nextIndex = randomIndex + width
        nextIndex += 10

        if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
      }
      if(coastIsClear) {
        for(let i=0; i<shipLength; i++){
          setShipClass(randomIndex, shipLength, i, width)
        }
      } else {
        computerPlaceShips(shipLength)
      }
    }
  }


  computerPlaceShips(5)
  computerPlaceShips(4)
  computerPlaceShips(3)
  computerPlaceShips(2)
  computerPlaceShips(3)


  let shipCount = 5

  function startGame(){
    gameInPlay = true
  }

  const shipButtons = document.querySelectorAll('button.ship')

  shipButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      shipLength = parseInt(e.target.value)
    })
  })

  let horizontalDirection = true

  const directionButtons = document.querySelectorAll('button.direction')

  directionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (e.target.value === 'horizontal') {
        horizontalDirection = true
      } else horizontalDirection = false
    })
  })


  playerButtons.forEach((button, index) => {
    button.onclick = (e) => {
      if (e.target.className !== 'ship' && shipCount > 0 && horizontalDirection === true) {
        startGame()
        let clearRun = true
        for (let i=0; i<shipLength; i++) {
          const nextIndex = index + i
          if(playerButtons[nextIndex].classList.contains('ship')) clearRun = false
        }
        if (clearRun) {
          for (let i=0; i<shipLength; i++) {
            const nextIndex = index + i
            const shipSquare = playerButtons[nextIndex]
            shipSquare.classList.add('ship')
          }
          shipCount -= 1
        }
      } else if (e.target.className !== 'ship' && shipCount > 0 && horizontalDirection === false) {
        let clearRun = true
        if(playerButtons[index].classList.contains('ship')) clearRun = false
        let nextIndex = index + width
        nextIndex += 10

        if(cpuButtons[nextIndex].classList.contains('ship')) clearRun = false
        if(clearRun) {
          for (let i = 0; i<shipLength; i++) {
            playerButtons[index].classList.add('ship')
            index += 10
          }
          shipCount -= 1
        }
      } else return null
    }
  })

/*  let lastHitIndex
  let nextSquare
  let turnCount = 0
  let hit = false
  let vector = 0
  let directionChanged = 0
  */

  let playerHitCount = 0
  let cpuHitCount = 0

  function checkForWin(){
    if (playerHitCount === 17) {
      console.log('Player wins!')
      gameInPlay = false
    } else if (cpuHitCount === 17) {
      console.log('CPU wins!')
      gameInPlay = false
    } else {
      return null
    }
  }


  let hit = false
  let directionChanged = 0
  let vector = false
  let firstHitIndex
  let recentHitIndex


  function computerTurn(){
    if (!hit){
      const randomIndex = Math.floor(Math.random() * playerButtons.length)
      if (playerButtons[randomIndex].classList.contains('ship') && !playerButtons[randomIndex].classList.contains('hit')) {
        playerButtons[randomIndex].classList.add('hit')
        cpuHitCount += 1
        hit = true
        firstHitIndex = randomIndex
        console.log(firstHitIndex)
        console.log(playerButtons[randomIndex])
        checkForWin()

      } else if (!playerButtons[randomIndex].classList.contains('ship') && !playerButtons[randomIndex].classList.contains('hit') && !playerButtons[randomIndex].classList.contains('miss')){
        playerButtons[randomIndex].classList.add('miss')
      } else {
        computerTurn()
      }
    } else if (hit && !vector) {
      const nextMoves = [(firstHitIndex-1), (firstHitIndex-10), (firstHitIndex+1), (firstHitIndex+10)]
      let randomMove = Math.floor(Math.random() * nextMoves.length)
      let nextSquare = playerButtons[nextMoves[randomMove]]
      while (!nextSquare || nextSquare.classList.contains('hit') || nextSquare.classList.contains('miss')){
        const index = nextMoves.indexOf(randomMove)
        nextMoves.splice(index, 1)
        randomMove = Math.floor(Math.random() * nextMoves.length)
        nextSquare = playerButtons[nextMoves[randomMove]]
      }
      console.log(nextSquare)
      if (nextSquare.classList.contains('ship')){
        nextSquare.classList.add('hit')
        console.log(nextMoves[randomMove]-firstHitIndex)
        vector = nextMoves[randomMove]-firstHitIndex
        recentHitIndex = nextMoves[randomMove]
      } else {
        nextSquare.classList.add('miss')
      }
    } else if (vector){
      console.log('vector section')
      console.log(recentHitIndex)
      if (playerButtons[recentHitIndex + vector].classList.contains('ship')){
        playerButtons[recentHitIndex + vector].classList.add('hit')
        recentHitIndex += vector
      } else {
        playerButtons[recentHitIndex + vector].classList.add('miss')
        //hit = false
        recentHitIndex = firstHitIndex
        if (directionChanged === 0) {
          vector = -vector
          directionChanged += 1
        }
      }
    } else console.log('Why am I here?')
  }


  /*let directionChanged = 0
    if (turnCount === 0 || !hit){
      const randomIndex = Math.floor(Math.random() * playerButtons.length)
      if (playerButtons[randomIndex].classList.contains('ship')) {
        playerButtons[randomIndex].classList.add('hit')
        lastHitIndex = randomIndex
        hit = true
      } else if (playerButtons[randomIndex].classList.contains('ship') === false){
        playerButtons[randomIndex].classList.add('miss')
      }
    } else if (hit) {
      const nextMoves = [(lastHitIndex-1), (lastHitIndex-10), (lastHitIndex+1), (lastHitIndex+10)]
      let randomMove = Math.floor(Math.random() * nextMoves.length)
      let nextSquare = playerButtons[nextMoves[randomMove]]
      console.log(nextMoves[randomMove])
      while (nextSquare && (nextSquare.classList.contains('hit') || nextSquare.classList.contains('miss'))){
        randomMove = Math.floor(Math.random() * nextMoves.length)
        nextSquare = playerButtons[nextMoves[randomMove]]
      }
      if (nextSquare.classList.contains('ship')){
        nextSquare.classList.add('hit')
        console.log(nextMoves[randomMove]-lastHitIndex)
        vector = nextMoves[randomMove]-lastHitIndex
        let recentHitIndex = nextMoves[randomMove]
        hit = false
      } else {
        nextSquare.classList.add('miss')
      }
      nextMoves.splice(nextMoves.indexOf(randomMove), 1)
    } else if (vector) {
      if (playerButtons[recentHitIndex + vector].classList.contains('ship')){
        playerButtons[recentHitIndex + vector].classList.add('hit')
        recentHitIndex += vector
      } else {
        playerButtons[recentHitIndex + vector].classList.add('miss')
        if (directionChanged === 0) {
          vector = -vector
          directionChanged += 1
        } else {
          vector = 0
          hit = false
        }
      }
    }
    turnCount += 1 */



  cpuButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (shipCount === 0 && gameInPlay) {
        if (button.classList.contains('hit') || button.classList.contains('miss')) {
          return null
        } else if (button.classList.contains('ship')){
          button.classList.add('hit')
          playerHitCount += 1
          checkForWin()
          computerTurn()
        } else if (!button.classList.contains('ship')){
          button.classList.add('miss')
          checkForWin()
          computerTurn()
        }
      } else return null
    })
  } )

  /*
let directionChanged = 0
  else if (vector) {
    if (playerButtons[recentHitIndex + vector].classList.contains('ship')){
      playerButtons[recentHitIndex + vector].classList.add('hit')
      recentHitIndex += vector
    } else {
      playerButtons[recentHitIndex + vector].classList.add('miss')
      if (directionChanged === 0) {
        vector = -vector
        directionChanged += 1
      } else {
        vector = 0
        hit = false
      }
    }
  } */




  //venture nay further, traveller
})
