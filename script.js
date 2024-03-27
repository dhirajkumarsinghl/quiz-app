'use strict';

const questionElement = document.querySelector('.question');
const optionsElement = document.querySelectorAll('.options-container button');
const prevBtnElement = document.querySelector('.left-icon i');
const nextBtnElement = document.querySelector('.right-icon i');
const submitBtnElement = document.querySelector('.submit-btn');
const resetBtnElement = document.querySelector('.reset-btn');

/* steps tp solve
1. fetch data from arr of obj.
2. score updation on clicking submit btn.
3. if clicked on prev selected answer should be visible.
4. submit btn to show result score.
5. reset option to unselect all the values.
*/

// gv
let index = 0;
let score = 0;

const questions = [
  {
      id: 1,
      question_string: "What is the capital of Brazil?",
      options: [
          "Rio de Janeiro",
          "São Paulo",
          "Brasília",
          "Buenos Aires"
      ],
      selected: undefined,
      correct: 2
  },
  {
      id: 2,
      question_string: "Which river is the longest in the world?",
      options: [
          "Nile River",
          "Amazon River",
          "Yangtze River",
          "Mississippi River"
      ],
      selected: undefined,
      correct: 0
  },
  {
    id: 3,
    question_string: "Which desert is the largest in the world?",
    options: [
        "Sahara Desert",
        "Arabian Desert",
        "Gobi Desert",
        "Antarctic Desert"
    ],
    selected: undefined,
    correct: 0
  },
  {
    id: 4,
    question_string: "Mount Everest, the world's highest peak, is located in which mountain range?",
    options: [
        "Andes",
        "Himalayas",
        "Rocky Mountains",
        "Alps"
    ],
    selected: undefined,
    correct: 1
  },
  {
    id: 5,
    question_string: "Which country is the largest producer of coffee in the world?",
    options: [
        "Colombia",
        "Brazil",
        "Vietnam",
        "Ethiopia"
    ],
    selected: undefined,
    correct: 1
  },
  
];

// functions
function init(){
  index = 0;
  score = 0;
  updateQAndAnswer(index);
  checkOption();
  questions.forEach((element)=>{
    element.selected = undefined;
  });
  prevBtnElement.classList.add('disabled-btn');
  nextBtnElement.classList.remove('disabled-btn');
}

// to remove all the selected options
const checkOption = ()=>{
  for(let i=0;i<optionsElement.length;i++){
    optionsElement[i].classList.length === 2 ? '': optionsElement[i].classList.remove('selected-btn');
  }
}

// it calc the score
const updateScore = ()=>{
  for(let i=0;i<questions.length;i++){
    if(questions[i].options[questions[i].correct] === questions[i].selected){
      score++;
    }
  }
}

// it updates the value in arr of objects
const selectedOption = (element)=>{
  if(element.classList.length === 2){
    checkOption();
    element.classList.add('selected-btn');
    questions[index].selected = element.value;
  }else{
    element.classList.remove('selected-btn');
  }
}

// update the questions and answer
const updateQAndAnswer = (index)=>{
  questionElement.innerText = questions[index].question_string;
  for(let i=0;i<optionsElement.length;i++){
    optionsElement[i].textContent = questions[index].options[i];
    optionsElement[i].value = questions[index].options[i];
  }
}

// functions to display the selected options
const displaySelectedOptions = (index)=>{
  if(questions[index].selected !== undefined){
    for(let i=0;i<optionsElement.length;i++){
      (questions[index].selected === optionsElement[i].innerText) ? optionsElement[i].classList.add('selected-btn'): '';
    }
  }
}

// it listens the event for all the btn...
for(let i=0;i<optionsElement.length;i++){
  optionsElement[i].addEventListener('click',()=>(
    selectedOption(optionsElement[i])));
}

// eventListeners

nextBtnElement.addEventListener('click',()=>{
  checkOption();
  if(index < questions.length){
    index++;
    updateQAndAnswer(index);
    if(index > 0 && prevBtnElement.classList.value === 'fa-solid fa-circle-chevron-left fa-2xl disabled-btn'){
      prevBtnElement.classList.remove('disabled-btn');
    }
    if(index === questions.length-1){
      nextBtnElement.classList.add('disabled-btn');
    }
    displaySelectedOptions(index);
  } 
})

prevBtnElement.addEventListener('click',()=>{
  checkOption();
  if(index < questions.length){
    if(index === questions.length-1){
      nextBtnElement.classList.remove('disabled-btn');
    }
    index--;
    updateQAndAnswer(index);
    if(index === 0){
      prevBtnElement.classList.add('disabled-btn');
    }
    displaySelectedOptions(index);
  }
})

submitBtnElement.addEventListener('click',()=>{
  updateScore();
  alert(`Your score ${score} / ${questions.length}`);
})

resetBtnElement.addEventListener('click',()=>(init()))

init();

