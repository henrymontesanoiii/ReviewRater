var signUpDisplayBtn = document.getElementById("signUpDisplayBtn");
var backBtn = document.getElementById("backBtn");
var loginContainer = document.getElementById("loginContainer");
var signUpContainer = document.getElementById("signUpContainer");

signUpDisplayBtn.onclick = function myFunction() {
    if (loginContainer.style.display === "none") {
      loginContainer.style.display = "block";
      signUpContainer.style.display = "none";
    } else {
      loginContainer.style.display = "none";
      signUpContainer.style.display = "block";
    };
};

backBtn.onclick = function myFunction() {
  if(signUpContainer.style.display == "block"){
    loginContainer.style.display = "block";
    signUpContainer.style.display = "none";
  } else {
    loginContainer.style.display = "none";
    signUpContainer.style.display = "block";
  };
};