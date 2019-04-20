// variables to check valid operations.
var exp = '', number, decimal, equal, operator = true;

var textview = document.forms['Calculator']['output'];

var prev_history = [];  // array storing history of calculator.


// insert num in the text field
function insertNum(num) {
	if (equal) {	// checks if last operation was a equalTo operation
		exp = num;
		textview.value = exp;
		number = true;
		equal = false;
	}
	else {
		exp = textview.value + num;   // append the field with new num
		textview.value = exp;
		number = true;
	}
	if (operator) decimal = false;
}


// insert op in the field
// overwrite a operator if present
function insertOp(op) {
	textview.value = exp + op;
	operator = true;
	equal = false;
}


// insert decimal point in the field
// checks if a number is present or not
function insertDec() {
	if (number && !decimal) {
		textview.value = exp + '.';	
		operator = false;
	}
}


// function evaluates the expression using "eval" function
// append in history if result is different
function equalTo() {
	if (exp){

		var result = eval(exp);

		if (result != exp){
			prev_history.push({result: result, exp: exp});   // append in history
			var box_history = document.getElementById('calc-history-box');
			box_history.innerHTML = "";
			for(var i = prev_history.length - 1; i >= 0; i--) {
      			box_history.innerHTML += "<p style='color: #FFFFFF; ' id='eq" + i + "'>" +
      			prev_history[i].exp + "=" + prev_history[i].result + "</p>";
    		}
		}

		exp = result;
		textview.value = exp;
		equal = true;
		decimal = true;
		number = false;
	}
}


// clear the entire text field 
function clean() {
	exp = '';
	textview.value = exp;
	decimal = false;
}


// delete last operator or number
function del() {
	exp = textview.value;
	exp = exp.substring(0, exp.length -1);
	textview.value = exp;
}