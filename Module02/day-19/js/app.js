// TODO: Hold items in an array (this is your single source of truth)
let items = [];
function saveItems() {
  localStorage.setItem("items", JSON.stringify(items));
}

function loadItems() {
  const stored = localStorage.getItem("items");
  if (stored) {
    items = JSON.parse(stored);
  }
}
// TODO: Select necessary DOM elements (form, input, list, count)
const form = document.querySelector("#add-form");
const input = document.querySelector("#item-input");
const list = document.querySelector("#item-list");
const count = document.querySelector("#item-count");
loadItems();
render();
// TODO: Write a render() function to rebuild the list from the array
function render() {
// 1. Clear the current list (innerHTML = "")
  list.innerHTML = "";
// 2. Loop through the items array
    items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item.name;
    li.dataset.id = index;
// 3. Create elements, use data-id on each row, and append to the list
        if (item.done) {
      li.classList.add("done");
    }
      const removeBtn = document.createElement("button");
    removeBtn.textContent = "❌";
    removeBtn.classList.add("remove");
    li.appendChild(removeBtn);
      list.appendChild(li);
  });
// 4. Update the live count paragraph
  const remaining = items.filter(item => !item.done).length;   
  count.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} remaining`;
}
  // Logic goes here...
// TODO: Handle form submission

form.addEventListener("submit", (event) => {
// 1. preventDefault to stop page reload
  event.preventDefault(); 
// 2. Read and validate the input
  const name = input.value.trim();
  if (name === "") return;
// 3. Push a new object to the items array (include a unique id and done: false)
  items.push({
    name: name,
    done: false
  });

  input.value = "";
// 4. Call render()
  saveItems();
  render();
});

// TODO: Set up event delegation on the #list
// 1. Listen for clicks on the parent <ul>
list.addEventListener("click", (e) => {
  const li = e.target.closest("li");
// 2. Use e.target and closest() to find the clicked row
  if (!li) return;
  const index = li.dataset.id;
// 3. Determine if the user is toggling ".done" or removing a row
  if (e.target.classList.contains("remove")) {
      items.splice(index, 1);
  } else {
      items[index].done = !items[index].done;
  }
// 4. Update the items array accordingly
// 5. Call render()
  saveItems();
  render();
});











