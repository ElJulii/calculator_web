//div elements
const screen_operation = document.querySelector('.text-screen');
const screen_result = document.querySelector('.result-history');
const history_screen = document.querySelector('.history-panel')
const button_clean_history = document.querySelector('.clean-history');
//buttons
const one = document.querySelector('.one')
const two = document.querySelector('.two')
const three = document.querySelector('.three')
const four = document.querySelector('.four')
const five = document.querySelector('.five')
const six = document.querySelector('.six')
const seven = document.querySelector('.seven')
const eight = document.querySelector('.eight')
const nine = document.querySelector('.nine')
const zero = document.querySelector('.zero')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const per = document.querySelector('.per')
const divide = document.querySelector('.divide');
const sqrt = document.querySelector('.sqrt');
const pow = document.querySelector('.pow');
const dot = document.querySelector('.dot');
const equal = document.querySelector('.equal');
const c = document.querySelector('.c');
const del = document.querySelector('.del')

//components fo screen and array of operation
let result_operation = undefined;
screen_result.innerHTML = `<p>0</p>`;
let array_operation;
//events of buttons
button_clean_history.addEventListener('click', () => {
    history_screen.textContent = '';
    screen_result.innerHTML = `<p>0</p>`;
    result_operation = undefined;
    screen_operation.textContent = '';
})

one.addEventListener('click', () => {
    screen_operation.textContent += '1';
})
two.addEventListener('click', () => {
    screen_operation.textContent += '2';
})
three.addEventListener('click', () => {
    screen_operation.textContent += '3';
})
four.addEventListener('click', () => {
    screen_operation.textContent += '4';
})

five.addEventListener('click', () => {
    screen_operation.textContent += '5';
})
six.addEventListener('click', () => {
    screen_operation.textContent += '6';
})
seven.addEventListener('click', () => {
    screen_operation.textContent += '7';
})
eight.addEventListener('click', () => {
    screen_operation.textContent += '8';
})
nine.addEventListener('click', () => {
    screen_operation.textContent += '9';
})
zero.addEventListener('click', () => {
    screen_operation.textContent += '0';
})
plus.addEventListener('click', () => {
    screen_operation.textContent += ' + ';
})
minus.addEventListener('click', () => {
    screen_operation.textContent += ' - ';
})
per.addEventListener('click', () => {
    screen_operation.textContent += ' x ';
})
divide.addEventListener('click', () => {
    screen_operation.textContent += ' / ';
})
sqrt.addEventListener('click', () => {
    screen_operation.textContent += ' √';
})
pow.addEventListener('click', () => {
    screen_operation.textContent += '^';
})
c.addEventListener('click', () => {
    screen_operation.textContent = '';
    screen_result.innerHTML = `<p>0</p>`;
    array_operation = [];
    result_operation = undefined;
})
del.addEventListener('click', () => {
    screen_operation.textContent = screen_operation.textContent.substring(0,  screen_operation.textContent.length - 1);

})
equal.addEventListener('click', () => {
    array_operation = putInside(screen_operation.textContent);

    result_operation = resolveOperation(array_operation);
    screen_result.innerHTML = `<p>${result_operation}</p>`;
    history_screen.innerHTML += `<p>${screen_operation.textContent} = ${screen_result.textContent}</p>`;
    screen_operation.textContent = result_operation.toString();
    console.log(array_operation)
})
dot.addEventListener('click', () => {
    screen_operation.textContent += '.';
})
//put the text content into the array
const putInside = (textContent) => {
    let arrayInside = [];
    for (let i = 0; i < textContent.length; i++) {
        arrayInside.push(textContent[i])
    }
    arrayInside = arrayInside.filter(x => x !== ' ');
    textContent = arrayInside.join('');

    arrayInside = [];


    let temporalNum = '';

    for (let i = 0; i < textContent.length; i++) {
        if (isANumber(textContent[i])) {
            temporalNum += textContent[i];
         }  else {
            arrayInside.push(temporalNum);
            temporalNum = '';
            arrayInside.push(textContent[i])
        }
    }
    arrayInside.push(temporalNum);

    arrayInside = arrayInside.filter(x => x !== '');

    return arrayInside;
}

//function to solve an operation
function resolveOperation(array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === '√') {
            array[i] = Math.sqrt(parseFloat(array[i + 1]));
            array.splice(i + 1, 1);
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '^') {
            array[i - 1] = Math.pow(parseFloat(array[i -1] ), parseFloat(array[i + 1]));
            array.splice( i, 2);
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] === '/') {
            array[i - 1] = parseFloat(array[i - 1]) / parseFloat(array[i + 1]);
            array.splice(i, 2);
        }
    }

    for (let i = 0; i < array.length; i++) {
        if (array[i] === 'x') {
            array[i - 1] = parseFloat(array[i - 1]) * parseFloat(array[i + 1]);
            array.splice(i, 2);
        }
    }

    let result = parseFloat(array[0]);

    if (array[0] === '-') {
        result = parseFloat(array[1]) * (-1);
        array.splice(0, 1);
    }


    for (let i = 0; i < array.length; i++) {
        if (array[i] === '+') {
            result += parseFloat(array[i + 1]);
        }
        if (array[i] === '-') {

            result -= parseFloat(array[i + 1]);
        }
    }
    return result;
}

function isANumber (num) {
    return num === '1' ||
        num === '2' ||
        num === '3' ||
        num === '4' ||
        num === '5' ||
        num === '6' ||
        num === '7' ||
        num === '8' ||
        num === '9' ||
        num === '0' ||
        num === '.'
}
