
const option_1 = document.querySelector('#option_1')
const option_2 = document.querySelector('#option_2')
const option_3 = document.querySelector('#option_3')
const option_4 = document.querySelector('#option_4')
const option_5 = document.querySelector('#option_5')

const questionTitle = document.querySelector('#question')
const result_score = document.querySelector('#result_score')
const result = document.querySelector('.result')

const result_name = document.querySelector('#result_name')

const profileName = document.querySelector('#profileName')
const profileText = document.querySelector('#profileText')
const profile = document.querySelector('#profile')

let questionNum = 1

let score = 0

let nickname = ''
let userName;

let timeSpend = 0;
let endQuiz = false

let latestTime;
let latestPer;

let nextSound = new Audio('./src/assets/images/level.mp4')

let avatar = './src/assets/images/user.png'

const questions = {
    1: "How long do you use TikTok per day?",
    2: "Do you know the trends on TikTok?",
    3: "Do you record on TikTok?"
}

const buttonQuestion_1 = {
    1: "0min",
    2: "15min +",
    3: "45min +",
    4: "1h +",
    5: "3h +"
}
const buttonQuestion_2 = {
    1: "Yes",
    2: "No"
}
const buttonQuestion_3 = {
    1: "Yes",
    2: "No",
    3: "Sometimes"
}
const completeText = {
    0: "You're not a tiktok kid one percent! Congratulations!",
    5: "You're a bit of a tiktok kid, but there's no tragedy",
    25: "You use tiktok quite often, it is recommended to limit the time spent on this application",
    45: "You are going to be a tiktok kid, reduce your time spent in this app",
    75: "You're getting worse! Try to put the tiktok aside for a while, because you become a tiktok baby pretty quickly!",
    90: "You are a child of tiktok, put away tiktok for a long period of time or try to reduce its use significantly!"
}

const progress = document.querySelector('.progress')
progress.style.width = '0%'

let avatarAccess = false
let cash = 0
let money = 0

function nextQuestion() {
    nextSound.play() 
    if (questionNum == 2) {
        questionTitle.innerHTML = questions[2]
        option_1.innerHTML = buttonQuestion_2[1]
        option_2.innerHTML = buttonQuestion_2[2]
        option_3.classList.add('hide')
        option_4.classList.add('hide')
        option_5.classList.add('hide')
        progress.style.width = '33%'
    } 
    else if (questionNum == 3) {
        questionTitle.innerHTML = questions[3]
        option_1.innerHTML = buttonQuestion_3[1]
        option_2.innerHTML = buttonQuestion_3[2]
        option_3.innerHTML = buttonQuestion_3[3]
        option_3.classList.remove('hide')
        progress.style.width = '66%'
    }
    else if (questionNum > 3) {
        progress.style.width = '100%'
        if (score == 0) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[0]}</span>`
        }
        if (score >= 5) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[5]}</span>`
        }
        if (score >= 25) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[25]}</span>`
        }
        if (score >= 45) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[45]}</span>`
        }
        if (score >= 75) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[75]}</span>`
        }
        if (score >= 90) {
            questionTitle.innerHTML = `You Completed The Test in ${timeSpend} seconds! <br> <span>${completeText[90]}</span>`
        }
        option_1.classList.add('hide')
        option_2.classList.add('hide')
        option_3.classList.add('hide')
        endQuiz = true
        latestPer = score
        latestTime = timeSpend
        save()
        window.setTimeout(() => {
            window.location.search = '?game=menu'
        }, 2000)
    }
}

option_1.addEventListener('click', function() {
    if (questionNum == 1) {
        score += 0
    } 
    else if (questionNum == 2) {
        score += 15
    }
    else if (questionNum == 3) {
        score += 25
    }
    questionNum++
    nextQuestion()
})
option_2.addEventListener('click', function() {
    if (questionNum == 1) {
        score += 5
    }
    else if (questionNum == 2) {
        score += 0
    }
    else if (questionNum == 3) {
        score += 0
    }
    questionNum++
    nextQuestion()
})
option_3.addEventListener('click', function() {
    if (questionNum == 1) {
        score += 30
    }
    else if (questionNum == 3) {
        score += 15
    }
    questionNum++
    nextQuestion()
})
option_4.addEventListener('click', function() {
    if (questionNum == 1) {
        score += 45
    }
    questionNum++
    nextQuestion()
})
option_5.addEventListener('click', function() {
    if (questionNum == 1) {
        score += 60
    }
    questionNum++
    nextQuestion()
})

window.setInterval(() => {
    result_score.innerHTML = `${score}%`
    result_name.innerHTML = userName

    if (questionNum >= 2) {
        result.classList.add('show')
    }
})

function checkName() {
    if (userName == undefined && window.location.search != '?login=true') {
        window.location.search = '?login=true'
    }
}

function sumName() {
    if (userName == undefined) {
        userName = nickname
        save()
        window.location.search = '?game=menu'
    }
}
function toMenu() {
    window.location.search = '?game=menu'
}
const avatarInput = document.querySelector('#avatarInput')
const urlType = document.querySelector('#urlType')
function changeAvatar() {
    if (avatarAccess == true) {
        urlType.classList.toggle('show')
    }
}
const shopMenu = document.querySelector('#shop')
const moneyBox = document.querySelector('#money')
function toStore() {
    shopMenu.classList.toggle('hide')
}


window.setInterval(() => {
    moneyBox.innerHTML = money
    let name = document.querySelector('#nickname')
    nickname = name.value
})

function buy_item(a) {
    if (arguments[0] == 0) {
        if (money >= 2) {
            if (avatarAccess == false) {
                avatarAccess = true
                money = 0
            }
        }
    }
    save()
}

function save() {
    let Save = {
        userName: userName,
        latestTime: latestTime,
        latestPer: latestPer,
        avatar: avatar,
        avatarAccess: avatarAccess,
        cash: cash,
        money: money,
    };
    localStorage.setItem("Saved", JSON.stringify(Save));
}
function load() {
    var SaveGame = JSON.parse(localStorage.getItem("Saved"));
    if (typeof SaveGame.userName !== "undefined")
    userName = SaveGame.userName;
    if (typeof SaveGame.latestTime !== "undefined")
    latestTime = SaveGame.latestTime;
    if (typeof SaveGame.latestPer !== "undefined")
    latestPer = SaveGame.latestPer;
    if (typeof SaveGame.avatar !== "undefined")
    avatar = SaveGame.avatar;
    if (typeof SaveGame.avatarAccess !== "undefined")
    avatarAccess = SaveGame.avatarAccess;
    if (typeof SaveGame.cash !== "undefined")
    cash = SaveGame.cash;
    if (typeof SaveGame.money !== "undefined")
    money = SaveGame.money;
    checkName();
}
function startGame() {
    window.location.search = '?game=start'
}

const gameStart = document.querySelector('#gameStart')
const registerEnd = document.querySelector('#registerEnd')
const gameMenuStart = document.querySelector('#gameMenuStart')
// const leaderstats = document.querySelector('#leaderstats')

window.setTimeout(() => {
    if (window.location.search == '?game=menu') {
        registerEnd.classList.add('hide')
        gameMenuStart.classList.remove('hide')
        profile.classList.remove('hide')
    } 
    else if (window.location.search == '?game=start') {
        gameStart.classList.remove('hide')
        gameMenuStart.classList.add('hide')
        registerEnd.classList.add('hide')
        profile.classList.add('hide')

    }
    // else if (window.location.search == '?game=leaderboard') {
    //     gameStart.classList.add('hide')
    //     gameMenuStart.classList.add('hide')
    //     registerEnd.classList.add('hide')
    //     leaderstats.classList.remove('hide')
    // }
})

function sumAvatar() {
    if (avatarInput.value != '') {
        avatar = avatarInput.value
        save();
        avatarInput.value = ''
        changeAvatar()
    }
}

window.setInterval(() => {
    profileName.innerHTML = userName
    if (latestPer == undefined) {
        profileText.innerHTML = `Play first time`
    } else {
        profileText.innerHTML = `${latestTime}sec - ${latestPer}%`
    }
    if (userName != undefined) {
        if (window.location.search != '?game=menu') {
            if (window.location.search != '?game=start') {
                window.location.search = '?game=menu'
            }
        }
    }
})

const timeCheck = document.querySelector('#timeCheck')

window.setInterval(() => {
    cash += 1
    save()
    if (window.location.search == '?game=start' && endQuiz == false) {
        timeSpend++
        timeCheck.innerHTML = `${timeSpend} sec`
    }
}, 1000)

const avatarToChange = document.querySelector('#avatarToChange')

window.setInterval(() => {
    avatarToChange.src = avatar

    if (cash >= 60) {
        cash = 0
        money += 1
    }
})

window.setInterval(() => {
    if (avatarAccess == false) {
        avatarToChange.style.cursor = 'no-drop'
    } else {
        avatarToChange.style.cursor = 'pointer'
    }
})
const shop_top = document.querySelector('.shop_money_help')
function money_tip() {
    if (shop_top.style.display == 'none') {
        shop_top.style.display = 'block'
    } else {
        shop_top.style.display = 'none'
    }
}
