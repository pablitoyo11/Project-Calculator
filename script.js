const display = document.querySelector('.calculator>.display>.displayContent');
const number = document.querySelectorAll('.calculator>.buttons>.number');
const operator = document.querySelectorAll('.calculator>.buttons>.operator');
let result=0.0;

number.forEach(number=> number.addEventListener("click", numberSelected));
operator.forEach(operator=> operator.addEventListener("click", operatorSelected));

function operatorSelected (event){
    console.log(this.id);
}

function numberSelected (event){
    if (this.id == "." && (display.innerHTML).includes(".")) {
        alert("can't add two commas in the same number");
        return;
    }
    display.innerText === "_" ? display.innerHTML=this.id : display.innerHTML=display.innerText+this.id
    /* //Replaced if statement with ternary operator
    if (display.innerText == "_")
    {display.innerHTML=this.id}
    else {display.innerHTML=display.innerText+this.id}
    */
}