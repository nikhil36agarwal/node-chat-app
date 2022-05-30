const socket = io() 

let textarea = document.getElementById('textarea')
let messageArea = document.querySelector('.msgbox')
let name;
let stat = document.getElementById('status').textContent
var body = document.getElementsByTagName("BODY")[0]
name = null
name = document.getElementById('namespan').textContent

if (stat == 200) {
    body.style.display = 'block'
    if (!name) {
        alert("Session Expired! Login Again...")
        window.location.href ='/'
    } else {
        document.getElementById('namespan').textContent = ''
    }
} else if(stat==403) {
    alert('Invalid Credentials!...')
    window.location.href = '/'
} else if (stat==303) {
    alert('Username already taken...')
    window.location.href = '/'
} else {
    alert('Unexpected error ocuured.. :(')
}


function sendform(type) {
    var form;
    if (type == 'login') {
        form = document.getElementById('loginform');
        form.action = "/login";
        var result = form.submit()
   
    }
    else if (type == 'signup') {
        
    } else {
        prompt("Unexpected Error Occured!...")
    }
}

document.getElementById('sendbtn').onclick = function () {

    if (textarea.value) {
        sendMessage(textarea.value)
    }
    textarea.value= ""
}
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value)
        textarea.value= ""
    }
 
})

function sendMessage(txtmsg){
    let msg = {
        user:name,
        message: txtmsg.trim(),
    }
    //append
    appendMessage(msg, 'send')
    scrollToBottom()
    //send message
    socket.emit('message',msg)
}

function appendMessage(msg, type) {

    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'msg')
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)

}

//receive message

socket.on('message', (msg) => {
    appendMessage(msg, 'receive')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}