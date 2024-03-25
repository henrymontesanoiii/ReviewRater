var signUpDisplayBtn = document.getElementById("signUpDisplayBtn");
var signUpBtn = document.getElementById("signUpBtn");
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

document.getElementById('createUserForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  console.log(data);
  const response = await fetch('/create', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  if (response.ok) {
      alert('User created successfully');
  } else {
      alert('Error creating user');
  }
});
