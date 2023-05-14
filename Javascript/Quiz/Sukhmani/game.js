const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {

        //spørsmål om planleggning og doc
        question: 'Hva er universal utformning? ',
        choice1: 'innholdet skal være tilpasset for alle uansett behov',
        choice2: 'inhnholdet skla være tilpasset for en spesifikk',
        choice3: 'innholdet skal bare for en person',
        choice4: 'innholdet skal være åpent for alle',
        choice5: 'innholdet skal være stengt for alle',
        choice6: 'ingen av dem over',
        answer: 1,
    },

 

    {

        // question about oop
        question: "Hvordan definerer man en funksjon i JS?",
        choice1: "Funksjon navn(){}",
        choice2: "Navn function()[]",
        choice3: "function navn(){}",
        choice4: "function navn()()",
        choice5: "function navn{}[]",
        choice6: "Navn function(){}",
        
        answer: 3,
    },

    {

        //question about spillprogrammering
        question: "Hva er en av egenskapene som er spesielt med spillprogrammering",
        choice1: "mye action",
        choice2: "button-input",
        choice3: "egenskapen til å oppdatere",
        choice4: "Bokstaver",
        choice5: "ingen av dem",
        choice6: "alle",
        answer: 3,
    },


    {

        // question about valgfri tema
        question: "Hvilket språk må man skrive i for å få animering transitions?",
        choice1: "Python",
        choice2: "JavaScript",
        choice3: "CSS",
        choice4: "C++",
        choice5: "Rust",
        choice6: "HTML",
        answer: 3,
    }


]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()