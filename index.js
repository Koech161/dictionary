document.addEventListener('DOMContentLoaded',()=>{
const url="https://api.dictionaryapi.dev/api/v2/entries/en/"
const sound=document.getElementById('sound')
const result=document.getElementById('results')
const btn=document.getElementById('srch-btn')

btn.addEventListener('click',()=>{
   const input=document.getElementById('input-box').value.trim()
    console.log(input);

    fetch(`${url}${input}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const wordData=data[0]
        const phonetics=wordData.phonetics.length>0 ? wordData.phonetics[0]:null
        const audioSrc = phonetics ? `https:${phonetics.audio}` : '';
        result.innerHTML=`<div id="word">
            <h3>${input}</h3>
            <button onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        <div id="details">
            <p>${wordData.meanings[0].partOfSpeech}</p>
            <p>/${wordData.phonetic || ''}/</p>
        </div>
        <p id="word-meaning">${wordData.meanings[0].definitions[0].definition}</p>
        <p id="word-example">${wordData.meanings[0].definitions[0].example || ''}</p>`

        sound.setAttribute("src",audioSrc)
        console.log(sound)

    })
    .catch(error => {
        console.error('Error fetching data:', error);
        result.innerHTML = `<p>Error fetching data. Please try again.</p>`;
    })
   
})
window.playSound=function() {
    if(sound.src){   
    sound.play();
    }
}

})