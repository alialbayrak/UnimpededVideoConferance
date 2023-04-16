
function login(){
    
}

function speechToText() {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    let p = document.createElement("p")
    const words = document.querySelector(".words")
    words.appendChild(p)

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        p.textContent = transcript;
        if (e.results[0].isFinal) {
            words.innerHTML = "";
            p = document.createElement('p');
            words.appendChild(p)
        }
    })

    recognition.addEventListener('end', recognition.start)

    recognition.start()

}


$(async () => {

    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    //START VIDEO

    let isRecordVideo = false;

    let video_button = document.querySelector("#video-record");
    let video = document.querySelector("#video");
    let video2 = document.querySelector("#video2");

    const videoRecorder = new MediaRecorder(stream);
    video.srcObject = stream;
    video2.srcObject = stream;

    let videoChunks = [];
    videoRecorder.addEventListener("dataavailable", event => {
        videoChunks.push(event.data);
    });
    videoRecorder.addEventListener("stop", event => {
        const blob = new Blob(videoChunks);
        const videoUrl = URL.createObjectURL(blob);
        console.log(videoUrl)
        videoChunks = [];
    });

    videoRecorder.start();

    //END VIDEO


    //START SES KAYDETME
    let isRecord = false;
    let audio_button = document.querySelector("#audio-record");

    const audioRecorder = new MediaRecorder(stream);

    let audioChunks = [];

    audioRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
    });
    audioRecorder.addEventListener("stop", event => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audioChunks = [];
    });

    audio_button.addEventListener('click', async function () {

        if (isRecord) {
            isRecord = false;
            audio_button.style = "";
            audio_button.textContent = "Kaydet";
            audioRecorder.stop();
        }
        else {
            isRecord = true;
            audio_button.style = "color:red";
            audio_button.textContent = "Kaydediliyor...";
            audioRecorder.start();
        }

    });

    //END SES KAYDETME

    speechToText();

})
