import * as mainjs from '/assets/scripts/main.js'
import * as html2canvasjs from '/assets/lib/html2canvas/html2canvas.js'

$(async () => {

    const videoButton = $("#video-button");
    let isRecord = true;
    videoButton.click(() => {
        if (isRecord) {
            videoRecorder.stop();
        }
        else {
            videoRecorder.start();
        }
    })

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
        // const blob = new Blob(videoChunks);
        // const videoUrl = URL.createObjectURL(blob);
        // videoChunks = [];
        isRecord = false;
        videoButton.removeClass('btn-danger');
        videoButton.addClass('btn-success');
        $('#text').html('Durduruldu...')

    });
    videoRecorder.addEventListener("start", event => {
        isRecord = true;
        videoButton.addClass('btn-danger');
        videoButton.removeClass('btn-success');
        $('#text').html('El algılanmaya çalışılıyor...')
    });

    videoRecorder.start();

    //END VIDEO

    setInterval(function () {
        if (isRecord) {
            const screenshotTarget = video;
            html2canvas(screenshotTarget).then((canvas) => {
                const base64image = canvas.toDataURL("image/png");
                const data = { image: base64image };
                fetch('https://engelliyasam.pythonanywhere.com/sign/predict', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        $('#text').html(data.Sign + ' %' + data.Ratio.toFixed(2))
                    })
                    .catch(error => {
                        console.error(data);
                        $('#text').html(data.Sign + ' %' + data.Ratio.toFixed(2))
                    });
            });
        }
    }, 3000)






})
