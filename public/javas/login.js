var signUpDisplayBtn = document.getElementById("signUpDisplayBtn");
var backBtn = document.getElementById("backBtn");
var loginContainer = document.getElementById("loginContainer");
var signUpContainer = document.getElementById("signUpContainer");

signUpDisplayBtn.onclick = function myFunction() {
  sessionStorage.setItem("signUpDisplay","display");
  console.log(sessionStorage.getItem('signUpDisplay'));
  if (sessionStorage.getItem("signUpDisplay") !== "display") {
    loginContainer.style.display = "block";
    signUpContainer.style.display = "none";
  } else {
    loginContainer.style.display = "none";
    signUpContainer.style.display = "block";
  };
};

backBtn.onclick = function myFunction() {
  if(sessionStorage.getItem("signUpDisplay") == "display"){
    sessionStorage.setItem("signUpDisplay","block");
    console.log(sessionStorage.getItem("signUpDisplay"));
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
  if(formData.get("firstname") == null || nfInput.value == "" || /[^a-zA-Z]/.test(nfInput.value)){
    alert("Please enter your first name");
  } else if(formData.get("lastname") == null || nlInput.value == "" || /[^a-zA-Z]/.test(nlInput.value)) {
      alert("Please enter your last name");
  } else if(formData.get("email") == null || formData.get("email") == "" || /[^a-zA-Z]/.test(formData.get("email"))){

  } else if(formData.get("email") == null || formData.get("email") == "" || /[^a-zA-Z]/.test(formData.get("email"))){

  }  else {
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data['uid'] = 1;
    
    console.log("your data email",data.email);

    data['uid'] = 1;
    
    console.log("your data email",data.email);

    const response = await fetch('/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('User created successfully');
        sessionStorage.setItem("username", data.username);
        sessionStorage.setItem('password', data.password);
        window.location.href='/home';
    } else {
        alert('Error creating user');
    }
  };
});


document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => {
      data[key] = value;
  });

  const response = await fetch('/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });

  if (response.ok) {
      const userData = await response.json();
      sessionStorage.setItem('userData', JSON.stringify(userData));
      alert('logged in successfully');
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem('password', data.password);
      window.location.href = '/home';
  } else {
      alert('Invalid credentials');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  if (sessionStorage.getItem("signUpDisplay") !== "display") {
    loginContainer.style.display = "block";
    signUpContainer.style.display = "none";
  } else {
    loginContainer.style.display = "none";
    signUpContainer.style.display = "block";
  }
});

