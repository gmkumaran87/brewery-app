class FetchApi {
    constructor() {
        this.pages = {}; // Pagination of incoming array objects
    }

    /* Fetching the API data using Asyn/Await Fetch  Parameters- API URL - required*/
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

    /* Creats pages of 10 records per page  Parameter - API Array Objects - required */
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
        // console.log(type, word);

        try {
            const [res1, res2, res3] = await Promise.all([
                fetch(`https://api.openbrewerydb.org/breweries?by_type=${type}`).then(
                    (data) => data.json()
                ),
                fetch(`https://api.openbrewerydb.org/breweries?by_state=${type}`).then(
                    (data) => data.json()
                ),
                fetch(`https://api.openbrewerydb.org/breweries?by_name=${type}`).then(
                    (data) => data.json()
                ),
            ]);
            // console.log([...res1, ...res2, ...res3]);
            if (res1.length > 0 && res2.length > 0 && res3.length > 0) {
                throw new Error("Something went wrong!");
            }
            //Paginate the JSON array
            this.pagination([...res1, ...res2, ...res3]);

            return this.pages;
        } catch (error) {
            console.log("Error", error);
        }
    };
}