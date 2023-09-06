console.log("Connected3")
debug = false

let record = 0

const boxes = document.querySelectorAll(".box")
const divArray = Array.from(boxes)

const root = document.querySelector(":root")

const end = document.querySelector(".youwon")
const congrats = document.querySelector(".congrats")
const button = document.querySelector(".butt")
const player = document.querySelector(".player")




const container = document.querySelector(".container")
let DM = false


function darkmode(){
  console.log("clicked", DM)
  if (DM === true) {
    root.style.setProperty("--primary", "#05332b")
    root.style.setProperty("--boxfont", "#fff")
    root.style.setProperty("--mainbox", "#28675c")
    DM = false
  } else {
    root.style.setProperty("--primary", "#28675c")
    root.style.setProperty("--boxfont", "#000")
    root.style.setProperty("--mainbox", "#fff")
    DM = true
  }
  
}

container.addEventListener("click", darkmode)




let gb = [
    "", "", "",
    "", "", "",
    "", "", "",
]

const wincom = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
]

function endgame(nocon=false){
  for (let x in wincom){
        p1 = gb[wincom[x][0]-1]
        p2 = gb[wincom[x][1]-1]
        p3 = gb[wincom[x][2]-1]

        if ((p1 == p2 && p2 == p3 && ![p1,p2,p3].includes("")) || nocon===true ) {
            for (let i in boxes+1){
                i = parseInt(i)
                if (wincom[x].includes(i)) {
                    console.log("change")
                    if (!DM) {
                      boxes[i-1].style.background = "#0d7e6f"
                    } else {
                      boxes[i-1].style.color = "#fff"
                      boxes[i-1].style.background = "#214f47"
                    }
                }
            }


            if (!debug) {
                if (nocon == false) {
                  if (record % 2 != 0){
                      console.log("PLAYER 1 WON")
                      congrats.innerHTML = "Well Done Player 1! Click the Button below to play again"
                      player.innerHTML = "Player 1"
                  }  else {
                      console.log("PLAYER 2 WON")
                      congrats.innerHTML = "Well Done Player 2! Click the Button below to play again"
                      player.innerHTML = "Player 2"
                  }
                } else {
                  console.log("DRAW")
                  congrats.innerHTML = "DRAW! Click the Button below to play again"
                  player.innerHTML = ""
                }
                
                

                boxes.forEach((box) => {
                  box.classList.toggle("pv")
                })
              
                setTimeout(() => {
                    end.classList.toggle("hidden")
                    end.style.display = "flex"
                    for (let x in gb){
                      gb[x] = ""


                    if (!DM) {
                          root.style.setProperty("--boxfont", "#fff")
                          root.style.setProperty("--mainbox", "#28675c")

                          boxes.forEach((box) => {
                            box.style.background = "var(--mainbox)"
                            box.style.color = "var(--boxfont)"
                          })

                      
                          DM = false
                    } else {
                          root.style.setProperty("--boxfont", "#000")
                          root.style.setProperty("--mainbox", "#fff")
                          DM = true

                          boxes.forEach((box) => {
                            box.style.background = "var(--mainbox)"
                            box.style.color = "var(--boxfont)"
                          })
                      
                    }
                    

                    record = 0
                    c = 0
                    boxes.forEach((box) => {
                        box.innerHTML = ""
                    })

                    boxes.forEach((box) => {
                      box.classList.toggle("pv")
                    })
                }
                }, 1000)
            }
        }
    }
}


function check(){
    if (areAllValuesSame(gb) === false) {
        endgame()
    } 

    function tie(){
      let c = 0
      
      for (let i in gb) {
        if (gb[i] == "x" || gb[i] == "o"){
          c++
          if (c == 9) {
            endgame(true)
          } 
        }  
      }
    }  
    tie()
}




function colch(x){
    

    boxnum = x.classList[1]-1

    if (x.innerHTML != "x" && x.innerHTML != "o"){ 
        if (record % 2 == 0) {
            x.innerHTML = "x"
            gb[boxnum] = "x"
        } else {
            x.innerHTML = "o"
            gb[boxnum] = "o"
        }
    }

    record++
    check()
}


boxes.forEach(box => {
    box.addEventListener("click", function() {
        colch(box)

    })
})


function areAllValuesSame(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] !== arr[0]) {
            return false;
        }
    }
    return true;
}




function buttonup(x) {
    x.style.scale = 1
}

function buttondown(x) {
    x.style.scale = 0.9
}


const showin = document.querySelector(".showin")

button.addEventListener("click", () => {
    end.classList.toggle("hidden")
    end.style.display = "none"
    
})


restart = document.querySelector(".rc")

function reset() {
  boxes.forEach((box) => {
    box.innerHTML = ""
  })

  for (let i in gb) {
    gb[i] = ""
  }
}

restart.addEventListener("click", reset)

