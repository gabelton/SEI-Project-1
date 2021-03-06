document.addEventListener('DOMContentLoaded', () => {

  console.log('js loaded')

  let gameInPlay = false

  const playerInfo = document.querySelector('span')


  const container = document.querySelector('.container.cpu')
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



  function getRandomDirection(){
    return Math.round(Math.random()) === 0
  }

  function setShipClass(randomIndex, shipLength, i, num){
    const nextIndex = randomIndex + i * num
    const shipSquare = cpuButtons[nextIndex]
    shipSquare.classList.add('ship', 'hidden')
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
        if(cpuButtons[randomIndex].classList.contains('ship') || cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
        console.log(coastIsClear)
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
        //if(cpuButtons[randomIndex].classList.contains('ship')) coastIsClear = false
        const nextIndex = randomIndex + i * 10
        //let nextIndex = randomIndex + width
        if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
        //nextIndex += 10
        //if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
        console.log(coastIsClear)

      //  if(cpuButtons[nextIndex].classList.contains('ship')) coastIsClear = false
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

  function boardSetup() {
    computerPlaceShips(5)
    computerPlaceShips(4)
    computerPlaceShips(3)
    computerPlaceShips(2)
    computerPlaceShips(3)
  }

  boardSetup()


  let shipCount = 5

  function startGame(){
    gameInPlay = true
  }

  function gameStartAlert(){
    if (shipCount === 0) playerInfo.innerText = 'Ready the cannons, sponger! Pick a square on the enemy\'s grid to start the game!'
  }


  const allButtons = document.querySelectorAll('button')
  const selectionButtons = document.querySelectorAll('button.selection')

  allButtons.forEach(button => {
    button.addEventListener('mouseover', () => {
      button.style.cursor = 'pointer'
    })
  })

  function clearSelection(buttons, classToRemove, classToAdd){
    buttons.forEach(button => {
      button.classList.remove(classToRemove)
      button.classList.add(classToAdd)
    })
  }

  selectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      clearSelection(selectionButtons,'clickedSelection','selection')
      shipLength = parseInt(e.target.value)
      button.classList.remove('selection')
      button.classList.add('clickedSelection')
    })
  })

  let horizontalDirection = true

  const directionButtons = document.querySelectorAll('button.direction')

  directionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      clearSelection(directionButtons,'clickedDirection', 'direction')
      button.classList.remove('direction')
      button.classList.add('clickedDirection')
      if (e.target.value === 'horizontal') {
        horizontalDirection = true
      } else horizontalDirection = false
    })
  })


  playerButtons.forEach((button, index) => {
    button.onclick = (e) => {
      if (e.target.className !== 'ship' && shipCount > 0 && horizontalDirection === true && !(width - (index % width) < shipLength)) {
        startGame()
        let clearRun = true
        for (let i=0; i<shipLength; i++) {
          const nextIndex = index + i
          if(playerButtons[nextIndex].classList.contains('ship') || playerButtons[index].classList.contains('ship')) clearRun = false
        }
        if (clearRun) {
          for (let i=0; i<shipLength; i++) {
            const nextIndex = index + i
            const shipSquare = playerButtons[nextIndex]
            shipSquare.classList.add('ship')
          }
          shipCount -= 1
          console.log(shipCount)
          console.log(gameInPlay)
          gameStartAlert()
        }
      } else if (e.target.className !== 'ship' && shipCount > 0 && horizontalDirection === false && !(index >= 110-(shipLength*10))) {
        startGame()
        let clearRun = true
        for (let i=0; i<shipLength; i++) {
          const nextIndex = index + i * 10
          if(playerButtons[nextIndex].classList.contains('ship') || playerButtons[index].classList.contains('ship')) clearRun = false
        }
        /*if(playerButtons[index].classList.contains('ship')) clearRun = false
        let nextIndex = index + width
        nextIndex += 10
        console.log(playerButtons[nextIndex])
        if(playerButtons[nextIndex] && playerButtons[nextIndex].classList.contains('ship')) clearRun = false */
        if(clearRun) {
          for (let i = 0; i<shipLength; i++) {
            playerButtons[index].classList.add('ship')
            index += 10
          }
          shipCount -= 1
          console.log(shipCount)
          console.log(gameInPlay)
          gameStartAlert()
        }
      }
    }
  })



  let playerHitCount = 0
  let cpuHitCount = 0

  function checkForWin(){
    if (playerHitCount === 17) {
      console.log('Victory is ours!')
      playerInfo.innerText = 'Victory is ours!'
      gameInPlay = false
    } else if (cpuHitCount === 17) {
      console.log('CPU wins!')
      playerInfo.innerText = 'He has won the battle, but not the war! Click reset to play again!'
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

  function cpuReset(){
    directionChanged = 0
    vector = false
    hit = false
    recentHitIndex = false
  }

  function randomPhrase(){
    let phraseNumber = Math.floor(Math.random() * (4 - 1)) + 1
    return phraseNumber
  }

  function hitAlert(){
    if (randomPhrase() === 1){
      playerInfo.innerText = 'Good shot, gunner!'
    } else if (randomPhrase() === 2){
      playerInfo.innerText = 'An extra ration of rum for you, sailor!'
    } else {
      playerInfo.innerText = 'Rule Britannia!'
    }
  }

  function missAlert(){
    if (randomPhrase() === 1){
      playerInfo.innerText = 'Unlucky, sirrah! Reload your guns!'
    } else if (randomPhrase() === 2){
      playerInfo.innerText = 'Have you been on the grog again?'
    } else {
      playerInfo.innerText = 'Do you want to see a guillotine in Trafalgar? Reload the cannon!'
    }
  }


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
        nextMoves.splice(randomMove, 1)
        randomMove = Math.floor(Math.random() * nextMoves.length)
        nextSquare = playerButtons[nextMoves[randomMove]]
      }
      console.log(nextSquare)
      if (nextSquare.classList.contains('ship') && !nextSquare.classList.contains('hit')){
        nextSquare.classList.add('hit')
        console.log(nextMoves[randomMove]-firstHitIndex)
        cpuHitCount += 1
        checkForWin()
        vector = nextMoves[randomMove]-firstHitIndex
        recentHitIndex = nextMoves[randomMove]
      } else if (!nextSquare.classList.contains('ship') && !nextSquare.classList.contains('miss') && !nextSquare.classList.contains('hit')){
        nextSquare.classList.add('miss')
      } else {
        console.log('over here!')
      }
    } else if (vector){
      if (playerButtons[recentHitIndex + vector] && playerButtons[recentHitIndex + vector].classList.contains('ship') && !playerButtons[recentHitIndex + vector].classList.contains('hit') && !playerButtons[recentHitIndex + vector].classList.contains('miss')){
        playerButtons[recentHitIndex + vector].classList.add('hit')
        recentHitIndex += vector
        cpuHitCount += 1
        checkForWin()
      } else if (playerButtons[recentHitIndex + vector] && !playerButtons[recentHitIndex + vector].classList.contains('ship') && !playerButtons[recentHitIndex + vector].classList.contains('miss') && !playerButtons[recentHitIndex + vector].classList.contains('hit')){
        playerButtons[recentHitIndex + vector].classList.add('miss')
        //hit = false
        recentHitIndex = firstHitIndex
        if (directionChanged === 0) {
          vector = -vector
          directionChanged += 1
        } else if (directionChanged === 1){
          cpuReset()
        }
      } else {
        console.log('you are here')
        recentHitIndex = firstHitIndex
        if (directionChanged === 0) {
          vector = -vector
          directionChanged += 1
          computerTurn()
        } else if (directionChanged === 1){
          cpuReset()
          computerTurn()
        }
      }
    } else console.log('Why am I here?')
  }

  /*  function countHits(shipType, shipLength) {
    const numOfHits = cpuButtons.filter((element) => {
      return element.contains(shipType, 'hit')
    })
    if (numOfHits.length === shipLength) console.log(`You sunk cpu's ${shipType}`)
  }
  */

  cpuButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (shipCount === 0 && gameInPlay) {
        if (button.classList.contains('hit') || button.classList.contains('miss')) {
          return null
        } else if (button.classList.contains('ship')){
          button.classList.add('hit')
          button.classList.remove('hidden')
          playerHitCount += 1
          hitAlert()
          checkForWin()
          computerTurn()
        } else if (!button.classList.contains('ship')){
          button.classList.add('miss')
          missAlert()
          checkForWin()
          computerTurn()
        }
      }
    })
  } )

  const rules = document.querySelector('p')
  const rulesButton = document.querySelector('.rules')

  rulesButton.addEventListener('click', () => {
    if (rules.style.display === 'none') {
      rules.style.display = 'block'
    } else {
      rules.style.display = 'none'
    }
  })

  const reset = document.querySelector('.reset')

  reset.addEventListener('click', () => {
    cpuButtons.forEach(button => {
      button.classList.remove('ship', 'hit', 'miss', 'hidden')
    })
    playerButtons.forEach(button => {
      button.classList.remove('ship', 'hit', 'miss')
    })
    shipCount = 5
    shipLength = false
    cpuHitCount = 0
    playerHitCount = 0
    gameInPlay = false
    clearSelection(selectionButtons,'clickedSelection','selection')
    clearSelection(directionButtons,'clickedDirection', 'direction')
    boardSetup()
    playerInfo.innerText = 'Ahoy hoy, sailor, choose your ship class and select a square to start placing your ships!'
  })




  //venture nay further, traveller
})
