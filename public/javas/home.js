var signUpBtn = document.getElementById("signUpBtn");
var homeLoginBtn = document.getElementById("homeLoginBtn");

document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem("username")){
    signUpBtn.innerText = "Logout";
  } else {
    signUpBtn.innerText = "Sign Up"
  }
});

signUpBtn.onclick = function myFunction(){
    if (sessionStorage.getItem("username")){
      sessionStorage.clear();
    } else {
      sessionStorage.setItem("signUpDisplay", "display");
      window.location.href = "/"
    }
};

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("username")){
      homeLoginBtn.innerText = sessionStorage.getItem("username");
    } else {
      homeLoginBtn.innerText = "Login"
    }
});