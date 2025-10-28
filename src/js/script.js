let order = [];
let clickedOrder = [];
let score = 0;

const green = document.querySelector(".green");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const blue = document.querySelector(".blue");
const scoreElement = document.querySelector(".score");
const restartBtn = document.querySelector(".restart");

const sounds = [
  new Audio("sounds/green.mp3"),
  new Audio("sounds/red.mp3"),
  new Audio("sounds/yellow.mp3"),
  new Audio("sounds/blue.mp3"),
];

// Cria ordem aleatória de cores
let shuffleOrder = () => {
  const colorOrder = Math.floor(Math.random() * 4);
  order.push(colorOrder);
  clickedOrder = [];
  lightSequence();
};

// Anima a sequência completa
let lightSequence = async () => {
  for (let i = 0; i < order.length; i++) {
    await lightColor(createColorElement(order[i]), i);
  }
};

// Acende a cor
let lightColor = (element, index) => {
  return new Promise((resolve) => {
    const time = Math.max(250, 500 - score * 20);
    setTimeout(() => {
      element.classList.add("selected");
      sounds[Number(element.dataset.color)].play();
      setTimeout(() => {
        element.classList.remove("selected");
        resolve();
      }, time);
    }, index * time + 300);
  });
};

// Checa se os cliques estão corretos
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      return gameOver();
    }
  }
  if (clickedOrder.length == order.length) {
    score++;
    updateScore();
    setTimeout(nextLevel, 800);
  }
};

// Clique do usuário
let click = (color) => {
  clickedOrder.push(color);
  const element = createColorElement(color);
  element.classList.add("selected");
  sounds[color].play();

  setTimeout(() => {
    element.classList.remove("selected");
    checkOrder();
  }, 250);
};

// Retorna elemento pela cor
let createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
};

// Próximo nível
let nextLevel = () => {
  shuffleOrder();
};

// Game over
let gameOver = () => {
  alert(`Pontuação: ${score}\nVocê perdeu!`);
  order = [];
  clickedOrder = [];
  score = 0;
  updateScore();
};

// Atualiza pontuação na tela
let updateScore = () => {
  scoreElement.textContent = `Pontuação: ${score}`;
};

// Eventos de clique
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
restartBtn.onclick = () => {
  order = [];
  clickedOrder = [];
  score = 0;
  updateScore();
  nextLevel();
};

// Inicia o jogo
updateScore();
nextLevel();
