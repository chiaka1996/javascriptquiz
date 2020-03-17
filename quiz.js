// let quizHeader = document.querySelector('#quiz-header');
// var question = document.getElementById('question');
// let choice0 = document.querySelector('#choice0');
// let choice1 = document.querySelector('#choice1');
// let choice2 = document.querySelector('#choice2');
// let choicee3 = document.querySelector('#choice3');
// let startButton = document.querySelector('#startbutton');
// let i = 0;

//api fetch questions function
var answerArry = [];
 function quizQuestion(){
     fetch(`https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple`)
     .then(result => {
         return result.json();
     })
     .then(data => {
         console.log(data);
         if(data){
             document.getElementById('question').innerHTML = data.results[0].question;
             
         }
     })

    }

    //  startButton.addEventListener('click', ()=>{
    //      quizQuestion();
    //  })