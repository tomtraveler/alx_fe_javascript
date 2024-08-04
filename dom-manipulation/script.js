
const addButton = document.getElementById("add-button");

addButton.addEventListener("click", function addItem() {
  const input = document.getElementById("input-text");
  const inputValue = input.value.trim();

  if (inputValue !== "") {
    const list = document.createElement("li");
    list.textContent = inputValue;

    const listContainer = document.getElementById("list-container");

    listContainer.appendChild(list);

    input.value = "";
  }
});
