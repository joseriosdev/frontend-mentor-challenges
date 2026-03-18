const QUOTE = document.querySelector('p');
const ADVICE_NUM = document.querySelector('h1 span');
const URL = 'https://api.adviceslip.com/advice';

window.onload = updateUI;

async function fetchQuote() {
    const RESULT = await fetch(URL);
    const DATA = await RESULT.json();
    return DATA['slip'];
}

function updateUI() {
    fetchQuote().then(advice => {
        QUOTE.textContent = '"'+advice.advice+'"';
        ADVICE_NUM.textContent = advice.id;
    });
}