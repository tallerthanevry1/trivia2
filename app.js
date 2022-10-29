// https://cdn.contentful.com
// space: 'cp3306uz387z',
// environment: 'master', // defaults to 'master' if not set
// accessToken: 'tvFfxpfCDZrvZneWYvv6UJJ7NajgUsJ-b4hFNQVHask'



//******************** */
// APP STATE
//******************* */

const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true
}

let questions = []

//******************** */
// Main DOM Element
//******************* */

const $question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

//******************** */
// Functions
//******************* */

const chooseAnswer = (event, question) => {
    console.log(event)
    if(event.target.innerText === question.answer){
        console.log("correct")
        if (state.which){
            state.player1++
            state.which = !state.which
        }else{
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    } else {
        console.log("incorrect")
        setBoard(questions)
        state.which = !state.which
    }
}

const setBoard = (q) => {
    // Getting a random question
    const randomIndex = Math.floor(Math.random() * q.length)
    const randomQuestion = q[randomIndex]
    console.log(randomQuestion)
    //Update question
    $question.text(randomQuestion.questions)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)

    //update players scores
    $p1score.text(state.player1) 
    $p2score.text(state.player2)

    $("li").off()
    $("li").on("click", (event) => {
        chooseAnswer(event, randomQuestion)
    })
}

// Main App Logic

const URL ="https://cdn.contentful.com/spaces/cp3306uz387z/environments/master/entries?access_token=lZJNAYjhNu6iK5QX0e7oQUtyniE2jrUYL_DFbpKvvCA&content_type=triviaQs"
$.ajax(URL)
.then((data) => {
    questions = data.items.map((q) => q.fields)
    console.log(data)
    console.log(questions)

    setBoard(questions)
    
})