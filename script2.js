function generateEquations() {
    const equations = [];

    // Генеруємо 20 задач перемішаних типів
    while (equations.length < 20) {
        // Випадково вибираємо тип задачі: множення дробу на число чи знаходження цілого числа
        if (Math.random() < 0.5) {
            // Задача на множення дробу на число
            let numerator = Math.floor(Math.random() * 10) + 1;
            let denominator = Math.floor(Math.random() * 10) + 1;
            if (numerator >= denominator) continue;

            let wholeNumber = (Math.floor(Math.random() * 20) + 1) * denominator;
            let result = (wholeNumber * numerator) / denominator;

            equations.push({ equation: `${numerator}/${denominator} від ${wholeNumber} = X`, answer: result });
        } else {
            // Задача на знаходження цілого числа
            let numerator = Math.floor(Math.random() * 10) + 1;
            let denominator = Math.floor(Math.random() * 10) + 1;
            if (numerator >= denominator) continue;

            let wholeNumber = (Math.floor(Math.random() * 20) + 1) * denominator;
            let result = (wholeNumber * numerator) / denominator;

            equations.push({ equation: `${numerator}/${denominator} це ${result}, яке повне число`, answer: wholeNumber });
        }
    }

    return equations;
}

function createQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = ''; // Очищуємо контейнер перед додаванням нових елементів

    const allQuestions = generateEquations(); // Генеруємо рівняння

    const firstColumn = document.createElement('div');
    const secondColumn = document.createElement('div');

    firstColumn.classList.add('column');
    secondColumn.classList.add('column');

    allQuestions.forEach(({ equation, answer }, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');

        // Додаємо поле для вводу відповіді
        const inputField = `<input type="number" class="answer" data-answer="${answer}" />`;

        // Перевіряємо, чи є "X" у рівнянні
        const formattedEquation = equation.includes('X') 
            ? equation.replace('X', inputField) 
            : `${equation} ${inputField}`;

        questionDiv.innerHTML = `
            <p><strong>${index + 1}:</strong> ${formattedEquation}</p>
            <div class="feedback"></div>
        `;

        if (index < 10) {
            firstColumn.appendChild(questionDiv);
        } else {
            secondColumn.appendChild(questionDiv);
        }
    });

    quizContainer.appendChild(firstColumn);
    quizContainer.appendChild(secondColumn);
}

function checkAnswers() {
    const inputs = document.querySelectorAll('.answer');
    let correct = 0;

    inputs.forEach((input, index) => {
        const userAnswer = parseFloat(input.value);
        const correctAnswer = parseFloat(input.dataset.answer);

        let feedbackDiv = input.closest('.question').querySelector('.feedback');

        setTimeout(() => {
            if (userAnswer === correctAnswer) {
                correct++;
                feedbackDiv.innerHTML = `<i class="correct fas fa-check-circle"></i>`; 
            } else {
                feedbackDiv.innerHTML = `<i class="fas fa-times-circle wrong"><span> ${correctAnswer}</span></i>`;
            }

            feedbackDiv.querySelector('i').classList.add('visible');
        }, index * 500);
    });

    setTimeout(() => {
        const result = Math.round((correct / inputs.length) * 100);
        document.getElementById('result').textContent = `${result} %`;

        if (result === 100) {
            document.getElementById("image1").style.display = "none";
            document.getElementById("image2").style.display = "block";
        }
    }, inputs.length * 500);
}

document.getElementById('checkAnswers').addEventListener('click', checkAnswers);
document.getElementById('newQuiz').addEventListener('click', createQuiz);

createQuiz();
