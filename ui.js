class UI {
    constructor() {}

    /* Creating Elements using DOM dynamically 
                Parameters
                1. HTML Elements - required
                2. Class Names - Optional
            */
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

    /* Displaying the Cards element in the Page using DOM dynamically 
                   in the breweries SECTION
                   1. API Objects Array - required
                */
    displayDrinks(drinks, breweriesSection) {
        //Clearing the breweries section
        breweriesSection.innerHTML = "";

        drinks.forEach((drink) => {
            breweriesSection.append(this.generateCard(drink));
        });
    }

    displayButtons(pages, breweriesSection) {
        const bodyEl = this.getElement("body");

        const buttonContainer = this.createElements("section", [
            "button-container",
        ]);

        buttonContainer.innerHTML = `<button type="button" class="btn prev-btn">Prev</button>
                                     <button type="button" class="btn next-btn">Next</button>`;

        breweriesSection.after(buttonContainer);

        const pageBtnsContainer = this.createElements("div", [
            "page-btns-container",
        ]);

        pages.forEach((btn) => {
            pageBtnsContainer.append(this.generateButtons(btn));
        });

        // Inserting the Page buttons before Next button
        const nextBtn = this.getElement(".next-btn");
        nextBtn.before(pageBtnsContainer);
    }

    /* Creating the Card ARTICLE element using DOM dynamically 
               and returning with API data loaded.
              1. API Object - required
              */
    generateCard(obj) {
        const article = this.createElements("article", ["card"]);
        article.innerHTML += `<div class="drink-detais"><h2 class="drink-title">${obj.name}</h2>
                      <h3 class="drink-type"><span class="drink-type-span">Type:</span> ${obj.brewery_type}</h3>
                      <p class="drink-street">${obj.street}</p>
                      <p class="drink-city">${obj.city}, ${obj.state}</p>
                      <p class="drink-contact" id="contact-${obj.id}"></p>
                      </div>
                      <div class="contacts">
                      <button class="icon phone" data-id="${obj.id}"><i class="fas fa-phone"></i></button>
                      <button class="icon website" data-id="${obj.id}""><i class="fas fa-link"></i></button>
                      </div>
                      </article>`;

        return article;
    }

    generateButtons(btns) {
        const btn = this.createElements("button", ["btn", "page-btn"]);
        btn.type = "button";
        btn.innerHTML = btns;
        btn.dataset.id = btns;
        return btn;
    }
}