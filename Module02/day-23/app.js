const state = { cities: [], saved: [], search: "" };

async function loadCities() {
  const cityEl = document.querySelector("#cities");
  cityEl.textContent = "Loading cities...";
  try {
    const res = await fetch("./data/weather.json");

    if (!res.ok) throw new Error("HTTP " + res.status);
    state.cities = await res.json();
    render();
  } catch (err) {
    cityEl.textContent = "Could not load cities.";
  }
}

function render() {
  const term = state.search.toLowerCase();
  const shown = state.cities.filter(c => c.city.toLowerCase().includes(term));

  document.querySelector("#cities").innerHTML = shown.map(c => `
 <article class="city" data-id="${c.id}" 
      style="background-image: url('./images/${c.icon}');
             background-size: cover;
             background-position: center;
             color: white;">
      <div class="overlay">
        <h3>${c.city}</h3>
        <p>${c.temp}°C · ${c.condition}</p>
        <button class="save">Save</button>
      </div>
    </article>
  `).join("");

  renderSaved();
}

function renderSaved() {
  document.querySelector("#saved").innerHTML = state.saved.map(c => `
    <div data-id="${c.id}">
      ${c.city} (${c.temp}°C)
      <button class="delete">Delete</button>
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
  if (fav) state.saved = state.saved.filter(f => f.id !== id);
  else state.saved.push({ ...city });
  save();
  render();
});
document.querySelector("#search").addEventListener("input", e => {
  state.search = e.target.value;
  render();
});


function save() {
  localStorage.setItem("ethiopiaWeatherSaved", JSON.stringify(state.saved));
}

function load() {
  const s = localStorage.getItem("ethiopiaWeatherSaved");
  if (s) state.saved = JSON.parse(s);
}

async function init() {
  load();
  await loadCities();
}
init();
