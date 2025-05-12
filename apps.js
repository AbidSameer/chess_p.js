import { rook, knight, bishop, queen, king, pawn } from './pieces.js';
let gameboard=document.querySelector("#gameboard")
let player=document.querySelector("#player")
let info_display=document.querySelector("#info_display")
let width=8
let playerGo='black'
player.textContent='black'

let startPieces=[
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    " ", " ", " ", " ", " ", " ", " ", " ",
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]
function createBoard(){
    startPieces.forEach((startPiece, i)=>{
        let square=document.createElement("div")
        square.classList.add("square")
        square.innerHTML=startPiece
        square.setAttribute('draggable',true)
        square.setAttribute("square-id", i) 
        const row=Math.floor((63-i)/8)+1
        if(row%2===0){  
            square.classList.add(i%2===0?"beige": "brown")
        }
        else{
            square.classList.add(i%2===0?"brown": "beige")
        }

        if(i<=15){
            square.classList.add("black")
        }
        if(i>=48){
            square.classList.add("white")
        }   
        gameboard.append(square) 
        
    })
}
createBoard()
const allSquares=document.querySelectorAll(".square")
allSquares.forEach(square => {
    square.addEventListener("dragstart", dragStart)
    square.addEventListener("dragover", dragOver)
    square.addEventListener("drop",   drop)


})
let startPositionId
let draggedElement
function dragStart(e){
    startPositionId=e.target.parentNode.getAttribute("square-id")
    draggedElement=e.target
}
function dragOver(e){
    // console.log(e.target)
    e.preventDefault()
}
function drop(e){
    e.stopPropagation()
    console.log(e.target)
    let correct_go = draggedElement.firstChild?.classList?.contains(playerGo)
    let taken = e.target.classList.contains('piece')
    let valid = checkIfValid(e.target)
    let oppo_go = playerGo === 'white' ? 'black' : 'white'
    let takenByopponent = e.target.firstChild?.classList?.contains(oppo_go)

    if(correct_go){
        if(takenByopponent && valid){
            e.target.parentNode.append(draggedElement)
            e.target.remove()
            checkForWin()
            changePlayer()              
            return
        }

        if(taken&& !takenByopponent){
            info_display.textContent="u cant go here"
            setTimeout(()=> info_display.textContent=" ",2000)
            return
        }
        if(valid){
            e.target.append(draggedElement)
            checkForWin()
            changePlayer()
            return
        }
    }
}
function checkIfValid(target){

    let targetId=Number(target.getAttribute("square-id"))|| Number(target.parentNode.getAttribute("square-id"))
    // console.log(targetId);
    
    let startId=Number(startPositionId)
    let piece=draggedElement.id
    console.log("targetId",targetId)
    console.log( "startId", startId)
    console.log("piece", piece)

    switch(piece){
        case 'pawn':
            const starterRow=[8,9,10,11,12,13,14,15]
            if(
                starterRow.includes(startId) && startId + width*2===targetId||
                startId+width===targetId||
                startId + width-1===targetId && document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
                startId + width+1===targetId && document.querySelector(`[square-id="${startId+width+1}"]`).firstChild
            ){
                return true
            }
            break;
            case 'knight':  
            if(
                startId+width*2+1===targetId||
                startId+width*2-1===targetId||
                startId+width-2===targetId||
                startId+width+2===targetId||
                startId-width*2+1===targetId||
                startId-width*2-1===targetId||
                startId-width-2===targetId||
                startId-width+2===targetId
            ){
                return true
            }
            break;
            case 'bishop':
                if(
                    startId+width+1===targetId||
                    startId+width*2+2===targetId&& !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
                    startId+width*3+3===targetId&& !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
                    startId+width*4+4===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
                    startId+width*5+5===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                    startId+width*6+6===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                    startId+width*7+7===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild||
                    // --
                    startId-width+1===targetId||
                    startId-width*2-2===targetId&& !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
                    startId-width*3-3===targetId&& !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                    startId-width*4-4===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
                    startId-width*5-5===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                    startId-width*6-6===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                    startId-width*7-7===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild||
                    // --
                    startId-width+1===targetId||
                    startId-width*2+2===targetId&& !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
                    startId-width*3+3===targetId&& !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
                    startId-width*4+4===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
                    startId-width*5+5===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                    startId-width*6+6===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                    startId-width*7+7===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild|| 
                    // 
                    startId+width-1===targetId||
                    startId+width*2-2===targetId&& !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
                    startId+width*3-3===targetId&& !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
                    startId+width*4-4===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
                    startId+width*5-5===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                    startId+width*6-6===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                    startId+width*7-7===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild
                )  {
                    return true
                }
                break
                case 'rook':
                    if(
                        startId+width===targetId||
                        startId+width*2===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
                        startId+width*3===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild||
                        startId+width*4===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                        startId+width*5===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild||
                        startId+width*6===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild||
                        startId+width*7===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6}"]`).firstChild||
                        // --
                        startId-width===targetId||
                        startId-width*2===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
                        startId-width*3===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild||
                        startId-width*4===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                        startId-width*5===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild||
                        startId-width*6===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild||
                        startId-width*7===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild||
                        // --
                        startId+1===targetId||
                        startId+2===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild||
                        startId+3===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild||
                        startId+4===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                        startId+5===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild||
                        startId+6===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild||
                        startId+7===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+6}"]`).firstChild||
                        // --
                        startId-1===targetId||
                        startId-2===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild||
                        startId-3===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild||
                        startId-4===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                        startId-5===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild||
                        startId-6===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild||
                        startId-7===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-6}"]`).firstChild
                    ){
                        return true
                    }
                    break;
                    case 'queen':
                        if(startId+width+1===targetId||
                            startId+width*2+2===targetId&& !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild||
                            startId+width*3+3===targetId&& !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild||
                            startId+width*4+4===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild||
                            startId+width*5+5===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                            startId+width*6+6===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild||
                            startId+width*7+7===targetId&&  !document.querySelector(`[square-id="${startId+width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4+4}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*5+5}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*6+6}"]`).firstChild||
                            // --
                            startId-width+1===targetId||
                            startId-width*2-2===targetId&& !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild||
                            startId-width*3-3===targetId&& !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild||
                            startId-width*4-4===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild||
                            startId-width*5-5===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                            startId-width*6-6===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild||
                            startId-width*7-7===targetId&&  !document.querySelector(`[square-id="${startId-width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4-4}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*5-5}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*6-6}"]`).firstChild||
                            // --
                            startId-width+1===targetId||
                            startId-width*2+2===targetId&& !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild||
                            startId-width*3+3===targetId&& !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild||
                            startId-width*4+4===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild||
                            startId-width*5+5===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                            startId-width*6+6===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild||
                            startId-width*7+7===targetId&&  !document.querySelector(`[square-id="${startId-width+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2+2}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*3+3}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*4+4}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*5+5}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*6+6}"]`).firstChild|| 
                            // 
                            startId+width-1===targetId||
                            startId+width*2-2===targetId&& !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild||
                            startId+width*3-3===targetId&& !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild||
                            startId+width*4-4===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild||
                            startId+width*5-5===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                            startId+width*6-6===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild||
                            startId+width*7-7===targetId&&  !document.querySelector(`[square-id="${startId+width-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2-2}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*3-3}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*4-4}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*5-5}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*6-6}"]`).firstChild||
                            // ==
                            startId+width===targetId||
                            startId+width*2===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
                            startId+width*3===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild||
                            startId+width*4===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild||
                            startId+width*5===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild||
                            startId+width*6===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild||
                            startId+width*7===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId+width*6}"]`).firstChild||
                        // --
                            startId-width===targetId||
                            startId-width*2===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild||
                            startId-width*3===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild||
                            startId-width*4===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild||
                            startId-width*5===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild||
                            startId-width*6===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild||
                            startId-width*7===targetId&& !document.querySelector(`[square-id="${startId+width}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-width*3}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*4}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*5}"]`).firstChild && !document.querySelector(`[square-id="${startId-width*6}"]`).firstChild||
                        // --
                            startId+1===targetId||
                            startId+2===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild||
                            startId+3===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild||
                            startId+4===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild||
                            startId+5===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild||
                            startId+6===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild||
                            startId+7===targetId&& !document.querySelector(`[square-id="${startId+1}"]`).firstChild&& !document.querySelector(`[square-id="${startId+2}"]`).firstChild&& !document.querySelector(`[square-id="${startId+3}"]`).firstChild && !document.querySelector(`[square-id="${startId+4}"]`).firstChild && !document.querySelector(`[square-id="${startId+5}"]`).firstChild && !document.querySelector(`[square-id="${startId+6}"]`).firstChild||
                        // --
                            startId-1===targetId||
                            startId-2===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild||
                            startId-3===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild||
                            startId-4===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild||
                            startId-5===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild||
                            startId-6===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild||
                            startId-7===targetId&& !document.querySelector(`[square-id="${startId-1}"]`).firstChild&& !document.querySelector(`[square-id="${startId-2}"]`).firstChild&& !document.querySelector(`[square-id="${startId-3}"]`).firstChild && !document.querySelector(`[square-id="${startId-4}"]`).firstChild && !document.querySelector(`[square-id="${startId-5}"]`).firstChild && !document.querySelector(`[square-id="${startId-6}"]`).firstChild
                            ){
                            return true
                        }
                        break;
                        case'king':
                        if(
                            startId+1===targetId||
                            startId-1===targetId||
                            startId+width===targetId||
                            startId-width===targetId||
                            startId+width-1===targetId||
                            startId+width+1===targetId||
                            startId-width-1===targetId||
                            startId-width+1===targetId
                        ){
                            return true
                        }

    }
}
function changePlayer(){
    if (playerGo==="black"){
        reverseIds()
        playerGo="white"
        player.textContent="white"
    } else{
        revertIds()
        playerGo="black"
        player.textContent="black"
    }
        
}
function reverseIds(){
    const allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>
        square.setAttribute("square-id", (width*width-1)-i))
}
function revertIds(){
    let allSquares=document.querySelectorAll(".square")
    allSquares.forEach((square,i)=>square.setAttribute("square-id",i))
}
function checkForWin(){
    let king=Array.from(document.querySelectorAll('#king'))
    console.log(kings)
    if(!king.some(king=>king.firstChild.classList.contains('white'))){
        info_display.innerHTML="BLack player wins"
        let allSquares=document.querySelectorAll('.square')
        allSquares.forEach(square=>square.firstChild?.setAttribute('draggable',false))
    }
    if(!king.some(king=>king.firstChild.classList.contains('black'))){
        info_display.innerHTML="white player wins"
        let allSquares=document.querySelectorAll('.square')
        allSquares.forEach(square=>square.firstChild?.setAttribute('draggable',false))
    }
}