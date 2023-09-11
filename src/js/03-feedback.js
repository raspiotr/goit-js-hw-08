import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

function loadContentFromLocalStorage() {
  const initialState = JSON.parse(
    localStorage.getItem('feedback-form-state')
  ) || {
    email: '',
    message: '',
  };
  emailInput.value = initialState.email;
  messageInput.value = initialState.message;
}

document.addEventListener('DOMContentLoaded', loadContentFromLocalStorage);

const saveDataToLocalStorage = throttle(() => {
  const actualState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(actualState));
}, 500);

emailInput.addEventListener('input', saveDataToLocalStorage);
messageInput.addEventListener('input', saveDataToLocalStorage);

function submitData(event) {
  event.preventDefault();
  const formDataToSend = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
  console.log(formDataToSend);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
}

form.addEventListener('submit', submitData);
