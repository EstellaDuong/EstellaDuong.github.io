const quoteBtn = document.querySelector('#js-new-quote');
quoteBtn.addEventListener('click', getQuote);

const ansBtn = document.querySelector('#js-tweet');
ansBtn.addEventListener('click', getAnswer);

const answerText = document.querySelector("#js-answer-text");

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let answer = " ";

async function getQuote(){
    console.log("new quote clicked");
    try {
        const response = await fetch(endpoint);
        if(!response.ok){
            throw Error(response.statusText);
        }

        const json = await response.json();
        console.log(json['question']);
        displayQuote(json['question']);
        
        console.log(json['answer']);
        answer = json['answer'];
        answerText.textContent = " ";
    } catch (err){
        console.log(err);
        alert("Failed to catch new quote.");
    }
}

function displayQuote(quote){
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function getAnswer(){
    console.log("answer clicked");
    answerText.textContent = answer;
}

getQuote();  //displays a quote when page loads 