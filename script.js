const display = document.querySelector('.calculator>.display>.displayContent');
const number = document.querySelectorAll('.calculator>.buttons>.number');
const operator = document.querySelectorAll('.calculator>.buttons>.operator');

let lastresult=0;
let currentnumber=0;
let lastoperation="+";
let currentoperation="";

number.forEach(number=> number.addEventListener("click", numberSelected));
operator.forEach(operator=> operator.addEventListener("click", operatorSelected));

// keyboard imput
document.addEventListener('keyup', (e) => {
    ////check if number or operator was pressed and simulate a click on the event
    if (e.key>0 && e.key<10){
        number[e.key-1].click();
    }
    else{
        switch (e.key){
            case "0":{
                number[9].click();
                break;
            }
            case ".":{
                number[10].click();
                break;
            }
            case "+":{
                operator[1].click();
                break;
            }
            case "-":{
                operator[2].click(); 
                break;
            }
            case "*":{
                operator[3].click(); 
                break;
            }
            case "/":{
                operator[4].click(); 
                break;
            }
            case "Enter":{
                operator[5].click(); 
                break;
            }
            case "Backspace":{
                operator[6].click();
                break;
            }
        }
    }
});

function numberSelected (){
    // Highlight the last number pressed
    for (let index = 0; index < number.length; index++) {
        number[index].classList.remove("active");
    }
    this.classList.add("active");
    // Variables Cleanup
    if (lastoperation === '=') {
        lastresult = 0
        lastoperation="+";
    }
    // avoid entering decimal key more than once
    if (!(display.innerText.includes("=") && display.innerText.includes(".") && display.innerText.includes(lastresult))) {
        if (this.id == "." && display.innerText.includes(".")) {
            alert("can't add two commas in the same number");
            return;
        }
    }
    // add "0" before decimals when user enters "." before any number shows "0."
    if (this.id == "." && display.innerText == "_") {
        display.innerHTML=0+this.id;
        return;
    }
    // adding numbers to the display and cleaning the "_" starting point, last results "=" and "Clear"
    if (display.innerText == "_" || display.innerText.includes("=") || display.innerText.includes("Clear"))
        {display.innerHTML=this.id}
    else {display.innerHTML=display.innerText+this.id}
}


function operatorSelected (){
    // block other operations, and tell the user an operator is active
    if (this.id!="="){
        for (let index = 0; index < operator.length; index++) {
            if (operator[index].classList.contains("active") && operator[index]!==this){
                alert("an operator is active");
                return;
            }
        }
    }
    // turn off operator if previously selected
    for (let index = 0; index < operator.length; index++) {
        if (operator[index].classList.contains("active") && operator[index]==this){
            this.classList.remove("active");
            lastoperation="+";
            currentoperation="";
            return;
        }
    }
    if (lastoperation=="") {
        this.classList.add("active");
        lastoperation=currentoperation;
        return;
    }


    // check if display input is a number and keep it, then update display
    if (this.id=="Delete"){
        display.innerText=display.innerText.slice(0,-1);
    }
    // saving display number to currentnumber if it's a number
    else{
        if (this.id!=display.innerText && !isNaN(display.innerText)) {
            currentnumber=Number(display.innerText);
        } 
        if (this.id=="Clear"){
            display.innerHTML = "Clear";
            lastresult=0;
            currentnumber=0;
            lastoperation="+";
            currentoperation="";
        }
        else{
            updateDisplay(this.id);
        }
    }
    // Clean style of "active button / last button" and highlight las operator pressed until other operator is pressed
    for (let index = 0; index < operator.length; index++) {
        operator[index].classList.remove("active");
    }    
    for (let index = 0; index < number.length; index++) {
        number[index].classList.remove("active");
    }
    // avoid adding active state for "delete" "=" and "clear" buttons
    if (this.id!="Delete" && this.id!="=" && this.id!="Clear"){
        this.classList.add("active");
    }
}


function updateDisplay(currentoperation){
        if (!isNaN(lastresult) && !isNaN(currentnumber)) {   
            // Do the Math with Operate function, update variables, and update display 
            lastresult = operate(lastoperation,lastresult,currentoperation,currentnumber);
            lastoperation = currentoperation;
            currentnumber = 0;
            currentoperation ="";
            display.innerText=("="+lastresult);
        }
}


function operate (lastoperationlocal,lastresultlocal,currentoperationlocal,currentnumberlocal){
    if (lastoperationlocal=="=" && currentoperationlocal=="=") {
        //when pressing multiple "=" return last known result
        return lastresultlocal;
    }
    switch (lastoperationlocal){
        case "+":{
            return (lastresultlocal+currentnumberlocal);
        }
        case "-":{
            return (lastresultlocal-currentnumberlocal);
        }
        case "*":{
            return (lastresultlocal*currentnumberlocal);
        }
        case "/":{
            // avoid division by 0 and return lastresultlocal to display
            if (currentnumberlocal==0){
                alert("can't divide by 0");
                return lastresultlocal;
            }
            else{
                return (lastresultlocal/currentnumberlocal);
            }
        }
        case "=":{
            // when pressing "=" check last operator pressed, and do the correspoding operation
            lastresultlocal=operate(lastoperationlocal,lastresultlocal,lastoperationlocal,currentnumberlocal);
            return lastresultlocal;
        }
    }

}
