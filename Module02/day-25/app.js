const STORAGE_KEY = "ethiopiaWeatherSaved";
const PHONE = /^(?:\+251|0)9\d{8}$/;
const DATA_PATH = "./data/weather.json";
const IMAGE_PATH = "./images/";
const ERROR_LOAD = "Could not load cities.";
const ERROR_SEARCH = "No cities match your search.";

const state = { cities: [], saved: [], search: "" };

async function loadCities() {
  const cityEl = document.querySelector("#cities");
  cityEl.textContent = "Loading cities...";
  try {
    const res = await fetch(DATA_PATH);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      cityEl.textContent = "No city data available.";
      return;
    }
    state.cities = data;
    render();
  } catch (err) {
    cityEl.textContent = ERROR_LOAD;
  }
}

function filterCities(term) {
  return state.cities.filter(c => c.city.toLowerCase().includes(term));
}

function render() {
  const term = state.search.toLowerCase();
  const shown = filterCities(term);
  renderCities(shown);
  renderSaved();
}

function renderCities(shown) {
  const cityEl = document.querySelector("#cities");
  if (shown.length === 0) {
    cityEl.innerHTML = `<p>${ERROR_SEARCH}</p>`;
    return;
  }
  cityEl.innerHTML = shown.map(c => `
    <article class="city" data-id="${c.id}" 
      style="background-image: url('${IMAGE_PATH}${c.icon || "default.webp"}');
             background-size: cover;
             background-position: center;
             color: white;">
      <div class="overlay">
        <h3>${c.city}</h3>
        <p>${c.temp}°C · ${c.condition}</p>
        <button class="save" aria-label="Save ${c.city}">Save</button>
      </div>
    </article>
  `).join("");
}

function renderSaved() {
  const savedEl = document.querySelector("#saved");
  if (state.saved.length === 0) {
    savedEl.innerHTML = "<p>No saved cities yet.</p>";
    return;
  }
  savedEl.innerHTML = state.saved.map(c => `
    <div data-id="${c.id}">
      ${c.city} (${c.temp}°C)
      <button class="delete" aria-label="Delete ${c.city}">Delete</button>
    </div>
  `).join("");
}

document.querySelector("#saved").addEventListener("click", e => {
  if (!e.target.matches(".delete")) return;
  const id = Number(e.target.closest("div").dataset.id);
  state.saved = state.saved.filter(c => c.id !== id);
  save();
  render();
});

document.querySelector("#cities").addEventListener("click", e => {
  if (!e.target.matches(".save")) return;
  const id = Number(e.target.closest(".city").dataset.id);
  const city = state.cities.find(c => c.id === id);
  const fav = state.saved.find(f => f.id === id);
  state.saved = fav
    ? state.saved.filter(f => f.id !== id)
    : [...state.saved, { ...city }];
  save();
  render();
});

document.querySelector("#search").addEventListener("input", e => {
  state.search = e.target.value;
  render();
});

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.saved));
}

function load() {
  const s = localStorage.getItem(STORAGE_KEY);
  if (s) state.saved = JSON.parse(s);
}

document.querySelector("#subscribe").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.querySelector("#subscriber-name").value.trim();
  const phone = document.querySelector("#subscriber-phone").value.trim();
  const city = document.querySelector("#subscriber-city").value;
  const errorEl = document.querySelector("#form-error");

  const msg = validate({ name, phone, city });
  errorEl.textContent = msg;
  if (msg) return;

  showConfirmation({ name, phone, city });
  e.target.reset();
});

function validate({ name, phone, city }) {
  if (!name) return "Please enter your name.";
  if (!PHONE.test(phone)) return "Enter a valid Ethiopian phone number.";
  if (!city) return "Please select a city.";
  return "";
}

function showConfirmation({ name, phone, city }) {
  const box = document.createElement("div");
  box.className = "success";
  box.innerHTML = `
    Subscription confirmed for ${name} in ${city}. Alerts will be sent to ${phone}.
    <button class="remove">Remove</button>
  `;
  document.querySelector("#subscribe-section").appendChild(box);
}

document.querySelector("#subscribe-section").addEventListener("click", e => {
  if (!e.target.matches(".remove")) return;
  e.target.closest(".success").remove();
});

async function init() {
  load();
  await loadCities();
}
init();
