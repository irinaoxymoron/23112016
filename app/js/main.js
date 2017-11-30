// Функция: создает новый параграф и добавляет его вниз тела HTML.

function createParagraph() {
    var para = document.createElement('p');
    para.textContent = 'You clicked the button';
    document.body.appendChild(para);
}

/*
 1. Получаем ссылки на все кнопки на странице и отсортировываем их в массиве.
 2. Перебираем все кнопки и добавляем к ним отслеживатель события нажатия.

 При нажатии любой кнопки будет выполняться функция createParagraph().
*/

var buttons = document.querySelectorAll('button');

for(var i = 0; i < buttons.length ; i++) {
    buttons[i].addEventListener('click', createParagraph);
}

// Number guessing game

var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton;

function checkGuess() {
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You got it right!';
        lastResult.style.backgroundColor = '#47b347';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = '#ff6d6d';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Last guess was too low!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Last guess was too high!';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}

// Логические операторы

/* В логическом контексте:
Число 0 (-0), пустая строка "", null и undefined, а также NaN являются false,
Остальные значения – true, включая отрицательные числа, к примеру такие как -1.*/

console.log("" + 1 + 0); // строка "10";
console.log("" - 1 + 0); // мат.выражение, численное преобразование -1;
console.log(true + false); // 1, преобразуются к числам;
console.log(6 / "3"); // 2, преобразуются к числам;
console.log("2" * "3"); // 6;
console.log(4 + 5 + "px"); // 9px, посчитает и к строке; !!!
console.log("$" + 4 + 5); // $45, строка;

console.log("4" - 2); // 2;
console.log("4px" - 2); // NaN;

console.log(7 / 0); // Infinity; !!!

console.log("  -9\n" + 5); // -9 переход на новую строку 5;
console.log("  -9\n" - 5); // -14 численное преобразование;
console.log(5 && 2); // 2; !!!

console.log(2 && 5); // 5;

console.log(5 || 0); // 5;

console.log(0 || 5); // 5;
console.log(null + 1); // null = 0 + 1 = 1; !!!
console.log(undefined + 1); // undefined преобразуется в NaN;
console.log(null == "\n0\n"); // false; При сравнении == с null преобразования не происходит, есть жёсткое правило: null == undefined и только.
console.log(+null == +"\n0\n"); // null = 0, true; И левая и правая часть == преобразуются к числу 0.