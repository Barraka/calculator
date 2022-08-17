function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    let result=a*b;
    if(Number.isInteger(result))return result;
    return parseFloat(parseFloat(result).toPrecision(maxdigits-1));
}

function divide(a,b) {
    return parseFloat(parseFloat(a/b).toPrecision(maxdigits-1));
}

function operate(num1, op ,num2) {
    switch(op) {
        case 'plus':
            return add(num1,num2);
        case 'minus':
            return subtract(num1,num2);
        case 'times':
            return multiply(num1,num2);
        case 'divide':
            return divide(num1,num2);
        default:return 0;
    }
}
let operation = {}
operation.left="";
operation.operand=undefined;
operation.right="";
operation.hasFirst=false;
operation.result=0;


let display=document.querySelector('#display');

let divideb=document.querySelector("#divide");
let times=document.querySelector("#times");
let minus=document.querySelector("#minus");
let plus=document.querySelector("#plus");
let del=document.querySelector("#del");
let clear=document.querySelector("#clear");

let num7=document.querySelector("#num7");
let num8=document.querySelector("#num8");
let num9=document.querySelector("#num9");
let num4=document.querySelector("#num4");
let num5=document.querySelector("#num5");
let num6=document.querySelector("#num6");
let num1=document.querySelector("#num1");
let num2=document.querySelector("#num2");
let num3=document.querySelector("#num3");
let num0=document.querySelector("#num0");
let point=document.querySelector("#point");
let equal=document.querySelector("#equal");
let sign=document.querySelector("#sign");

divideb.addEventListener('click', ()=>{operand('divide')});
times.addEventListener('click', ()=>{operand('times')});
minus.addEventListener('click', ()=>{operand('minus')});
plus.addEventListener('click', ()=>{operand('plus')});
del.addEventListener('click', deldigit);
clear.addEventListener('click', clearScreen);
num7.addEventListener('click', ()=>{addDigit('7')});
num8.addEventListener('click', ()=>{addDigit('8')});
num9.addEventListener('click', ()=>{addDigit('9')});
num1.addEventListener('click', ()=>{addDigit('1')});
num2.addEventListener('click', ()=>{addDigit('2')});
num3.addEventListener('click', ()=>{addDigit('3')});
num4.addEventListener('click', ()=>{addDigit('4')});
num5.addEventListener('click', ()=>{addDigit('5')});
num6.addEventListener('click', ()=>{addDigit('6')});
num0.addEventListener('click', ()=>{addDigit('0')});
point.addEventListener('click', ()=>{addDigit('.')});
equal.addEventListener('click', ()=>{enter()});

display.textContent="0";
let maxdigits=9;

function reset() {
    operation.left="";
    operation.operand=undefined;
    operation.right="";
    operation.hasFirst=false;
    operation.result=0;
    display.textContent="0";
    sign.textContent="";
}

function operand(e) {
    switch (e) {
        case 'divide':
            if(operation.result && sign.textContent==="=") {
                let temp=display.textContent;
                reset();
                operation.left=temp;
            }
            else if(operation.right) {                
                enter();
                operation.left=String(operation.result);
                operation.right='';
                operation.result=0;
            }
            operation.hasFirst=true;
            operation.operand='divide';
            showDigits();
            break;
        case 'times':
            if(operation.result && sign.textContent==="=") {
                let temp=display.textContent;
                reset();
                operation.left=temp;
            }
            else if(operation.right) {
                enter();
                operation.left=String(operation.result);
                operation.right='';
                operation.result=0;
            }
            operation.hasFirst=true;
            operation.operand='times';
            showDigits();
            break;
        case 'minus':
            if(operation.result && sign.textContent==="=") {
                let temp=display.textContent;
                reset();
                operation.left=temp;
            }
            else if(operation.right) {
                enter();
                operation.left=String(operation.result);
                operation.right='';
                operation.result=0;
            }
            operation.hasFirst=true;
            operation.operand='minus';
            showDigits();
            break;
        case 'plus':
            if(operation.result && sign.textContent==="=") {
                let temp=display.textContent;
                reset();
                operation.left=temp;
            }
            else if(operation.right) {
                enter();
                operation.left=String(operation.result);
                operation.right='';
                operation.result=0;
            }
            operation.hasFirst=true;
            operation.operand='plus';
            showDigits();
            break;
    }
}

function clearScreen() {
    reset();
}

function addDigit(e) {
    if(!operation.hasFirst) {
        if(e==='.'){if(!operation.left.includes(".") && operation.left.length<maxdigits)operation.left+=".";}
        else if(operation.left.length<maxdigits)operation.left+=e;
    }
    else {
        if(e==='.'){
            if(operation.result) {
                reset();
                operation.left+=".";
            }
            else if(!operation.right.includes(".") && operation.right.length<maxdigits)operation.right+=".";
        }
        else if(operation.result) {
            reset();
            operation.left+=e;
        }
        else if(operation.right.length<maxdigits)operation.right+=e;
    }
    showDigits();
}

function enter(thisSign="=") {
    let left=Number(operation.left);
    let right=Number(operation.right);
    let operand=operation.operand;
    if(operation.right==='') {
        return;
    }
    let answer=operate(left,operand,right);
    if(String(answer).length>maxdigits || answer===Infinity){        
            reset();
            display.textContent='ERROR';
            return;
        }
    operation.result=answer;
    display.textContent=answer;
    sign.textContent=thisSign;
    
}
function deldigit() {
    if(!operation.hasFirst) {
        operation.left=operation.left.slice(0,-1);
    }

    else {
        operation.right=operation.right.slice(0,-1);
    }
    showDigits();
}

function showDigits() {
    if(!operation.hasFirst)display.textContent=operation.left;
    else if(operation.result) {
        display.textContent=operation.result;
    }
    else display.textContent=operation.right;
    if(!operation.operand!=='') {
        switch(operation.operand) {
            case 'plus':
                sign.textContent='+';
                break;
            case 'minus':
                sign.textContent='-';
                break;
            case 'times':
                sign.textContent='x';
                break;
            case 'divide':
                sign.textContent='÷';
        }
    }
}