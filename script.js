const rootElement = document.documentElement;
const toggleThemeBtn = document.getElementById("toggle-themes");
const countriesGrid = document.querySelector(".countries-grid");

if (!localStorage.getItem("theme")) {
  rootElement.setAttribute("data-theme", "light");
  localStorage.setItem("theme", "light");
} else {
  rootElement.setAttribute("data-theme", localStorage.getItem("theme"));
}

toggleThemeBtn.addEventListener("click", () => {
  let themeToSet = rootElement.getAttribute("data-theme");
  let currentTheme = themeToSet === "light" ? "dark" : "light";

  rootElement.setAttribute("data-theme", currentTheme);
  localStorage.setItem("theme", currentTheme);
});

// let currentCountries = [];

async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    renderCountries(data);
  } catch (error) {
    console.log(error.message);
  }
}

function clear() {
  countriesGrid.innerHTML = "";
}

function renderCountries(countries) {
  clear();
  countries.forEach((country) => {
    console.log(country);
    countriesGrid.innerHTML += `
    <div class="country-card">
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <div class="country-details">
            <h3 class="name"> ${country.name.common}</h3>
            <p id="population"><span>Population:</span> ${Number(
                country.population
            ).toLocaleString()}</p>
            <p id="region"><span>Region:</span> ${country.region}</p>
            <p id="capital"><span>Capital:</span> ${country.capital[0]}</p>
        </div>
    </div>`;
  });
}

fetchCountries();
