const URL = "https://api.openbrewerydb.org/breweries";

/* Getting the Elements using querySelector dynamically 
   The argument must be '.' apended
   Parameters
   1. HTML Elements - required
*/
const getElements = (el) => {
    const element = document.querySelectorAll(el);
    return element;
};

const getElement = (el) => {
    const element = document.querySelector(el);
    return element;
};
/* Creating Elements using DOM dynamically 
   Parameters
   1. HTML Elements - required
   2. Class Names - Optional
*/
const createElements = (el, classNames) => {
    const element = document.createElement(el);
    //Checking if the class Name is present
    if (classNames) element.classList.add(...classNames);
    return element;
};

const breweriesSection = getElement(".breweries");

/* Fetching the API data using Asyn/Await Fetch 
   Parameters
   1. API URL - required
*/
const fetchDrinks = async(url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error", error);
    }
};

/* Creating the Card ARTICLE element using DOM dynamically 
   and returning with API data loaded.
   1. API Object - required
*/
const generateCard = (obj) => {
    const article = createElements("article", ["card"]);
    article.innerHTML += `<h2 class="drink-name">${obj.name}</h2>
                      <h3 class="drink-type">${obj.brewery_type}</h3>
                      <p class="drink-street">${obj.street}</p>
                      <p class="drink-city">${obj.city}, ${obj.state}</p>
                      <p class="drink-title">Phone: <span class="drink-value">9565424</span></p>
                      <div class="contacts">
                      <button class="icon phone" data-id="${obj.id}"><i class="fas fa-phone"></i></button>
                      <button class="icon website" data-id="${obj.id}""><i class="fas fa-link"></i></button>
                      </div>
                      </article>`;

    return article;
};

const handleClick = (e) => {
    console.log(e.currentTarget);
};
/* Displaying the Cards element in the Page using DOM dynamically 
   in the breweries SECTION

   1. API Objects Array - required
*/
displayDrinks = (drinks) => {
    //Clearing the breweries section
    breweriesSection.innerHTML = "";

    drinks.forEach((drink) => {
        breweriesSection.append(generateCard(drink));
    });

    const phoneIcon = getElements(".phone");
    console.log(phoneIcon);
    phoneIcon.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });
};

const showLoading = () => {
    const loading = createElements("h2", ["loading"]);
    loading.innerHTML = "Please wait while the page is loading...!";

    breweriesSection.innerHTML = "";
    breweriesSection.append(loading);
};

// Initializing the Page with list of Breweries
const init = async() => {
    showLoading();

    const drinks = await fetchDrinks(URL);
    console.log(drinks);

    displayDrinks(drinks);
};

init();