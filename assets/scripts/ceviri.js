import * as mainjs from '/assets/scripts/main.js'


function speechToText() {

    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    let p = document.createElement("span")
    const words = document.querySelector(".words")
    words.appendChild(p)

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        p.textContent = transcript;
        //console.log(transcript);
        if (e.results[0].isFinal) {
            words.innerHTML = "";
            p = document.createElement('span');
            words.appendChild(p)
        }
    })

    recognition.addEventListener('end', () => {
        recognition.start();
        //console.log("recognition tekrar başlatıldı.");
    });

    recognition.start()

}


$(async () => {

    let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

    //START VIDEO

    // let isRecordVideo = false;

    // let video_button = document.querySelector("#video-record");
    // let video = document.querySelector("#video");

    // const videoRecorder = new MediaRecorder(stream);
    // video.srcObject = stream;

    // let videoChunks = [];
    // videoRecorder.addEventListener("dataavailable", event => {
    //     videoChunks.push(event.data);
    // });
    // videoRecorder.addEventListener("stop", event => {
    //     const blob = new Blob(videoChunks);
    //     const videoUrl = URL.createObjectURL(blob);
    //     videoChunks = [];
    // });

    // videoRecorder.start();

    //END VIDEO

    //START SES KAYDETME
    const audioRecorder = new MediaRecorder(stream);
    const microphone = $("#microphone");

    let isRecord = false;
    microphone.click(() => {
        if (isRecord) {
            isRecord = false;
            microphone.removeClass('btn-danger');
            microphone.addClass('btn-success');
            audioRecorder.stop();
        }
        else {
            isRecord = true;
            microphone.addClass('btn-danger');
            microphone.removeClass('btn-success');
            audioRecorder.start();
        }
    })

    let audioChunks = [];

    audioRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
        console.log('test');
    });
    audioRecorder.addEventListener("stop", event => {
        const audioBlob = new Blob(audioChunks);
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audioChunks = [];
    });

    //END SES KAYDETME

    speechToText();

})
