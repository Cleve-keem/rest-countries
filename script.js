const rootElement = document.documentElement;
const toggleThemeBtn = document.getElementById("toggle-themes");
const countriesGrid = document.querySelector(".countries-grid");
const dropdownOptions = document.querySelector(".drop-down-options");
const dropdownHeader = document.querySelector(".drop-down-head");
const searchInput = document.getElementById("search");

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

let allCountries = [];

async function fetchCountries() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();
    allCountries = data;
    // localStorage.setItem("allCountries", allCountries);
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
  closeDropdown();
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
            <p id="capital"><span>Capital:</span> ${
              country.capital ? country.capital[0] : "N/A"
            }</p>
        </div>
    </div>`;
  });
}

dropdownHeader.addEventListener("click", () => {
  dropdownOptions.classList.toggle("hidden");
});

dropdownOptions.addEventListener("click", (e) => {
  let option = e.target.closest("li");
  let selectedRegion = option.dataset.value;

  if (selectedRegion) {
    const filterdRegion = allCountries.filter(
      (country) => country.region.toLowerCase() === selectedRegion
    );
    renderCountries(filterdRegion);
    dropdownOptions.classList.add("hidden");
  }
});

function closeDropdown() {
  if (!dropdownOptions.classList.contains("hidden")) {
    dropdownOptions.classList.add("hidden");
  }
}

function findMatch() {
  let searchTerm = searchInput.value.toLowerCase();
  let searchResults = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm)
  );
  
  return renderCountries(searchResults.length > 0 ? searchInput : allCountries);
}

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

searchInput.addEventListener("input", debounce(findMatch, 500));

fetchCountries();
