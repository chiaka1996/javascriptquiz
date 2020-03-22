window.addEventListener('load', () => {
let firstRow = document.querySelector('#firstRow').children;
let secondRow = document.querySelector('#secondRow').children;
let quizHeader = document.querySelector('#quiz-header');
let question = document.querySelector('#question');
let choice0 = document.querySelector('.btn0');
let choice1 = document.querySelector('.btn1');
let choice2 = document.querySelector('.btn2');
let choice3 = document.querySelector('.btn3');
let startButton = document.querySelector('#start-button');
let startLayout = document.querySelector('#start-layout');
let next = document.querySelector('#next');
let grid = document.querySelector('.grid');
let exit = document.querySelector('#exit');
let x = document.querySelector('#x');
let y = document.querySelector("#y");
let answerLength = document.querySelector('#answerLength');
let noOfCorrect = document.querySelector("#noOfCorrect");
let mySelect = document.querySelector(".mySelect");
let selectLevel = document.querySelector("#selectLevel");
let questionType = document.querySelector("#question-type");
let i = 0;
let k = 1;
let r = 0;
let jsonResult;
let errorCode;
let answerArray = [];
let correctAnswer;
let resultLength;
let result;
let mySelectValue = mySelect.value;
let questionValue = parseInt(questionType.value);
let levelBoolean = false;
let questionBoolean = false;
let fetchBoolean = false;
let answerButtons = [...firstRow, ...secondRow];




//function to fetch question and answers
startButton.classList.add('disable');

let questionAnswer = (data) => {
                
                 result = data.results;
                resultLength = result.length;  
             question.innerHTML = data.results[i].question;
             let wrong_answers = data.results[i].incorrect_answers;
             answerArray = [...wrong_answers];
             answerArray.push(data.results[i].correct_answer);
             shuffle(answerArray);
             correctAnswer = answerArray.indexOf(data.results[i].correct_answer);

             choice0.innerHTML = answerArray[0];
             choice1.innerHTML = answerArray[1];
             choice2.innerHTML = answerArray[2];
             choice3.innerHTML = answerArray[3];
             x.innerHTML = k;
             y.innerHTML = resultLength;
             answerLength.innerHTML = resultLength;
             noOfCorrect.innerHTML = r;
             
       }

//function to reset buttons to normal color and state after answering a question
let resetButtons = () => {
    for(let j=0; j<answerButtons.length; j++){
        answerButtons[j].classList.remove("disable");
        answerButtons[j].classList.remove("correct");
        answerButtons[j].classList.remove("wrong");

    }
}

//function to disable the answer buttons
let optionDisabled = () => {
    for(let k = 0; k < answerButtons.length; k++){
        answerButtons[k].classList.add("disable");
        console.log(answerButtons[k]);

            if(answerButtons[k].id === correctAnswer.toString() ) {
                    answerButtons[k].classList.add("correct");

            }
    }
}

//function to shuffle the answers
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


//fetch my questions and answers from api
//console.log(mySelectValue);

let fetchApi = () => {
     fetch(`https://opentdb.com/api.php?amount=20&category=${questionValue}&difficulty=${mySelectValue}&type=multiple`)
     .then(result => {
         return result.json();
     })
     .then(data => {
          
         if(data){
            //questionAnswer(data);
            jsonResult = data;
            errorCode = jsonResult.response_code;

           console.log(jsonResult);
            fetchBoolean = true;

             if(errorCode == 0){
                    startButton.classList.remove('disable');  
                    startButton.style.backgroundColor = "green";  
                    }
            else{
                startButton.classList.add('disable');
            }

             startButton.addEventListener('click', ()=>{
        
             startLayout.style.display = "none";
              grid.style.display = "block";
              console.log(mySelectValue);
               questionAnswer(data);
              checkCorrectAnswer();
              
            })
                   

            next.addEventListener('click', () => {
                
                i++
                 k++
                 if( resultLength >= k){
                    questionAnswer(data); 
                resetButtons();
                console.log(k);
             console.log(resultLength);
             console.log(r);

             
                 }

                else{

                    if(r >= resultLength/2){
                        alert('congratulations you passed,  result: ' +  r + ' of ' + resultLength );
                        location.reload();
                    }
                    else{
                        alert('oouch you failed,  result: ' +  r + ' of ' + resultLength );
                        location.reload();
                    }
                    
                }

                if(resultLength == k){
                next.style.backgroundColor = "#EEE111";
                next.innerHTML = "Submit";
                                    }
                                        })


            //                 
              
          }
        })
 }

        let checkCorrectAnswer = () => {
            choice0.addEventListener('click', () => {
                if( 0 === correctAnswer){
                    choice0.classList.add("correct");
                    r++
                }
                else{
                    choice0.classList.add("wrong");
                }
                optionDisabled();
            })

                choice1.addEventListener('click', () => {
                if( 1 === correctAnswer){
                    choice1.classList.add("correct");
                    r++
                }
                else{
                    choice1.classList.add("wrong");
                }
                 optionDisabled();
            })     

                choice2.addEventListener('click', () => {
                if( 2 === correctAnswer){
                    choice2.classList.add("correct");
                r++
                }
                else{
                    choice2.classList.add("wrong");
                }
                 optionDisabled();
            })     

                choice3.addEventListener('click', () => {
                if( 3 === correctAnswer){
                    choice3.classList.add("correct");
                r++
                }
                else{
                    choice3.classList.add("wrong");
                }
                 optionDisabled();
            })  

        }

        //fetchApi();

        let booleanCheck = () => {
            if (levelBoolean && questionBoolean) {
                    fetchApi();
                    
        }
        }; 


            console.log(correctAnswer);
        
             mySelect.addEventListener("change", ()=>{
                mySelectValue = mySelect.value;
                levelBoolean = true;
                //fetchApi();
                booleanCheck();
                //console.log(mySelect.value);
                //console.log(levelBoolean);
            })
             
             questionType.addEventListener("change", () => {
                questionValue = parseInt(questionType.value);
                questionBoolean = true;
                //fetchApi();
                booleanCheck();
                //console.log(questionValue);
                //console.log(questionBoolean);
             })
            
           
      
      exit.addEventListener('click', () => {
        location.reload();
      })

      // selectLevel.addEventListener('click', () => {
      //   alert('please choose either Easy, Medium or Hard');
      // })
      

     })