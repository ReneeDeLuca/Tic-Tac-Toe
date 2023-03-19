const player1Class = 'x'
const player2Class = 'circle'
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const boardElement = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer2Turn = false

startGame()

restartButton.addEventListener('click', startGame)

function startGame(){
    isPlayer2Turn = false
    cellElements.forEach(cell => {
        cell.classList.remove(player1Class)
        cell.classList.remove(player2Class)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick,{once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('draw')
    winningMessageElement.classList.remove('x-wins')
    winningMessageElement.classList.remove('o-wins')
    winningMessageElement.classList.remove('show')
}   

function handleCellClick(e){
    const cell = e.target
    const currentClass = isPlayer2Turn ? player2Class : player1Class
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if(isDraw()) {
        endGame(true)
    }else{
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if(draw){
        winningMessageTextElement.innerText = "It's a draw!"
        winningMessageElement.classList.add('draw')
    }else{
        winningMessageTextElement.innerText = `Player with ${isPlayer2Turn ? "O's" : "X's"} wins!`
        if(isPlayer2Turn){
            winningMessageElement.classList.add('o-wins')
        }else{
            winningMessageElement.classList.add('x-wins')

        }
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(player1Class) || cell.classList.contains(player2Class)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    isPlayer2Turn = !isPlayer2Turn
}

function setBoardHoverClass(){
    boardElement.classList.remove(player1Class)
    boardElement.classList.remove(player2Class)
    if(isPlayer2Turn){
        boardElement.classList.add(player2Class)
    }else{
        boardElement.classList.add(player1Class)
    }
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}