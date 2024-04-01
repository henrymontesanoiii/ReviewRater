const productID = "Lay's Chips"; //TO BE FIXED

//return Product Details Function
async function fetchProduct() {
  try {
    console.log("Fetching Product ...")
    const response = await fetch('/prod'); //change to + productID endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const returnedObject = response.json();
    return returnedObject;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

//return associated product comments function
async function fetchComms() {
  try {
    console.log("Fetching Comments ...");
    const response = await fetch('/comms'); //change to + productID endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const returnedComments = response.json();
    return returnedComments;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}

//call API to retrive product & dynamically populate html
fetchProduct().then(returnedObject => {
  if (returnedObject) {
    let prodName = returnedObject.name;
    let prodDesc = returnedObject.description;
    let prodRating = Math.round(returnedObject.rating);
    let prodImg = returnedObject.img;
    document.getElementById("title").innerHTML = prodName;
    document.getElementById("desc").innerHTML = prodDesc;
    document.getElementById("img").src = prodImg;

    switch (prodRating) {
      case (prodRating = 1):
        document.getElementById("rating").src = "../images/1star.png";
        break;
      case (prodRating = 2):
        document.getElementById("rating").src = "../images/2star.png";
        break;
      case (prodRating = 3):
        document.getElementById("rating").src = "../images/3star.png";
        break;
      case (prodRating = 4):
        document.getElementById("rating").src = "../images/4star.png";
        break;
      case (prodRating = 5):
        document.getElementById("rating").src = "../images/5star.png";
        break;
      default:
        console.log("Error finding rating");
    }

  } else {
    // Handle error
    console.log("Error fetching product.");
  }
});

//call API to retrive comments & dynamically populate html
fetchComms().then(returnedComments => {
  if (returnedComments) {
    let commentReviewer = "";
    let commentRating = 0;
    let commentDescription = "";
    console.log("RETURNED COMMENTS");
    console.log(returnedComments);
    returnedComments.forEach(element => {
      commentReviewer = element.reviewer;
      commentRating = element.rating;
      commentDescription = element.description;

      //card variables

      let breakDiv = document.createElement('br');

      let outsideCard = document.createElement('div');
      outsideCard.classList.add('card');
      //outsideCard.style('width: 18rem;');

      let cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      let cardImage = document.createElement('img');
      cardImage.setAttribute('src', '../images/4star.png');
      cardImage.setAttribute('alt', 'Girl in a jacket');
      cardImage.setAttribute('height', '22');

      let cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = commentReviewer;

      let cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = commentDescription;

      document.getElementById("comments").appendChild(outsideCard);
      document.getElementById("comments").appendChild(cardBody);
      document.getElementById("comments").appendChild(cardTitle);
      document.getElementById("comments").appendChild(cardImage);
      document.getElementById("comments").appendChild(cardText);
      document.getElementById("comments").appendChild(breakDiv);
    });
  } else {
    // Handle error
    console.log("Error fetching comments.");
  }
});

//add new comment
document.getElementById('commentForm').addEventListener('submit', async function (event) {
  event.preventDefault();
  newComment = "";
  const data = new FormData(this);
  for (const [name, value] of data) {
    newComment = value;
  }
  const response = await fetch('/newcomment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: productID,
      description: newComment,
      rating: 2, //TO BE REPLACED WITH SENTIMENT ANALYSIS
      reviewer: 'TESTUSER' //TO BE REPLACED WITH COOKIE DATA
    })
  });

  if (response.ok) {
    alert('Comment Successfully Submitted!');
    location.reload();
  } else {
    alert('Error creating comment');
  }
});
