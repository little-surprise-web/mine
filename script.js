const preIntro = document.querySelector(".pre-intro");
const preIntroBtn = document.querySelector(".js-pre-intro-btn");
const bgMusic = document.getElementById("bg-music");

const introContainer = document.querySelector(".intro-container");
const introBtn = document.querySelector(".js-intro-btn");

const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

// PRE-INTRO "HI" BUTTON — unlock audio
preIntroBtn.addEventListener("click", () => {
  // start music quietly
  bgMusic.volume = 0;
  bgMusic.play().catch(() => {});

  // smooth fade-in
  let vol = 0;
  const fadeIn = setInterval(() => {
    vol += 0.01;
    if (vol >= 0.15) {
      vol = 0.15;
      clearInterval(fadeIn);
    }
    bgMusic.volume = vol;
  }, 200);

  // move to intro screen
  preIntro.style.display = "none";
  introContainer.style.display = "inherit";
});

// INTRO OK BUTTON
introBtn.addEventListener("click", () => {
  // hide intro
  introContainer.style.display = "none";

  // show heart loader
  heartLoader.style.display = "inherit";

  // after loading, show question screen
  setTimeout(() => {
    heartLoader.style.display = "none";
    questionContainer.style.display = "inherit";
  }, 3000);
});

let noClickCount = 0;

noBtn.addEventListener("click", () => {
  noClickCount++;

  const pleaseText = document.getElementById("please-text");
 if (pleaseText) {
  pleaseText.style.display = "block";
  pleaseText.style.opacity = 1;
  
  if (pleaseText) {
  if (noClickCount === 1) {
    pleaseText.textContent = "please 🥺";
  } else if (noClickCount === 2) {
    pleaseText.textContent = "I'm begging you 😭";
  } else if (noClickCount === 3) {
    pleaseText.textContent = "I said please 😤";
  } else if (noClickCount === 4) {
    pleaseText.textContent = "come onnn 😩";
  }
}

}


  // shrink gradually
  const scale = Math.max(0.2, 1 - noClickCount * 0.15);
  noBtn.style.transform = `scale(${scale})`;

  // 🔒 movement boundary = question container
  const containerRect = questionContainer.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 10;

 // 🎯 limit movement area (smaller panic zone)
const moveAreaWidth = containerRect.width * 0.4;   // 40% width
const moveAreaHeight = containerRect.height * 0.25; // 25% height

const centerX = containerRect.width / 2;
const centerY = containerRect.height / 2;

const randomX =
  centerX - moveAreaWidth / 2 +
  Math.random() * moveAreaWidth;

const randomY =
  centerY - moveAreaHeight / 2 +
  Math.random() * moveAreaHeight;

noBtn.style.left = randomX + "px";
noBtn.style.top = randomY + "px";

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";

  // final disappearance
  if (scale <= 0.25) {
    noBtn.style.display = "none";
    if (pleaseText) {
      pleaseText.textContent = "What will you do now🤭?Just say yes,my girl!😏";
    }
  }
});


// yes button functionality

yesBtn.addEventListener("click", () => {
  // hide question screen
  questionContainer.style.display = "none";

  // show heart loader
  heartLoader.style.display = "inherit";

  setTimeout(() => {
    // hide loader, show result
    heartLoader.style.display = "none";
    resultContainer.style.display = "inherit";

    // play video safely
    gifResult.muted = true;
    gifResult.play();

    // text elements
    const line1 = document.getElementById("result-text");
    const line2 = document.getElementById("valentine-text");
    const emojis = document.getElementById("emoji-text");

    // show first line
    line1.classList.add("show");

    // show second line
    setTimeout(() => {
      line2.classList.add("show");
    }, 600);

    // show emojis last
    setTimeout(() => {
      emojis.classList.add("show");
      popEmojis();
    }, 1200);

  }, 3000);
});
