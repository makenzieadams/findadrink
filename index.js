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
      console.log(drinks);
    });
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
