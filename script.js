const display = document.querySelector('.calculator>.display>.displayContent');
const number = document.querySelectorAll('.calculator>.buttons>.number');
const operator = document.querySelectorAll('.calculator>.buttons>.operator');

let lastresult=0;
let currentnumber=0;
let lastoperation="+";
let currentoperation="";

number.forEach(number=> number.addEventListener("click", numberSelected));
operator.forEach(operator=> operator.addEventListener("click", operatorSelected));

function numberSelected (){

    if (lastoperation === '=') {
        // Cleanup
        lastresult = 0
        lastoperation="+";
    
}
  // if (display.innerText.includes("=") && display.innerText.includes(".") && display.innerText.includes(lastresult)) {
  // }
  // else {
  //     if (this.id == "." && display.innerText.includes(".")) {
  //         alert("can't add two commas in the same number");
  //         return;
  //     }
  // }
    if (!(display.innerText.includes("=") && display.innerText.includes(".") && display.innerText.includes(lastresult))) {
        if (this.id == "." && display.innerText.includes(".")) {
            alert("can't add two commas in the same number");
            return;
        }
    }
    if (this.id == "." && display.innerText == "_") {
        display.innerHTML=0+this.id;
        return;
    }
/*  display.innerText == "_" ? display.innerHTML=this.id : 
        display.innerText.includes("=") ? display.innerHTML=this.id :
            display.innerHTML=display.innerText+this.id;
*///Replaced "if" statement with ternary operator
    
    if (display.innerText == "_" || display.innerText.includes("="))
        {display.innerHTML=this.id}
    else {display.innerHTML=display.innerText+this.id}
    
    
}
function operatorSelected (event){
    console.log(this.id);
    console.log("inner",display.innerText );
    console.log("(antes) lastresult", lastresult, "current",currentnumber," y ", lastoperation," y ", currentoperation);
    if (this.id!=display.innerText && !isNaN(display.innerText)) {
        currentnumber=Number(display.innerText);
    //    console.log("currentnumber despues",currentnumber);
    //    console.log("lastresult despues",lastresult);
    }
    display.innerHTML = (this.id);


    if (this.id!=="Clear"){
        updateDisplay(this.id);
    }
    else{
        display.innerHTML = "Clear";
        lastresult=0;
        currentnumber=0;
        lastoperation="+";
        currentoperation="";
    }
}

function updateDisplay(currentoperation){
    if (!isNaN(lastresult) && !isNaN(currentnumber)) {
        console.log("(despues)",lastresult," y ", currentnumber );
        console.log("lastoperation",lastoperation," y ", "currentoperation",currentoperation);
        
        const operateResult = operate(lastoperation,lastresult,currentoperation,currentnumber);
        
        lastresult = operateResult
        lastoperation = currentoperation;
       currentnumber = 0;
        currentoperation ="";
        display.innerText=("="+lastresult);
        console.log("final",lastresult," y ", currentnumber );
        console.log("final lastoperation",lastoperation," y ", "currentoperation",currentoperation);
 
    }
}

function operate (lastoperationlocal,lastresultlocal,currentoperationlocal,currentnumberlocal){
    if (lastoperationlocal=="=" && currentoperationlocal=="=") {
        return lastresultlocal;
    }
    if (lastoperationlocal=="=" && !currentoperationlocal=="="){
        console.log("asdcaca");
        return 0;
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
            return (lastresultlocal/currentnumberlocal);
        }
        case "=":{
            console.log("==== lastoperation",lastoperationlocal," y ", "currentoperation",currentoperationlocal);
            console.log("==== lastresult",lastresultlocal," y currentnumber", currentnumberlocal );
            lastresultlocal=operate(lastoperationlocal,lastresultlocal,lastoperationlocal,currentnumberlocal);
        //    console.log("entonces=",lastresultlocal);
        //    console.log(lastresult);
        //    console.log("y a==== lastoperation",lastoperationlocal," y ", "currentoperation",currentoperationlocal);
        //    console.log("y a==== lastresult",lastresultlocal," y currentnumber", currentnumberlocal );
            return lastresultlocal;

        }
    }

}
