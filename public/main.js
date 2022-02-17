time_div = document.getElementById('time')
date_div = document.getElementById('date')
var tm;

const { uname, } = Qs.parse(location.search, {
        ignoreQueryPrefix: true
    })
    // console.log(uname)

function Mon(m) {
    switch (m) {
        case 0:
            return "Jan"
        case 1:
            return "Feb"
        case 2:
            return "Mar"
        case 3:
            return "Apr"
        case 4:
            return "May"
        case 5:
            return "Jun"
        case 6:
            return "Jul"
        case 7:
            return "Aug"
        case 8:
            return "Sep"
        case 9:
            return "Oct"
        case 10:
            return "Nov"
        case 11:
            return "Dec"
    }
}

function Day(d) {
    switch (d) {
        case 1:
            return "Mon"
        case 2:
            return "Tue"
        case 3:
            return "Wed"
        case 4:
            return "Thu"
        case 5:
            return "Fri"
        case 6:
            return "Sat"
        case 7:
            return "Sun"
    }
}

window.setInterval(function() {
    let date = new Date()
    let dat = date.getDate()
    let d = date.getDay()
    let m = date.getMonth()
    day = Day(d)
    mon = Mon(m)
    let final_date = day + ", " + mon + " " + String(dat).padStart(2, "0")
    date_div.innerText = final_date

    let hrs = date.getHours()
    let min = date.getMinutes()
    var am_pm = "AM"

    if (hrs == 12) {
        am_pm = "PM"
    } else if (hrs > 12) {
        hrs = hrs % 12
        am_pm = "PM"
    }

    tm = String(hrs).padStart(2, '0') + ":" + String(min).padStart(2, "0") + " " + am_pm
    time_div.innerText = tm

}, 0)


const chatform = document.getElementById("chat-form")
let msgDiv = document.getElementById("msg-div-block")

//socket
const socket = io()
socket.emit("username", uname)

socket.on('message', message => {
    let create = document.createElement("div")
    create.classList.add("conn-info-block")
    let msglbl = document.createElement("label")
    msglbl.id = "conn-info"
    msglbl.innerText = message
    create.appendChild(msglbl)
    msgDiv.appendChild(create)
    msgDiv.scrollTop = msgDiv.scrollHeight
})

socket.on('chatmesg', mesg => {
    let othermsg = document.createElement("div")
    let namelbl = document.createElement("label")
    namelbl.classList.add('name-class')
    namelbl.innerText = mesg.username
    othermsg.appendChild(namelbl)
    let othermsgblock = document.createElement("div")
    othermsgblock.classList.add("othermsg-div")
    othermsg.classList.add('others-msg')
    msgDiv.appendChild(othermsg)
    let othersmsglbl = document.createElement("label")
    othersmsglbl.id = "others-msg-text"
    othermsg.appendChild(othermsgblock)
    othermsgblock.appendChild(othersmsglbl)
    let tim = document.createElement("label")
    tim.classList.add("time")
    tim.innerText = tm
    othermsgblock.appendChild(tim)
    othersmsglbl.innerText = mesg.chatmsg
    msgDiv.scrollTop = msgDiv.scrollHeight
})


chatform.addEventListener("submit", (e) => {
    e.preventDefault()
    let mymsg = document.getElementById("mymsg")
    if (mymsg.value.length >= 1) {
        let mymsgdiv = document.createElement("div")
        let msgdivblock = document.createElement("div")
        msgdivblock.classList.add("mymsg-div")
        mymsgdiv.classList.add("my-msg")
        let mymsglbl = document.createElement("label")
        let tim = document.createElement("label")
        tim.classList.add("time")
        tim.innerText = tm
        mymsglbl.id = "my-msg-text"
        mymsglbl.innerText = mymsg.value
        msgDiv.appendChild(mymsgdiv)
        mymsgdiv.appendChild(msgdivblock)
        msgdivblock.appendChild(mymsglbl)
        msgdivblock.appendChild(tim)
        var a = {
            "chatmsg": mymsg.value,
            "username": uname
        }
        socket.emit('chatmsgobj', a)
        mymsg.focus()
        mymsg.value = ""
    }
    msgDiv.scrollTop = msgDiv.scrollHeight
})