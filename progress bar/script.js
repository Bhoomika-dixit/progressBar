document.addEventListener('DOMContentLoaded', () => {
  const initialNumberInput = document.getElementById('initialNumber');
  const setNumberBtn = document.getElementById('setNumberBtn');
  const subtractBtn = document.getElementById('subtractBtn');
  const addBtn = document.getElementById('addBtn');
  const numberDisplay = document.getElementById('numberDisplay');
  const progressBar = document.getElementById('progressBar');
  const undoBtn = document.getElementById('undoBtn');
  const redoBtn = document.getElementById('redoBtn');

  let number = 0;
  let history = [];
  let future = [];

  function updateDisplay() {
      numberDisplay.textContent = number;
      progressBar.style.width = (number / 150) * 100 + '%';
  }

  function addToHistory() {
      history.push(number);
      if (history.length > 20) history.shift(); 
      future = [];
  }

  setNumberBtn.addEventListener('click', () => {
      let userNumber = parseInt(initialNumberInput.value);
      if (isNaN(userNumber) || userNumber < 0 || userNumber > 150) {
          alert('Please enter a valid number between 0 and 150.');
          return;
      }
      number = userNumber;
      addToHistory();
      updateDisplay();
  });

  subtractBtn.addEventListener('click', () => {
      if (number > 0) {
          addToHistory();
          number--;
          updateDisplay();
      }
  });

  addBtn.addEventListener('click', () => {
      if (number < 150) {
          addToHistory();
          number++;
          updateDisplay();
      }
  });

  undoBtn.addEventListener('click', () => {
      if (history.length > 0) {
          future.push(number);
          number = history.pop();
          updateDisplay();
      }
  });

  redoBtn.addEventListener('click', () => {
      if (future.length > 0) {
          history.push(number);
          number = future.pop();
          updateDisplay();
      }
  });

  updateDisplay();
});
