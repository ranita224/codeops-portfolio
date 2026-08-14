const form = document.querySelector('#myForm');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneInput = document.querySelector('#phone');
const msg = document.querySelector('#errorMessage');
const countElement = document.querySelector('#signupCount');

const ethiopianPhonePattern = /^(?:\+2519|09)\d{8}$/;

function validateForm(name, email, phone) {
  if (!name) return 'Name is required.';
  if (name.length < 2) return 'Name must be at least 2 characters long.';
  if (!email) return 'Email is required.';
  if (!phone) return 'Phone number is required.';
  if (!ethiopianPhonePattern.test(phone))
    return 'Please enter a valid Ethiopian phone number.';
  return null;
}
function showErrorMessage(message) {
  msg.style.color = 'red';
  msg.textContent = message;
  msg.style.display = 'block';
}
function saveToLocalStorage(entry) {
  let data = JSON.parse(localStorage.getItem('signups')) || [];
  data.push(entry);
  localStorage.setItem('signups', JSON.stringify(data));
}
function updateSignupCount() {
  const data = JSON.parse(localStorage.getItem('signups')) || [];
  if (countElement) {
    countElement.textContent = `Total signups: ${data.length}`;
  }
}
form.addEventListener('submit', function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  const errorMessage = validateForm(name, email, phone);
  if (errorMessage) {
    showErrorMessage(errorMessage);
    return;
  }
  saveToLocalStorage({ name, email, phone });
  form.reset();
  msg.style.color = 'green';
  msg.textContent = 'Signup successful!';
  updateSignupCount();
});
window.addEventListener('load', () => {
  updateSignupCount();
});
