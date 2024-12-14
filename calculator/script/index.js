let result = '';
const display = document.createElement('input');
display.type = 'text';
display.disabled = true;
const btnsWrapper = document.createElement('div');

document.body.append(display, btnsWrapper);

const arr = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '0', '+', '-',
    '*', '/', 'C',
    'AC', '=', '%',
    'sqrt', 'sin', 'cos', 'tan',
    'log', 'ln', '^', 'π', 'e'
];

const calculateResult = (expression) => {
    try {
        expression = expression.replace('sqrt', 'Math.sqrt')
            .replace('sin', 'Math.sin')
            .replace('cos', 'Math.cos')
            .replace('tan', 'Math.tan')
            .replace('log', 'Math.log10')
            .replace('ln', 'Math.log')
            .replace('^', '**') 
            .replace('π', 'Math.PI')
            .replace('e', 'Math.E');
        
        const func = new Function(`return ${expression}`);
        return func();
    } catch {
        return 'Error';
    }
};

const getNum = (e) => {
    const btnValue = e.target.innerHTML;

    if (btnValue === 'AC') {
        result = '';
    } else if (btnValue === 'C') {
        result = result.slice(0, -1);
    } else if (btnValue === '=') {
        result = `${calculateResult(result)}`;
    } else if (btnValue === '%') {
        result = result + '/100';
    } else {
        result += btnValue;
    }

    display.value = result;
};

arr.forEach(el => {
    const btn = document.createElement('button');
    btn.innerHTML = el;
    btnsWrapper.append(btn);
    btn.addEventListener('click', getNum);
});

const btnEvent = document.querySelector('#btn');
btnEvent.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});
