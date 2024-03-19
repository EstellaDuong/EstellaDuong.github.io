const x = 'hi';
console.log(x);

const button = document.querySelector('#button1');
button.addEventListener('click', runFunction);

const button2 = document.querySelector('#button2');
button2.addEventListener('click', changeText);

const heading = document.querySelector("h1");

const button3 = document.querySelector(".recolor");
button3.addEventListener('click', recolorFunction);

function recolorFunction() {
    button.style.color = 'rgb(0, 74, 74)'; 
    button.style.background = 'rgb(119, 138, 245)'; 
    button2.style.color = 'rgb(119, 138, 245)'; 
    button2.style.background = 'rgb(0, 74, 74)'; 
}

function changeText(){
    // alert('button successfully clicked!');
    const head = prompt("tell me a secret");
    heading.textContent = `${head}`;
    heading.style.color = 'rgb(255, 0, 51)';
}

function runFunction() {
    // console.log("test");
    const name = prompt("Please enter a name");
    button.textContent = `Player 1: ${name}`;
    
}