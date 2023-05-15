let $ = document;

let wordInput = $.querySelector('.word-input');
let searchBtn = $.querySelector('.search-btn');
let wordName = $.querySelector('.name');
let type = $.querySelector('.type');
let pronounce = $.querySelector('.pronounce');
let audioElem = $.querySelector('.audioPronounce');
let audioIcon = $.querySelector('.audioIcon');
let wordText = $.querySelector('.word-text');

searchBtn.addEventListener('click', () => {
    getWordInformation()
})

wordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        getWordInformation();
    }
})

function getWordInformation() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput.value}`)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                window.location.href = '../404/404.html'
            }
        })
        .then(data => {
            console.log(data);
            showWordInformationDOM(data);
        })
}
audioIcon.addEventListener('click', () => {
    audioElem.play()
})

function showWordInformationDOM(data) {
    pronounce.innerHTML = '';
    wordName.innerHTML = '';
    wordText.innerHTML = '';
    audioElem.src = data[0].phonetics[0].audio ?? 'https://api.dictionaryapi.dev/media/pronunciations/en/entry.mp3';
    audioIcon.style.display = 'block';
    wordName.innerHTML = data[0].word;
    Object.entries(data[0].meanings).forEach(obj => {
        type.innerHTML += '&nbsp;' + obj[1].partOfSpeech + '/'
    })
    pronounce.innerHTML += 'Pronounce: &nbsp;' + data[0].phonetic;
    console.log(data[0]);
    Object.entries(data[0].meanings).forEach(obj => {
        console.log(obj[1].definitions);
        Object.entries(obj[1].definitions).forEach(object => {
            console.log(object[1].definition);
            wordText.innerHTML += obj[1].partOfSpeech + ' : ' + object[1].definition + '<br/>';
        })
    })
    // audioPronounce.innerHTML = 
}