
const state = {
  base: "ETB",
  rates: {},
  watchlist: [],
  amount: 100,
  currency: "USD",
};

const API = "https://open.er-api.com/v6/latest/ETB";
const status = document.querySelector("#status");
const select = document.querySelector("#currency");
const form = document.querySelector("#convert-form");
const amount = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchUI = document.querySelector("#watchlist");

async function loadRates() {
  status.textContent = "Loading rates…";
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    state.rates = data.rates;
    status.textContent = "";
    render();
  } catch (err) {
    status.textContent = "Could not load rates.";
    console.error(err);
  }
}

function render() {
  const codes = Object.keys(state.rates);
  if (codes.length === 0) {
    select.innerHTML = "<option>Loading...</option>";
    return;
  }
  select.innerHTML = codes.map(c => `<option>${c}</option>`).join("");
  select.value = state.currency;
  renderWatchlist();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (Object.keys(state.rates).length === 0) {
    result.textContent = "Rates not loaded yet.";
    return;
  }

  const amt = Number(amount.value);
  const valid = /^\d+(\.\d{1,2})?$/.test(amount.value);
  if (!valid || !amt || amt <= 0) {
    result.textContent = "Enter a valid amount.";
    return;
  }

  state.currency = select.value;
  const rate = state.rates[state.currency];
  const out = (amt * rate).toFixed(2);
  result.textContent = `${amt} ${state.base} = ${out} ${state.currency}`;

  if (!state.watchlist.includes(state.currency)) {
    state.watchlist.push(state.currency);
    save();
    renderWatchlist();
  }
});

function renderWatchlist() {
  if (state.watchlist.length === 0) {
    watchUI.innerHTML = "<li>No currencies yet</li>";
    return;
  }
  watchUI.innerHTML = state.watchlist.map(c => {
    const r = state.rates[c];
    return `<li data-c="${c}">1 ${state.base} = ${r} ${c}
      <button class="rm">Delete</button></li>`;
  }).join("");
}

watchUI.addEventListener("click", (e) => {
  if (!e.target.matches(".rm")) return;
  const c = e.target.closest("li").dataset.c;
  state.watchlist = state.watchlist.filter(x => x !== c);
  save();
  renderWatchlist();
});

const KEY = "birrwatch";
function save() {
  localStorage.setItem(KEY, JSON.stringify({
    watchlist: state.watchlist,
    currency: state.currency,
  }));
}
function load() {
  const saved = localStorage.getItem(KEY);
  if (saved) {
    try {
      Object.assign(state, JSON.parse(saved));
    } catch (err) {
      console.error("Corrupted saved data:", err);
    }
  }
}

async function init() {
  load();           
  await loadRates(); 
}
init();
