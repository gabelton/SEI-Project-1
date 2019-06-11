document.addEventListener('DOMContentLoaded', () => {

  console.log('js loaded')

  const container = document.querySelector('.container')

  const containerPlayer = document.querySelector('.container.player')


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

  const cpuButtons = document.querySelectorAll('.container.cpu > div')

  const playerButtons = document.querySelectorAll('.container.player > div')

  const width = 10

  function getRandomDirection(){
    return Math.round(Math.random()) === 0
  }


  function computerPlaceShips() {
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
        if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
      }
      if (coastIsClear) {
        for(let i = 0; i<shipLength; i++) {
          const nextIndex = randomIndex + i
          const shipSquare = cpuButtons[nextIndex]
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
        for (let i = 0; i<shipLength; i++) {
          cpuButtons[randomIndex].classList.add('ship')
          randomIndex += 10
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


  let shipCount = 5

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

  let lastHitIndex
  let nextSquare
  let turnCount = 0
  let hit = false
  let vector = 0
  let directionChanged = 0
  function computerTurn(){
    let directionChanged = 0
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
    turnCount += 1
  }

  cpuButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (shipCount === 0) {
        if (button.classList.contains('ship')) {
          button.classList.add('hit')
          computerTurn()
        } else if (button.classList.contains('hit') || button.classList.contains === 'miss'){
          return null
        } else {
          button.classList.add('miss')
          computerTurn()
        }
      } else return null
    })
  } )







  //venture nay further, traveller
})
