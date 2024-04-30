const itemList = document.getElementById("newList");
let children = Array.from(itemList.children); // Initialize children array

const decreaseBtn = document.getElementById("decrease");
decreaseBtn.addEventListener('click', setIcon);
const increaseBtn = document.getElementById("increase");
increaseBtn.addEventListener('click', setIcon);

const correctCup = document.getElementById("list1");
correctCup.addEventListener("click", changeVolume);
const cup2 = document.getElementById("list2");
cup2.addEventListener("click", showAnswer);
const cup3 = document.getElementById("list3");
cup3.addEventListener("click", showAnswer);
const cup4 = document.getElementById("list4");
cup4.addEventListener("click", showAnswer);

const volumeNumber = document.getElementById("volume-num");
const volumeBar = document.getElementById("volume-bar");

let shuffleDone = false;

const instructionText = document.getElementById("instruction");

let volume = 50; 

// function to generate random number
function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function setIcon(){
    if(decreaseBtn.checked)
    {
        correctCup.textContent = "-";
    }
    if(increaseBtn.checked)
    {
        correctCup.textContent = "+";
    }
}

function callShuffle() {
  const numberOfRuns = 10; 
  const delayBetweenRuns = 660; // Delay in milliseconds (0.5 seconds)
  // Use a promise to coordinate the shuffling and displaying of the message
  const shufflingPromise = new Promise((resolve) => {
    function runFlipFuncSequentially(count) {
      if (count < numberOfRuns) {
        setTimeout(function () {
          shuffleList(() => {
            runFlipFuncSequentially(count + 1);
          });
        }, delayBetweenRuns);
      } else {
        // Resolve the promise when all shuffling iterations are complete
        resolve();
      }
    }

    runFlipFuncSequentially(0);
  });
}

function shuffleList(callback) {
  const itemList = document.getElementById("newList");
  let children = Array.from(itemList.children);
  const keys = {}; // Reset keys object for each click

  // Store item elements' id and boundingClientRect
  children.forEach((elm) => {
    keys[elm.id] = elm.getBoundingClientRect();
  });

  // Shuffle elements
  children = shuffleArray(Array.from(itemList.children));
  children.forEach((elm) => {
    itemList.appendChild(elm);
  });

  // Apply animations
  Array.from(itemList.children).forEach((elm) => {
    const first = keys[elm.id];
    const last = elm.getBoundingClientRect();

    const delta = {
      x: first.left - last.left,
      y: first.top - last.top
    };

    gsap.set(elm, { x: delta.x, y: delta.y }); // Set initial position

    gsap.fromTo(
      elm,
      {
        x: delta.x,
        y: delta.y
      },
      {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
        onComplete: function () {
          gsap.set(elm, { clearProps: "all" }); // Reset properties after animation completes
        }
      }
    );
  });

  // Execute the callback after shuffling
  if (callback && typeof callback === "function") {
    callback();
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const goBtn = document.getElementById("go")
goBtn.addEventListener("click", swapCups);

function swapCups(){
    correctCup.textContent = " ";
    instructionText.textContent = "Keep track of the cups!";
    shuffleList();
    setTimeout(() => shuffleList(), 900);
    setTimeout(() => shuffleList(), 1800);
    shuffleDone = true; 
    setTimeout(() => setInstruction(), 2700);
}

function setInstruction(){
    instructionText.textContent = "Click the cup with the icon."
}


function showAnswer(){
    let num = 0;
    if(shuffleDone)
    {
        if(decreaseBtn.checked && volume>0)
        {
            num = randomNum(volume+1, volumeBar.max);
        }
        else if(increaseBtn.checked && volume<100)
        {
            num = randomNum(0, volume-1);
        }
        instructionText.textContent = "Wrong cup! Volume has been set to " + num + ".";
        volume = num;
        volumeNumber.textContent = volume;
        volumeBar.value = volume;
        setIcon();
        shuffleDone = false;
    }
}

function changeVolume(){
    if(shuffleDone)
    {
        let num = randomNum(1, 10);
        setIcon();
        shuffleDone = false;

        if(decreaseBtn.checked && volume>0)
        {
            volume -= num;
            instructionText.textContent = "Volume decreased by " + num + "! Click GO to adjust the volume again."
        }
        else if(increaseBtn.checked && volume<100)
        {
            volume += num;
            instructionText.textContent = "Volume increased by " + num + "! Click GO to adjust the volume again."
        }
        volumeNumber.textContent = volume;
        volumeBar.value = volume;
    }
}
