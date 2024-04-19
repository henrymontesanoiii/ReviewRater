

//return associated product comments function
async function fetchProducts() 
{
  try 
  {
    console.log("Fetching Products ...");
    const response = await fetch('/products'); 
    if (!response.ok) 
    {
      throw new Error('Network response was not ok.');
    }
    const returnedProducts = response.json();
    return returnedProducts;
  } 
  catch (error) 
  {
    console.error('Fetch error:', error);
    return null;
  }
}

async function selectProduct(id)
{
  sessionStorage.setItem('product', id)
  console.log(sessionStorage.getItem('product'));
  window.location.href = '/details';
}

//call API to retrieve products & dynamically populate html
fetchProducts().then(returnedProducts => {
  if (returnedProducts) {
    const productsContainer = document.getElementById('products-container');
    let counter = 0;
    let currentRow;

    returnedProducts.forEach(element => {
      const productName = element.name;
      const productRating = element.rating.toString();
      const productDescription = element.description;
      const productImage = element.img;

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card');

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const cardImage = document.createElement('img');
      cardImage.setAttribute('src', productImage);
      cardImage.setAttribute('alt', productName);
      cardImage.setAttribute('height', '250');
      cardImage.setAttribute('width', '250');

      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.innerHTML = productName;

      const cardRating = document.createElement('h6');
      cardRating.classList.add('card-rating');
      cardRating.innerHTML = `Rating: ${productRating}`;

      const cardText = document.createElement('p');
      cardText.classList.add('card-text');
      cardText.innerHTML = productDescription;

      
      const detailsButton = document.createElement('button');
      detailsButton.classList.add('btn','btn-success');
      detailsButton.id = productName;
      detailsButton.innerHTML = "More Details";

      cardBody.appendChild(cardImage);
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardRating);
      cardBody.appendChild(cardText);
      cardBody.appendChild(detailsButton);
      cardDiv.appendChild(cardBody);

      if (counter % 3 === 0) 
      {
        currentRow = document.createElement('div');
        currentRow.classList.add('row');
        productsContainer.appendChild(currentRow);
      }

      const colDiv = document.createElement('div');
      colDiv.classList.add('col-md-4', 'd-flex', 'justify-content-center');
      colDiv.appendChild(cardDiv);
      currentRow.appendChild(colDiv);
      counter++;
    });

    let detailsButtons = document.querySelectorAll(".btn-success");
    detailsButtons.forEach(btn => {
      btn.addEventListener('click', (event) => {
        selectProduct(btn.id);
      })
    })

    //this is the search products function allows for the search filter
    function searchProducts() 
    {
      const input = document.getElementById('searchInput').value.toLowerCase();
      const cards = document.getElementsByClassName('card');

      for (let card of cards) 
      {
        const productName = card.querySelector('.card-title').textContent.toLowerCase();
        const productDescription = card.querySelector('.card-text').textContent.toLowerCase();

        if (productName.includes(input) || productDescription.includes(input)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      }
    }

    // Event Listener for Search Input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', searchProducts);

  } 
  else 
  {
    // Handle error
    console.log("Error fetching products.");
  }
});

