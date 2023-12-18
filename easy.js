const DATA = [
    {
        question: 'Кто из художников мог написать эту картину?',
        image: 'easy/25-1+13-0.jpg',
        answers: [
        {
            id: '1',
            value: 'Лисицкий Л. М. "Геометрическая абстракция"',
            correct: true,
        },
        {
            id: '2',
            value: 'Малевич К. С. "Супрематизм"',
            correct: false,
        },
        {
            id: '3',
            value: 'Репин Е. И. "Запорожцы пишут письмо турецкомц султану"',
            correct: false,
        },
        {
            id: '4',
            value: 'Перов В.Г. "Охотники на привале"',
            correct: true,
        },
        {
            id: '5',
            value: 'Татлин В. Е. "Матрос"',
            correct: false,
        },
        {
            id: '6',
            value: 'Суриков В.И. "Покорение Сибири Ермаком Тимофеевичем"',
            correct: false,
        },

        ]
    },
    {
        question: 'Кто из художников мог написать эту картину?',
        image: 'easy/24-1+18-1.jpg',
        answers: [
        {
            id: '7',
            value: 'Татлин В.Е. "Портрет артиста"',
            correct: false,
        },
        {
            id: '8',
            value: 'Шагал М. З. “Юбилей” ',
            correct: false,
        },
        {
            id: '9',
            value: 'Татлин В.Е. "Продавец сукна"',
            correct: true,
        },
        {
            id: '10',
            value: 'Кустодиев Б.М. "Купчиха за чаем"',
            correct: true,
        },
        {
            id: '11',
            value: 'Врубель М.А. "Демон сидящий"',
            correct: false,
        },
        {
            id: '12',
            value: ' Серов В.А. "Девочка с персиками"',
            correct: false,
        },

        ]
    },
    {
        question: 'Кто из художников мог написать эту картину?',
        image: 'easy/22-0+09-1.jpg',
        answers: [
        {
            id: '13',
            value: 'Куинджи А.И. “Степь"',
            correct: false,
        },
        {
            id: '14',
            value: 'Серов В. А. "Пётр I"',
            correct: false,
        },
        {
            id: '15',
            value: 'Борисов-Мусатов В.Э. “Весенний этюд”  ',
            correct: false,
        },
        {
            id: '16',
            value: 'Шишкин И. “Дождь в дубовом лесу” ',
            correct: false,
        },
        {
            id: '17',
            value: 'Левитан И. И. "Поздняя осень"',
            correct: true,
        },
        {
            id: '18',
            value: 'Бенуа А. Н. "Прогулка короля"',
            correct: true,
        },

        ]
    },

];
let localResults = {}; 

const quiz = document.getElementById('quiz');
const questions = document.getElementById('questions');
const indicator = document.getElementById('indicator');
const results = document.getElementById('results');
const btnNext = document.getElementById('btn-next');
const btnRestart = document.getElementById('btn-restart');

const renderQuestions = (index) => {
    renderIndicator(index + 1);
    questions.dataset.currentStep = index;
    const renderAnswers = () =>  DATA[index].answers
        .map((answer) => `
            <li>
                <label>
                    <input class = "answer-input" type = "checkbox" name = ${index} value=${answer.id}>
                    ${answer.value}
                </label>
            </li>
        `)
        .join('');

    questions.innerHTML = `
    <div class = "quiz-questions-item">
        <div class = "quiz-image-item"><img src = ${DATA[index].image} width = "470" height = "350"/></div>
        <div class = "quiz-questions-item_question">${DATA[index].question}</div>
         <ul class = "quiz-questions-item_answers">${renderAnswers()}</ul>
    </div>
  `;
};
const renderResults = () => {
    let content = '';

    const getClassname = (answer, questionIndex) => {
        let classname = '';
        if (!answer.correct && answer.id === localResults[questionIndex]){
            classname = 'answer--invalid';
        } else if(answer.correct){
            classname = 'answer--valid';
        }
        return classname
    };
    const getAnswers = (questionIndex) => DATA[questionIndex].answers
    .map((answer) => `<li class = ${getClassname(answer, questionIndex)}>${answer.value}</li>`)
    .join('');


    DATA.forEach((question, index) => {
        content += `
            <div class = "quiz-results-item">
                <div class = "quiz-results-item_question">${question.question}</div>
                <ul class = "quiz-results-item_answers">${getAnswers(index)}</ul>
            </div>
        `;
    });
    results.innerHTML = content;
};
const renderIndicator = (currentStep) => {
    indicator.innerHTML = `${currentStep}/${DATA.length}`;
};
quiz.addEventListener('change', (event) => {
    if (event.target.classList.contains('answer-input')){
        localResults[event.target.name] = event.target.value;
        btnNext.disabled = false;
    }
});
quiz.addEventListener('click', (event) =>{
    //вперед или сначала
    if (event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

        if (DATA.length === nextQuestionIndex){
            questions.classList.add('questions--hidden');
            results.classList.add('indicator--visible');
            indicator.classList.add('indicator--hidden');
            btnNext.classList.add('btn-next--hidden');
            btnRestart.classList.add('btn-restart--visible');
            //переход к результату
            renderResults();

        } else {
            //переход к следующему вопросу
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }
    if (event.target.classList.contains('btn-restart')){
        localResults = {};
        results.innerHTML = '';

        questions.classList.remove('questions--hidden');
        results.classList.remove('indicator--visible');
        indicator.classList.remove('indicator--hidden');
        btnNext.classList.remove('btn-next--hidden');
        btnRestart.classList.remove('btn-restart--visible');
        renderQuestions(0);
    }

});
renderQuestions(0);