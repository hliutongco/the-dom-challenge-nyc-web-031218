let counter = parseInt(document.getElementById('counter').innerText)
let cntElement = document.getElementById('counter')

const minusButton = document.getElementById('-')
const plusButton = document.getElementById('+')
const heartButton = document.getElementById('<3')
const pauseButton = document.getElementById('pause')
const likes = document.getElementsByClassName('likes')[0]
const commentForm = document.getElementById('comment-form')
const commentList = document.getElementById('list')
const commentInput = document.getElementById('comment-input')
let heartObject = {}

// added named functions to the event listeners
// because removeEventListener does not work on anonymous functions

window.addEventListener("load", function(){ iffy() })

let interval;
function iffy(){
  interval = setInterval(function(){cntElement.innerText = counter += 1}, 1000)
}

plusButton.addEventListener("click", addNumber)
function addNumber(){
  cntElement.innerText = counter += 1
}

minusButton.addEventListener("click", minusNumber)
function minusNumber(){
  cntElement.innerText = counter -= 1
}

heartButton.addEventListener("click", addLikes)
function addLikes() {
    if (heartObject[cntElement.innerText]) {
      heartObject[cntElement.innerText] += 1
      const li = document.querySelector(`li[data-name="${cntElement.innerText}"]`)
      li.innerText = `${cntElement.innerText} has been liked ${heartObject[cntElement.innerText]} time(s)`
    } else {
      heartObject[cntElement.innerText] = 1
      const li = document.createElement("li");
      li.setAttribute("data-name", `${cntElement.innerText}`)
      li.innerText = `${cntElement.innerText} has been liked ${heartObject[cntElement.innerText]} time(s)`
      likes.appendChild(li)
    }
}

let time = 0
function togglePause() {
  let interval;
  if(!isPaused) {
    interval = setInterval(function() {
      plusButton.removeEventListener("click", function(){cntElement.innerText = counter += 1})
      minusButton.removeEventListener("click", function(){cntElement.innerText = counter -= 1})
    }, 1000)
    pauseButton.innerText = "resume"
  } else {
    pauseButton.innerText = "pause"
    clearInterval(interval)
  }
}

pauseButton.addEventListener("click", function(){
  if(pauseButton.innerText === "pause") {
    pauseButton.innerText = "resume"
    clearInterval(interval)
    plusButton.removeEventListener("click", addNumber)
    minusButton.removeEventListener("click", minusNumber)
    heartButton.removeEventListener("click", addLikes)
  } else {
    iffy()
    pauseButton.innerText = "pause"
    plusButton.addEventListener("click", addNumber)
    minusButton.addEventListener("click", minusNumber)
    heartButton.addEventListener("click", addLikes)
  }
})

commentForm.addEventListener('submit', addComment)

function addComment(event){
  event.preventDefault()

  // this comment is only added if the page is not paused
  // removeEventListener does not work on forms
  if(pauseButton.innerText === "pause"){
    let p = document.createElement('p')
    p.innerText = commentInput.value
    commentList.appendChild(p)
  }
}
