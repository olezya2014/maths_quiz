function generateEquations() {
    const equations = [];

    // Додавання
    for (let i = 0; i < 3; i++) {
        let x1 = Math.floor(Math.random() * 99) + 1;
        let b1 = Math.floor(Math.random() * 99) + 1;
        let a1 = x1 + b1;

        let x2 = Math.floor(Math.random() * 99) + 1;
        let b2 = Math.floor(Math.random() * 99) + 1;
        let a2 = x2 + b2;

        equations.push({ equation: `X + ${b1} = ${a1}`, answer: x1 });
        equations.push({ equation: `${b2} + X = ${a2}`, answer: x2 });
    }

    // Віднімання
    for (let i = 0; i < 3; i++) {
        let a1 = Math.floor(Math.random() * 99) + 1;
        let b1 = Math.floor(Math.random() * a1) + 1;
        let x1 = a1 - b1;

        let a2 = Math.floor(Math.random() * 99) + 1;
        let b2 = Math.floor(Math.random() * a2) + 1;
        let x2 = a2 - b2;

        equations.push({ equation: `X - ${b1} = ${x1}`, answer: a1 });
        equations.push({ equation: `${a2} - X = ${b2}`, answer: x2 });
    }

    // Множення
    for (let i = 0; i < 3; i++) {
        let x1 = Math.floor(Math.random() * 12) + 1;
        let b1 = Math.floor(Math.random() * 12) + 1;
        let a1 = x1 * b1;

        let x2 = Math.floor(Math.random() * 12) + 1;
        let b2 = Math.floor(Math.random() * 12) + 1;
        let a2 = x2 * b2;

        equations.push({ equation: `X * ${b1} = ${a1}`, answer: x1 });
        equations.push({ equation: `${b2} * X = ${a2}`, answer: x2 });
    }

    // Ділення
    for (let i = 0; i < 3; i++) {
        let x1 = Math.floor(Math.random() * 12) + 1;
        let b1 = Math.floor(Math.random() * 12) + 1;
        let a1 = x1 * b1;

        let x2 = Math.floor(Math.random() * 12) + 1;
        let b2 = Math.floor(Math.random() * 12) + 1;
        let a2 = x2 * b2;

        equations.push({ equation: `X / ${b1} = ${x1}`, answer: a1 });
        equations.push({ equation: `${a2} / X = ${b2}`, answer: x2 });
    }

    for (let i = equations.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index
        [equations[i], equations[randomIndex]] = [equations[randomIndex], equations[i]]; // Swap elements
    }
    return equations;
    
}



const quiz = generateEquations();
console.log(quiz);

function createQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Очищуємо контейнер перед додаванням нових елементів

    const allQuestions = generateEquations(); // Генеруємо рівняння

    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');

    // Додаємо класи для стилізації колонок
    firstColumn.classList.add('column');
    secondColumn.classList.add('column');

    // Розбиваємо питання по колонках
    allQuestions.forEach(({ equation, answer }, index) => {
        const modifiedEquation = equation.replace(
            'X',
            `<input type="number" class="answer" data-answer="${answer}" />`
        );

        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p><strong>${index + 1}:</strong> ${modifiedEquation}</p>
            <div class="feedback"></div> <!-- Додаємо блок для зворотного зв'язку -->
        `;

        // Розподіляємо питання: перші 12 у першу колонку, решту — у другу
        if (index < 12) {
            firstColumn.appendChild(questionDiv);
        } else {
            secondColumn.appendChild(questionDiv);
        }
    });

    // Додаємо обидві колонки до контейнера
    quizContainer.appendChild(firstColumn);
    quizContainer.appendChild(secondColumn);
}

// Check the answers
function checkAnswers() {
    const inputs = document.querySelectorAll('.answer');
    let correct = 0;

    inputs.forEach((input, index) => {
        const userAnswer = parseInt(input.value, 10);
        const correctAnswer = parseInt(input.dataset.answer, 10);

        // Locate or create the feedback container
        let feedbackDiv = input.closest('.question').querySelector('.feedback');
        if (!feedbackDiv) {
            feedbackDiv = document.createElement('div');
            feedbackDiv.className = 'feedback';
            input.closest('.question').appendChild(feedbackDiv); // Append feedback to the question container
        }

        // Add a delay for feedback appearance
        setTimeout(() => {
            if (userAnswer === correctAnswer) {
                correct++;
                feedbackDiv.innerHTML = `<i class="correct fas fa-check-circle"></i>`; // Green check icon
            } else {
                feedbackDiv.innerHTML = `<i class="fas fa-times-circle wrong"><span>  ${correctAnswer}</span></i>`; // Red cross icon
            }

            // Smooth appearance of icons
            feedbackDiv.querySelector('i').classList.add('visible');
        }, index * 500); // Delay increases by 200ms for each question
    });

    // Show the final score after all feedback is displayed
    setTimeout(() => {
        const result = Math.round((correct / inputs.length) * 100);
        document.getElementById('result').textContent = `${result} %`;
    }, inputs.length * 500); // Wait for all feedback delays to complete
}

// Initialize the quiz
createQuiz();

// Add event listener for checking answers
document.getElementById('checkAnswers').addEventListener('click', checkAnswers);
document.getElementById('newQuiz').addEventListener('click',createQuiz)