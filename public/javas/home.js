var signUpBtn = document.getElementById("signUpBtn");
var homeLoginBtn = document.getElementById("homeLoginBtn");

signUpBtn.onclick = function myFunction(){
    sessionStorage.setItem("signUpDisplay", "display");
    window.location.href = "/"
};

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("username")){
      homeLoginBtn.innerText = sessionStorage.getItem("username");
    } else {
      homeLoginBtn.innerText = "Login"
    }
});