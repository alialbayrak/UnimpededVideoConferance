$("#btn-girisyap").click(login)

$("#username").keydown(function (e) {
    if (e.keyCode == 13) {
        login();
    }
});

$("#password").keydown(function (e) {
    if (e.keyCode == 13) {
        login();
    }
});

function login() {
    var email = $("#username").val()
    var password = $("#password").val()


    var isSuccess = false;
    if (email === "demo@demo.com" && password === "123") {
        isSuccess = true;
    }

    if (isSuccess) {
        localStorage.setItem("login-is-success", true);
        window.location.href = "index.html";
    }
    else
    {
        localStorage.setItem("login-is-success", false);
        $("#error").text("Kullanıcı adı veya şifre hatalı!")
    }

}