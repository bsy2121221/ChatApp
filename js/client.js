const socket=io('http://localhost:8000');

const form=document.getElementById('send-container');
const messageInput=document.getElementById("messageInp");
const messagecontainer=document.querySelector('.container');
const audio= new Audio('ting.mp3');

const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }

}

const name=prompt("Enter your name to join the chat");
socket.emit('new-user-joined',name);

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.Value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageInput.value=''
})
// const message=messageInput.Value;
// console.log(message);
socket.on('user-joined',name=>{
    append(`${name} join the chat`,'left');
})

socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
})

socket.on('leave',name=>{
    append(`${name} left the chat`,'left');
})