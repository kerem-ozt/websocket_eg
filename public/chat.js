const sendbtn = document.getElementById('sendbtn');
const output = document.getElementById('deneme5');
var messages = document.getElementById('messages');
var inpmsg = document.getElementById('inp2');
var inpgiris = document.getElementById('inp');

var socket = io();

var username = '';
var mesaj = '';
var to = '';

function giris() {
    username = document.getElementById("inp").value;
    document.getElementById("box1").style.visibility = "visible";
    document.getElementById("giris").remove();
}

function msg() {
    mesaj = document.getElementById("inp2").value;
    console.log(mesaj);
    document.getElementById("inp2").innerHTML = '';
}

function oda1() {
    to = 'oda1';
    socket.emit('create', 'room1');
    document.getElementById("12").remove();
}

function oda2() {
    to = 'oda2';
    socket.emit('create', 'room2');
    document.getElementById("12").remove();
}

inpgiris.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("bt1").click();
    }
});

inpmsg.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
       sendbtn.click();
      }
});

sendbtn.addEventListener ('click', () => {
    console.log('1:',mesaj)
    socket.emit('chat', {
        message: mesaj,
        sender: username,
        kime: to,
    })
})

socket.on('connectToRoom',function(data){
    var item = document.createElement('li');
    item.textContent = data
    messages.appendChild(item);
 });

socket.on('chat', data =>{
    if (data.kime === to) {
        var item = document.createElement('li');
        item.textContent = data.sender + ' : ' + data.message + ' to : ' + data.kime;
        messages.appendChild(item);
    }
    console.log('3:',data.message);
    inpmsg.value = '';
})