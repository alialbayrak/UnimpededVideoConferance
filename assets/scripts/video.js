import * as mainjs from '/assets/scripts/main.js'


$(async () => {

    let stream = await navigator.mediaDevices.getUserMedia({ video: true });

    //START VIDEO

    let video = document.querySelector("#video");

    const videoRecorder = new MediaRecorder(stream);
    video.srcObject = stream;

    let videoChunks = [];
    videoRecorder.addEventListener("dataavailable", event => {
        videoChunks.push(event.data);
    });
    videoRecorder.addEventListener("stop", event => {
        const blob = new Blob(videoChunks);
        const videoUrl = URL.createObjectURL(blob);
        videoChunks = [];
    });

    videoRecorder.start();

    //END VIDEO

})
