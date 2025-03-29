// Quiz Questions
const questions = {
    1: {
      text: "Which of the following best describes how you find out about campus events?",
      answers: {
        A: { text: "I check my email constantly.", next: 2 },
        B: { text: "Posters and flyers catch my eye.", next: 3 },
        C: { text: "My friends keep me in the loop.", next: 4 }
      }
    },
    2: {
      text: "Which of the following best describes your motivation to go to an event?",
      answers: {
        A: { text: "I love them! They're the easiest way to keep track.", next: 6 },
        B: { text: "There are too many, and I forget to read them.", next: 4 }
      }
    },
    3: {
      text: "How often do you look at spam boards or flyers?",
      answers: {
        A: { text: "Every once in a while.", next: 6 },
        B: { text: "Rarely or never.", next: 5 }
      }
    },
    4: {
      text: "What would you do if you heard about a 9 PM cookie-decorating event?",
      answers: {
        A: { text: "I'd show up; cookies are worth it!", next: 6 },
        B: { text: "Nope, too late for me.", next: 5 }
      }
    },
    5: {
      text: "How do you feel about weekend events?",
      answers: {
        A: { text: "Perfect - weekends are free time!", next: "🍪" },
        B: { text: "No thanks, I'd rather rest.", next: "👻" }
      }
    },
    6: {
      text: "How many email bumps for the same event is too many?",
      answers: {
        A: { text: "One or two is enough.", next: "🧠" },
        B: { text: "Three or more - I’ll forget otherwise.", next: "🍪" }
      }
    },
    "🧠": {
      emoji: "🧠",
      description: "You're a brainiac! You prefer thoughtful decision-making and rely on careful planning to stay informed."
    },
    "🍪": {
      emoji: "🍪",
      description: "You're a foodie! Free food and fun gatherings are your top motivators for attending events."
    },
    "👻": {
      emoji: "👻",
      description: "You're a ghost! You tend to stay out of the loop, but that's okay—you value your personal space."
    }
  };
  
  function goToQuestion(answer, nextQuestionNumber) {
    if (typeof nextQuestionNumber === 'string') {
      showResult(nextQuestionNumber);
      return;
    }
  
    const questionText = document.getElementById('question-text');
    const answersContainer = document.querySelector('.answers');
  
    questionText.innerHTML = questions[nextQuestionNumber].text;
    answersContainer.innerHTML = '';
  
    const answers = questions[nextQuestionNumber].answers;
    for (const key in answers) {
      const answerButton = document.createElement('button');
      answerButton.textContent = `${key}. ${answers[key].text}`;
      answerButton.onclick = () => goToQuestion(key, answers[key].next);
      answersContainer.appendChild(answerButton);
    }
  }
  
  function showResult(resultKey) {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.querySelector('.answers');
    const resultContainer = document.getElementById('result-container');
    const resultEmoji = document.getElementById('result-emoji');
    const resultDescription = document.getElementById('result-description');
  
    questionContainer.classList.add('hidden');
    answersContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
  
    resultEmoji.textContent = questions[resultKey].emoji;
    resultDescription.textContent = questions[resultKey].description;
  }
  
  function retryQuiz() {
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.querySelector('.answers');
    const resultContainer = document.getElementById('result-container');
  
    questionContainer.classList.remove('hidden');
    answersContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
  
    goToQuestion(null, 1);
  }
  
  function shareResults() {
    html2canvas(document.querySelector('.bingo-board')).then(canvas => {
      const link = document.createElement('a');
      link.download = 'bingo-results.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }
  
  // Bingo Game Code
  const cells = document.querySelectorAll('.bingo-cell');
  const jsConfetti = new JSConfetti();
  const replayButton = document.querySelector('.button-container button:nth-child(1)');
  const shareButton = document.querySelector('.button-container button:nth-child(2)');
  let checkedCells = [];
  let gameFrozen = false;
  
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (!cell.classList.contains('checked') && !gameFrozen) {
        cell.classList.add('checked');
        checkedCells.push(cell);
        checkBingo();
      }
    });
  });
  
  function checkBingo() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (const combination of winningCombinations) {
      if (combination.every(index => cells[index].classList.contains('checked'))) {
        gameFrozen = true;
        jsConfetti.addConfetti({
          emojis: ['🎉'],
          confettiNumber: 1000
        }).then(() => {
          replayButton.classList.remove('hidden');
          shareButton.classList.remove('hidden');
        });
        break;
      }
    }
  }
  
  function resetBoard() {
    cells.forEach(cell => cell.classList.remove('checked'));
    checkedCells = [];
    replayButton.classList.add('hidden');
    shareButton.classList.add('hidden');
    gameFrozen = false;
  }

  // Select all bingo cells
const bingoCells = document.querySelectorAll('.bingo-cell');
    
        // Add click event listener to each cell
        bingoCells.forEach(cell => {
          cell.addEventListener('click', () => {
            cell.classList.toggle('checked'); // Toggle the checked state
          });
        });

bingoCells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('checked'); // Toggle the checked state

    // Check if a row, column, or diagonal is fully checked
    if (checkBingo()) {
      console.log('Bingo achieved!');
      // Trigger confetti or any win logic here
      const confetti = new JSConfetti();
      confetti.addConfetti();

      setTimeout(() => {
        alert('Congratulations! You got a Bingo 🎉');
        // Optionally call any existing quiz/replay functions
      }, 500);
    }
  });
});

// Function to check rows, columns, and diagonals for Bingo
function checkBingo() {
  const rows = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ];
  
  const cols = [
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  const diagonals = [
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Helper function to check if all cells in an array are checked
  const isBingoLine = line => line.every(index => bingoCells[index].classList.contains('checked'));

  // Check rows, columns, and diagonals
  return rows.concat(cols, diagonals).some(line => isBingoLine(line));
}

  