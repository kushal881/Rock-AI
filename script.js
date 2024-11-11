let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate=1
    text_speak.pitch=1
    text_speak.volume=1
    window.speechSynthesis.speak(text_speak)
}

function wishme(){
    let day = new Date()
    let hours = day.getHours()
    if(hours>=0&&hours && hours<12){
        speak("Good Morning Sir")
    }
    else if(hours>=12 && hours<16){
        speak("Good afternoon sir")
    }
    else{
        speak("Good evening sir")
    }
}
window.addEventListener('load',()=>{
    wishme();
})
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult=((e)=>{
    let current_idx = e.resultIndex
    let transcript = e.results[current_idx][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
})
btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display="none"
    voice.style.display="block"
})
function takeCommand(message){
    btn.style.display="flex"
    voice.style.display="none"
    if(message.includes("hello") || message.includes("hey")){
        speak("hello sir,what can i help you?")
    }
    else if(message.includes("who are you") || message.includes("hu r u")){
        speak("i am virtual assistance, created by kushal")
    }
    else if(message.includes("open youtube")){
        speak("opening youtube")
        window.open("https://youtube.com","_blank")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short",year:"numeric"})
        speak(date)
    }
    else if(message.includes("how are you") || message.includes("how r u")){
        speak("i am fine, what about you")
    }
    else if(message.includes("i am also fine")){
        speak("oh great, how can i help you")
    }
    else if (message.includes("play song")){
        speak(`here is your song on youtube`)
        window.open(`https://www.youtube.com/results?search_query=${message}`)
    }
    else{
        speak(`this is what i fond on internet regarding ${message}`)
        window.open(`https://www.google.com/search?q=${message}`)
    }
}