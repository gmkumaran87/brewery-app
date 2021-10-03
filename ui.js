class UI {
    constructor() {
        this.btnsCntr = document.querySelector(".button-container");
    }

    /* Creating Elements using DOM dynamically 
                                       Parameters
                                        1. HTML Elements - required
                                        2. Class Names - Optional*/

    createElements(el, classNames) {
        const element = document.createElement(el);
        //Checking if the class Name is present
        if (classNames) element.classList.add(...classNames);
        return element;
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    displayError(msg, breweries, btnsCntr) {
            breweries.innerHTML = "";
            btnsCntr.innerHTML = "";

            breweries.innerHTML = msg;
        }
        /* Displaying the Cards element in the Page using DOM dynamically in the breweries SECTION
                                                  1. API Objects Array - required*/

    displayDrinks(drinks, breweriesSection) {
        //Clearing the breweries section
        breweriesSection.innerHTML = "";

        drinks.forEach((drink) => {
            breweriesSection.append(this.generateCard(drink));
        });
    }

    displayButtons(pages, buttonsCntr, activeIndex) {
        // Clearing the existing buttons
        buttonsCntr.innerHTML = ``;
        pages.forEach((index) => {
            buttonsCntr.append(this.generateButtons(+index, activeIndex));
        });
    }

    /* Creating the Card ARTICLE element using DOM dynamically  and returning with API data loaded.
                              1. API Object - required*/
    generateCard(obj) {
        const article = this.createElements("article", ["card"]);
        article.innerHTML += `<div class="drink-detais"><h2 class="drink-title">${obj.name}</h2>
                      <h3 class="drink-type"><span class="drink-span">Type:</span> ${obj.brewery_type}</h3>
                      <p class="drink-street"><span class="drink-span">Street:</span> ${obj.street}</p>
                      <p class="drink-city"><span class="drink-span">Place:</span> ${obj.city}, ${obj.state}</p>
                      <p class="drink-contact" id="contact-${obj.id}"></p>
                      </div>
                      <div class="contacts">
                      <button class="btn icon phone" data-id="${obj.id}"><i class="fas fa-phone"></i></button>
                      <button class="btn icon website" data-id="${obj.id}""><i class="fas fa-link"></i></button>
                      </div>
                      </article>`;

        return article;
    }

    generateButtons(index, activeIndex) {
        const activeClass = index === activeIndex ? "active-btn" : null;
        const btn = this.createElements("button", ["btn", "page-btn", activeClass]);
        btn.id = `btn-${index}`;
        btn.type = "button";
        btn.innerHTML = index;
        btn.dataset.id = index;
        return btn;
    }
}