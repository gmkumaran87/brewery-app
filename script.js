const URL = "https://api.openbrewerydb.org/breweries";
let index = 1; // Default page index to be shown

// Initializing the Fetch and UI classes
const drinks = new FetchApi();

const ui = new UI();

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

/* Handling the click EVENTS of phone and Website buttons in the Cards 
   to display Phone no and URL
   
   Parameters
   1. EVENT - required
*/
const handleClick = (e) => {
    console.log(e.currentTarget, drinks.pages[index]);

    const classes = e.currentTarget.classList;

    const drinkId = +e.currentTarget.dataset.id;
    const contact = getElement(`#contact-${drinkId}`);
    // Search the id in the pages and get the Phone number or Site URL
    let targetObj = drinks.pages[index].find((el) => el.id === drinkId);

    if (classes.contains("phone")) {
        contact.innerHTML = `Phone: <span class="drink-value">${targetObj.phone}</span>`;
    } else {
        contact.innerHTML = `Website URL: <span class="drink-value">${targetObj.website_url}</span>`;
    }
};

const showLoading = () => {
    const breweriesSection = getElement(".breweries");
    const loading = createElements("h2", ["loading"]);
    loading.innerHTML = "Please wait while the page is loading...!";

    breweriesSection.innerHTML = "";
    breweriesSection.append(loading);
};

/* Setting the click EVENTS of all the buttons in the page 
   
   Parameters - NONE
*/
const settingListeners = () => {
    const phoneIcon = getElements(".phone");

    phoneIcon.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });

    const websiteIcon = getElements(".website");

    websiteIcon.forEach((icon) => {
        icon.addEventListener("click", handleClick);
    });

    // Pagination listeners
    const prevBtn = getElement(".prev-btn");
    const nextBtn = getElement(".next-btn");

    //Even listener for prev and next button
    prevBtn.addEventListener("click", handlePageBtns);
    nextBtn.addEventListener("click", handlePageBtns);

    const pageBtns = getElements(".page-btn");

    // Event Listeners for the Button clicks
    pageBtns.forEach((btn) => {
        btn.addEventListener("click", handlePageBtns);
    });
};

const settingInitialPage = () => {
    const bodyEl = document.body;

    //Creating the HEADER element
    const header = createElements("header", ["title"]);
    header.innerHTML = `<h1>Open Brewery API</h1>`;

    bodyEl.prepend(header);

    // Creating SECTION - breweries and append ater HEADER element
    const breweries = createElements("section", ["breweries"]);

    header.after(breweries);

    const form = createElements("form", ["drinks-form"]);
    form.innerHTML = `<input type="text" id="drink-input" name="drink-input" placeholder="Search by name, state,type">`;

    breweries.before(form);

    const buttonContainer = createElements("section", ["button-container"]);

    buttonContainer.innerHTML = `<button type="button" class="btn prev-btn">Prev</button>
                                 <div class="page-btns-container"></div>
                                 <button type="button" class="btn next-btn">Next</button>`;

    breweries.after(buttonContainer);
};

const handleInput = async(e) => {
    e.preventDefault();

    const breweries = getElement(".breweries");
    const buttonsCnt = getElement(".page-btns-container");

    const pages = await drinks.searchDrinkByType(e.currentTarget.value);

    console.log(pages, index);
    // Displaying the API contents in the Webpage
    ui.displayDrinks(pages[index], breweries);

    // Displaying Pagination buttons
    ui.displayButtons(Object.keys(pages), buttonsCnt, index);

    //Setting Event listeners for all the buttons
    settingListeners();
};
// Initializing the Page with list of Breweries
const init = async() => {
    // Setting initial page loading message
    settingInitialPage();
    showLoading();

    const breweries = getElement(".breweries");
    const buttonsCnt = getElement(".page-btns-container");

    // Fetching the drinks from API
    const pages = await drinks.fetchDrinks(URL);

    // Displaying the API contents in the Webpage
    ui.displayDrinks(pages[index], breweries);

    // Displaying Pagination buttons
    ui.displayButtons(Object.keys(pages), buttonsCnt, index);

    //Setting Event listeners for all the buttons
    settingListeners();

    // Input form EVENT Listener
    const inputEl = getElement(`input[name="drink-input"]`);

    inputEl.addEventListener("keyup", handleInput);
};

// Initializing the Webpage
init();

/* Handling the Pagination buttons */
const handlePageBtns = (e) => {
    const btnValue = e.target.innerHTML;

    const breweries = getElement(".breweries");

    const totalLength = Object.keys(drinks.pages).length;

    if (btnValue === "Prev") {
        if (index === 1) {
            index = totalLength;
        } else {
            index--;
        }
    } else if (btnValue === "Next") {
        if (index === totalLength) {
            index = 1;
        } else {
            index++;
        }
    } else {
        index = +btnValue;
    }

    //Toggling the active button
    const activeBtn = getElement(".active-btn");
    activeBtn.classList.remove("active-btn");

    const newActiveBtn = getElement(`#btn-${index}`);
    newActiveBtn.classList.add("active-btn");

    ui.displayDrinks(drinks.pages[index], breweries);

    //Setting Event listeners for all the buttons
    settingListeners();
};