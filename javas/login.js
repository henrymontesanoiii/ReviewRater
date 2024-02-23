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
signUpBtn.onclick = function myFunction() {
  console.log("clicked!");
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

function showMore() {
  // Add more products dynamically when "Show More" is clicked
  const productList = document.getElementById("productList");
  
  // Add more product items (adjust as needed)
  productList.innerHTML += `
      <p>Additional Product</p>
      <p>Another Product</p>
      <!-- Add more products as needed -->
  `;

  // Scroll to the bottom after adding new content
  productList.scrollTop = productList.scrollHeight;
}