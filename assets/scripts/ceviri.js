import * as mainjs from '/assets/scripts/main.js'




$(async () => {

    let stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    //START SES KAYDETME
    const audioRecorder = new MediaRecorder(stream);
    const microphone = $("#microphone");
    const microphoneText = $("#text-microphone");

    let isRecord = false;
    microphone.click(() => {
        if (isRecord) {
            isRecord = false;
            microphone.removeClass('btn-danger');
            microphone.addClass('btn-success');
            microphoneText.text("")
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

})
