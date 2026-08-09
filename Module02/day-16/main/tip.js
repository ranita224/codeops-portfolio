const bill = Number(prompt("Enter bill amount in ETB:"));
const partySize = Number(prompt("Enter number of people:"));
let tipRate;

if (bill > 300) {
  tipRate = 0.10; 
} else {
  tipRate = 0.05; 
}

const tipAmount = bill * tipRate;
const total = bill + tipAmount;
const perPerson = total / partySize;
const service = "TeleBirr"; 
let serviceFee;

switch (service) {
  case "TeleBirr":
    serviceFee = 5; 
    break;
  case "CBE Birr":
    serviceFee = 3;
    break;
  default:
    serviceFee = 0;
}
const finalTotal = total + serviceFee;

console.log(`Bill Amount: ${bill.toFixed(2)} ETB`);
console.log(`Tip Amount: ${tipAmount.toFixed(2)} ETB`);
console.log(`Total Amount (including tip): ${total.toFixed(2)} ETB`); 
console.log(`Each person pays: ${perPerson.toFixed(2)} ETB`);

