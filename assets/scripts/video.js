import * as mainjs from '/assets/scripts/main.js'
import * as html2canvasjs from '/assets/lib/html2canvas/html2canvas.js'

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
                        if (isRecord) {
                            $('#text').html(data.Sign + ' %' + data.Ratio.toFixed(2))
                        }
                    })
                    .catch(error => {
                        console.error(data);
                    });
            });
        }
    }, 3000)






})
