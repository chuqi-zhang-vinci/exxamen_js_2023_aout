import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import questions from './utils/questions';


function getRamdomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}



let score = 0;

const HomePage = () => {
    const main = document.querySelector('main');
    const question = [];

    score = 0;
    while (question.length !== 3) {
        const randomNumber = getRamdomNumbers(0, questions.length-1);
        
        console.log(randomNumber);

        if(!question.includes(questions[randomNumber])){
            question.push(questions[randomNumber]);
        }
    }

    console.log(question);

    let html='';
    question.forEach((element, i) => {
        html += `
        <form id=form${i}>
        ${question[i].question}
        </form>
        `;
        element.answers.forEach((answer, j) => {
            html += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="question${i}" id="answer${j}" value="${answer.isCorrect}">
                <label class="form-check-label" for="answer${j}">
                    ${answer.text}
                </label>
            </div>
            `;
        });
    });
    html += `<button id="scoreButton">Calculate Score</button>`;
       
    main.innerHTML = html;

    const scoreButton = document.querySelector('#scoreButton');

    scoreButton.addEventListener('click', () => {
        question.forEach((element, i) => {
            const answer = document.querySelector(`input[name="question${i}"]:checked`);
            console.log(`Answer for question ${i}: `, answer);
            if (answer && JSON.parse(answer.value) === true) {
                score+=1;
            }
            console.log(`Final score: ${score}`);
        });
        main.innerHTML = `Score: ${score}/3 <button id="restartButton">Restart</button>`;
        const restartButton = document.querySelector('#restartButton');
        restartButton.addEventListener('click', HomePage);
    });
}

HomePage();