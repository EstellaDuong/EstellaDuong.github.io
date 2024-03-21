// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

const storyText = "It was 100 fahrenheit outside, much too hot for :insertx:'s comfort. Bob gave them a magic stone, so :insertx: wished to be transported to an icy tundra. However, they ended up at :inserty: instead. While trying to go back, they :insertz:. Bob saw everything through their magic orb. Riddled with guilt, Bob sent their 9,000 pound platypus-bear to rescue :insertx:.";
const insertX = ["Willy Wonka", "Choi Soobin", "The Grinch", "Jenna Ortega"];
const insertY = ["an outhouse on Mars", "the Grand Canyon", "a Taylor Swift concert", "some calculus class"];
const insertZ = ["accidentally summoned the wrath of 1,000 dragons", "turned to dust", "rolled away down a hill", "fell into a chasm of darkness", "stopped for a snack and ate moldy cheese"];

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}


// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {
    let newStory = storyText;
    const itemX = randomValueFromArray(insertX);
    const itemY = randomValueFromArray(insertY);
    const itemZ = randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(":insertx:", itemX);
    newStory = newStory.replaceAll(":inserty:", itemY);
    newStory = newStory.replaceAll(":insertz:", itemZ);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replaceAll("Bob", name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300/14) + ' stone';
    const temperature =  Math.round((94-32)*(5/9)) + ' celsius';

    newStory = newStory.replaceAll("9,000 pound", weight);
    newStory = newStory.replaceAll("100 fahrenheit", temperature);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}