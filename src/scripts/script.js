const option_1 = document.querySelector('#option_1')
const option_2 = document.querySelector('#option_2')
const option_3 = document.querySelector('#option_3')
const option_4 = document.querySelector('#option_4')
const option_5 = document.querySelector('#option_5')

const questionTitle = document.querySelector('#question')
const result_score = document.querySelector('#result_score')
const result = document.querySelector('.result')

let questionNum = 1

let score = 0

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

function nextQuestion() {
    if (questionNum == 2) {
        questionTitle.innerHTML = questions[2]
        option_1.innerHTML = buttonQuestion_2[1]
        option_2.innerHTML = buttonQuestion_2[2]
        option_3.classList.add('hide')
        option_4.classList.add('hide')
        option_5.classList.add('hide')
    } 
    else if (questionNum == 3) {
        questionTitle.innerHTML = questions[3]
        option_1.innerHTML = buttonQuestion_3[1]
        option_2.innerHTML = buttonQuestion_3[2]
        option_3.innerHTML = buttonQuestion_3[3]
        option_3.classList.remove('hide')
    }
    else if (questionNum > 3) {
        questionTitle.innerHTML = 'You Completed The Test!'
        option_1.classList.add('hide')
        option_2.classList.add('hide')
        option_3.classList.add('hide')
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

    if (questionNum >= 2) {
        result.classList.add('show')
    }
})