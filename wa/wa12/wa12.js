const quoteBtn = document.querySelector('#js-new-quote');
quoteBtn.addEventListener('click', quoteByCategory);

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
        let option = document.createElement("option");
        option.text = array[i].name;
        option.value = array[i].name;;
        dropdown.appendChild(option);  
    }
}

const selectedCategory = document.getElementById("category");
let categoryMatch = false;
async function getQuote(){
    try {
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();

        let selectedText = selectedCategory.options[selectedCategory.selectedIndex].text;
        console.log("category: " + selectedText);

        if(json['tags'][0] === selectedText || selectedText === "None")
        {
            categoryMatch = true;
        }
        console.log("quote: " + json['content']);
        console.log("tag: " + json['tags'][0]);
        displayQuote(json['content']);
        
        // console.log(json['author']);
        // answer = json['author'];
        // answerText.textContent = " ";
    } catch (err){
        console.log(err);
        alert("Failed to catch new quote.");
    }
}
getQuote();

function quoteByCategory(){
    while(!categoryMatch)
    {
        getQuote();
    }
    categoryMatch = false;
}

function displayQuote(quote){
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}









// const ansBtn = document.querySelector('#js-tweet');
// ansBtn.addEventListener('click', getAnswer);

// const answerText = document.querySelector("#js-answer-text");

// let answer = " ";

// async function getQuote(){
//     console.log("new quote clicked");
//     try {
//         const response = await fetch(endpoint);
//         if(!response.ok){
//             throw Error(response.statusText);
//         }

//         const json = await response.json();
//         console.log(json['content']);
//         displayQuote(json['content']);
        
//         console.log(json['author']);
//         answer = json['author'];
//         answerText.textContent = " ";
//     } catch (err){
//         console.log(err);
//         alert("Failed to catch new quote.");
//     }
// }



// function getAnswer(){
//     console.log("answer clicked");
//     answerText.textContent = answer;
// }

// getQuote();