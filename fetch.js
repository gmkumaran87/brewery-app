class FetchApi {
    constructor() {
        this.pages = {}; // Pagination of incoming array objects
    }

    /* Fetching the API data using Asyn/Await Fetch 
                             Parameters
                             1. API URL - required
                          */
    fetchDrinks = async(url) => {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await response.json();

            //Paginate the JSON array
            this.pagination(data);

            return this.pages;
        } catch (error) {
            console.log("Error", error);
        }
    };

    /* Creats pages of 10 records per page 
                           Parameters
                            1. API Array Objects - required
                        */
    pagination = (data) => {
        let tempArr = [];

        for (let i = 0, count = 1; i < data.length; i++) {
            tempArr.push(data[i]);

            if (i % 10 === 9) {
                this.pages[count] = tempArr;
                count++;
                tempArr = [];
            }
        }
    };

    searchDrinkByType = async(type) => {
        console.log(type);
        try {
            const res = await fetch(
                `https://api.openbrewerydb.org/breweries?by_type=${type}`
            );
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const data = await res.json();
            //Paginate the JSON array
            this.pagination(data);
            return this.pages;
        } catch (error) {
            console.log("Error", error);
            return error;
        }
    };
}