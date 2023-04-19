const loginIsSuccess = localStorage.getItem("login-is-success");
if (!loginIsSuccess) {
    window.location.href = "login.html"
}

function logout() {
    localStorage.setItem("login-is-success", false);
    window.location.href = "login.html"
}

function addNav(){
    const nav = '<nav class="navbar navbar-light"><a class="navbar-brand" href="index.html">' +
    '<img src="assets/images/logo.PNG" width="30" height="30" class="ms-2 d-inline-block align-top" alt="">' +
    '</a><button class="btn btn-danger btn-sm me-2" id="btn-logout">Çıkış Yap</div></nav>'

    $('body').prepend(nav)
}

function firstInit(){
    addNav();
    $('body').attr('class', 'custom-bg-color')
}


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

firstInit()

$(() => {

    $("btn-logout").click(() => {
        logout()
    })

})

