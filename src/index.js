module.exports = function multiply(first, second) {
  var sumArguments = [];
  var firstNumber = first.split('').reverse();
  var secondNumber = second.split('').reverse();

  // Calculate arguments for sum - multiply bit digits
  sumArguments =  secondNumber.map( function(secondNumberDigit, index) { 
    var result = [];
    var remainderMultiply = 0;
    firstNumber.forEach( function(firstNumberDigit) {
      var multiplyDigits = secondNumberDigit * firstNumberDigit + remainderMultiply;
      remainderMultiply = Math.floor(multiplyDigits / 10);
      result.push(multiplyDigits % 10);
    });
    if (remainderMultiply) return result.join('').concat(remainderMultiply.toString()); // add remainder
    else return result.join('');
  });

   // Add zeros for arguments to maintain bit depth 
  sumArguments = sumArguments.map( function(item, index) {
    if (!index) return item;
    return (new Array(index).fill(0)).join('').concat(item);
  });

   // Max count of digits in arguments
  var maxDigitCount = sumArguments[sumArguments.length - 1].length - 1;
  var multiplyResultString = [];

  // Sum of arguments (sum bit digits)
  var remainderSum = 0;
  for (var i = 0; i <= maxDigitCount; i++) { 
    var sumResult = 0;
    for (var j = 0; j < sumArguments.length; j++) {
      sumResult += (i < sumArguments[j].length) ? +sumArguments[j].charAt(i) : 0;
    }
    sumResult += remainderSum;
    remainderSum = Math.floor(sumResult / 10);
    multiplyResultString.push(sumResult % 10);
  }
  if (remainderSum) multiplyResultString.push(remainderSum); // add remainder

  return multiplyResultString.reverse().join('');
}
