import * as mainjs from './main.js'

$(async () => {
    let stream = await navigator.mediaDevices.getUserMedia({ video: true });

    //START VIDEO

    let video = document.querySelector("#video");
    video.srcObject = stream;
    $('#text').html('İşaret algılanmaya çalışılıyor...')

    const videoButton = $("#video-button");
    let isRecord = true;
    videoButton.click(() => {
        if (isRecord) {
            isRecord = false;
            video.srcObject = null;
            videoButton.removeClass('btn-danger');
            videoButton.addClass('btn-success');
            $('#text').html('Durduruldu...')
        }
        else {
            isRecord = true;
            video.srcObject = stream;
            videoButton.addClass('btn-danger');
            videoButton.removeClass('btn-success');
            $('#text').html('İşaret algılanmaya çalışılıyor...')
        }
    })

    //END VIDEO

    setInterval(function () {
        if (isRecord) {
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURI = canvas.toDataURL();
            const data = { image: dataURI };
            fetch('http://127.0.0.1:3000/sign/predict', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then(response => response.json())
                .then(data => {
                    if (isRecord) {
                        $('#text').html(data.Sign + ' %' + data.Ratio.toFixed(2))
                    }
                })
                .catch(error => {
                    console.error(data);
                });

        }
    }, 3000)
})
