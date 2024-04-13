const quoteBtn = document.querySelector('#js-new-quote');
quoteBtn.addEventListener('click', quoteByCategory);

let answer = " ";
const answerText = document.querySelector("#js-answer-text");
const ansBtn = document.querySelector('#js-tweet');
ansBtn.addEventListener('click', getAnswer);

const endpoint = "https://api.quotable.io/random";

const tags = "https://api.quotable.io/tags";
let categories = [];

// Function to fetch API data and put it into the array
async function fetchData() {
  try {
    // Make an API request
    const response = await fetch('https://api.quotable.io/tags');
   
    const data = await response.json();
    data.forEach(item => {
        categories.push(item);
    });
    console.log(categories);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  console.log("categories length in function: " + categories.length);
  setCategories(categories);
}
fetchData();

function setCategories(array){
    let dropdown = document.getElementById("category");
    for(let i=0; i<array.length; i++)
    {
        // console.log("category to add: " + array[i].name);
        if(array[i].quoteCount > 50)
        {
            let option = document.createElement("option");
            option.text = array[i].name;
            option.value = array[i].name;
            dropdown.appendChild(option);  
        }
    }
}

async function getQuote(){
    try {
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();
        displayQuote(json['content']);
        
        // console.log(json['author']);
        answer = json['author'];
        answerText.textContent = " ";

        return json;
    } catch (err){
        console.log(err);
        alert("Failed to catch new quote.");
    }
}
getQuote();

const selectedCategory = document.getElementById("category");
async function quoteByCategory() {
    let selectedText = selectedCategory.options[selectedCategory.selectedIndex].text;
    console.log("selected: " + selectedText);
    let randQuote = await getQuote();
    console.log("quote: ", randQuote);

    //while loop to set quote according to category
    while(!randQuote['tags'].includes(selectedText) && selectedText !== "None"){
        randQuote = await getQuote();
        console.log("new quote: ", randQuote);
    }

  }

function displayQuote(quote){
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function getAnswer(){
    console.log("answer clicked");
    answerText.textContent = "- "+answer;
}