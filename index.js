const setupPage = () => {
  const jsConfetti = new JSConfetti();

  const fireConfetti = () => {
    jsConfetti.addConfetti();
  };

  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const term = event.target.drink.value;
    getDrinks(term).then((drinks) => {
      fireConfetti();
      showDrinks(drinks);
    });
  });

  const randomDrink = document.querySelector("#randomdrink");
  randomDrink.addEventListener("click", (event) => {
    const getRandomDrink = () => {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      return fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/random.php`,
        options
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          return res.drinks;
        });
    };

    getRandomDrink().then((drinks) => {
      fireConfetti();
      showDrinks(drinks);
    });
  });
};

const showDrinks = (drinks) => {
  const drinkContainer = document.querySelector("#drink-container");
  while (drinkContainer.firstChild) {
    drinkContainer.firstChild.remove();
  }

  drinks.forEach((drink) => {
    const drinkCard = document.createElement("div");
    drinkCard.classList.add("drink-card");
    const drinkTitle = document.createElement("h5");

    drinkTitle.textContent = drink.strDrink;

    drinkCard.appendChild(drinkTitle);
    drinkContainer.appendChild(drinkCard);
  });
};

const getDrinks = (term) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  };

  return fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`,
    options
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res.drinks;
    });
};

document.addEventListener("DOMContentLoaded", setupPage);
