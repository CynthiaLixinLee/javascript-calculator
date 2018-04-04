$(document).ready(function(){
  
  var entry = "",
      text = "",
      operator = "",
      calculation = [],
      reset = "",
      $display = $("#display"),
      $log = $("#log");
  
  function displayText(){
    if (text.length <=12){text += entry}
    $display.html(text);
  }
  
  function displayLog(x){
    calculation += x;
    $display.html("");
    text = "";
    $log.html(calculation);
  }
  
  function handleNumber(){
    if (operator === ""){
      displayText(entry);
    } else {
      displayLog(operator); 
      operator = "";  
      displayText(entry);
    }
  }
  
  function handleOperator(){
    if (operator === "") {
      operator = entry;
      displayLog(text);
      $display.html(entry);
    }
  }
  
  function allClear(){
    $display.html("");
    text = "";
    operator = "";
    calculation = [];
    entry = "";
    $log.html("");
  }
  
  function deleteEntry(){
    text = text.slice(0, -1);
    $display.html(text);
  }
  
  function equals(){
    calculation += text;
    // Clean up text to reduce errors
    if (isNaN(calculation.charAt(-1))) {calculation.slice(0, -1)}
    let first = calculation.charAt(0);
    if (first === '*' || first === '/') {calculation.slice(0, 1)}
    // Use eval* to calculate answer
    text = parseFloat(eval(calculation).toFixed(2));
    reset = true; // Boolean var to ensure it is reset
    $log.html(calculation);
    $display.html(text);
  }

  // CLICK EVENTS
  $(".calc-buttons").click(function(){
    if (reset === true) {
      allClear(); 
      reset = false
    }
    entry = $(this).attr("value");
    // What to do with entry
    if (isNaN(entry)){
      if (entry === '/' || entry === '*' || entry === '-' || entry === '+'){
        handleOperator(entry)
      }
      else if (entry === 'ac') {allClear()}
      else if (entry === 'del') {deleteEntry(entry)}
      else if (entry === '=') {equals()}
      else if (entry === '.') {if (operator ==="") {displayText(entry)}}
    } else {
      handleNumber(entry);
    }
  })
  

  // KEYBOARD EVENTS
  window.onkeyup = function(e) {
  e.preventDefault();
  if (reset === true) {allClear(); reset = false}
    
  var key = e.keyCode ? e.keyCode : e.which;
  if (key >= 96 && key <= 105) {
      entry = (key - 96); handleNumber(entry);
  } else if (key >= 48 && key <= 57) {
      entry = (key - 48); handleNumber(entry);
  } else if (key === 107 || (event.shiftKey == true && key == 187)) {
      entry = '+'; handleOperator(entry);
  } else if (key === 109 || key === 189) {
      entry = '-'; handleOperator(entry);
  } else if (key === 106 || (event.shiftKey == true && key == 56)) {
      entry = '*'; handleOperator(entry);
  } else if (key === 111 || key === 191) {
      entry = '/'; handleOperator(entry);
  } else if (key === 110 || key === 190) {
      entry = '.'; if (operator ==="") {displayText(entry)};
  } else if (key === 8) {
      entry = 'del'; deleteEntry(entry);
  } else if (key === 187 || key === 13) {
      entry = '='; equals(entry);
  }
 }
});

/* Using eval*/
//The use of eval has its caveats. Due to the low-risk nature of this project, I decided to utilise it. Some precautions have been placed to ensure that the input is as clean as possible.