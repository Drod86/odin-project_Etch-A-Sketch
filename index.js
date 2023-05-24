const BODY = document.querySelector("body");
BODY.innerHTML += `<button class="gridSize">Change the grid size here.</button><button class="clear">Clear</button>`;

let gridSize = 100;
const gridContainer = document.querySelector(".container");

const addGridItems = (num) => {
  let numItems = num * num;
  let items = "";
  for (let i = 1; i <= numItems; i++) {
    items = items.concat(`<div class="item item--${i}"></div>`);
  }
  return items;
};

gridContainer.innerHTML = addGridItems(gridSize);

const divs = document.querySelectorAll(".item");

divs.forEach((div) =>
  div.addEventListener("mouseover", () => {
    div.classList.add("black");
  })
);

const changeGridSize = () => {
  divs.forEach((div) => div.classList.remove("black"));
  gridSize = parseInt(
    prompt("Enter an number between 10 and 100 to resize the grid", ""),
    10
  );
  let isNum = typeof gridSize === "number" && gridSize <= 100 && gridSize >= 10;
  while (!isNum) {
    gridSize = parseInt(
      prompt(
        "Invalid entry --- Enter an number between 10 and 100 to resize the grid",
        ""
      ),
      10
    );
    isNum = typeof gridSize === "number" && gridSize <= 100 && gridSize >= 10;
  }
  addGridItems(gridSize);
  gridContainer.setAttribute(
    "style",
    `grid-template-columns: repeat(${gridSize}, 1fr);
  grid-template-rows: repeat(${gridSize}, 1fr);`
  );
};

const changeGridSizeBtn = document.querySelector(".gridSize");

changeGridSizeBtn.addEventListener("click", changeGridSize);

const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", () => {
  divs.forEach((div) => div.classList.remove("black"));
});
