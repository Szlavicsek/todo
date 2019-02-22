const inputField = document.querySelector("#input");
const filterField = document.querySelector("#filter");
const figureDiv = document.querySelector("#figureDiv");
const todoList = document.querySelector("ul");
const todoItem = document.querySelector(".item");
const removeButton = document.querySelector(".close");
const clearAllButton = document.querySelector(".clear-all")
const body = document.querySelector("body")
const switchButton = document.querySelector('.switch-button');
const switchBtnRight = document.querySelector('.switch-button-case.right');
const switchBtnLeft = document.querySelector('.switch-button-case.left');
const activeSwitch = document.querySelector('.active');

document.addEventListener("DOMContentLoaded", function() {
  let tasks
  if (!localStorage.getItem("tasks")) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"))
  }
  tasks.forEach(function(task) {
    const newLi = document.createElement("div");
    newLi.innerHTML = `<li class="item">${task}<i class="close ion-close-round"></i></li>`
    todoList.appendChild(newLi.children[0]);
    clearButtonVisibility()
  })
})

switchBtnLeft.addEventListener('click', function() {
  if (inputField.value) {
    createNewElement(inputField.value)
  }
  switchToAddMode();
  filterField.value = null
}, false);

switchBtnRight.addEventListener('click', function() {
  switchToFilterMode();
}, false);

inputField.addEventListener("keypress", function(e) {
  if (e.code === "Enter" && inputField.value) {
    createNewElement(inputField.value)
  }
});

todoList.addEventListener("click", function(e) {
  if (e.target.classList.contains("close")) {
    e.target.parentElement.remove();
    removeElement(e.target.parentElement.textContent);
    clearButtonVisibility()
  }
});

clearAllButton.addEventListener("click", function() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild)
  }
  localStorage.clear()
  clearButtonVisibility()
});

filterField.addEventListener("input", function(e) {
  const text = e.target.value.toLowerCase();
  const allTodoItems = document.querySelectorAll(".item")
  allTodoItems.forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block"
    } else {
      task.style.display = "none"
    }
  })
})

//********************************************************

function createNewElement(task) {
  const newLi = document.createElement("div");
  newLi.innerHTML = `<li class="item">${task}<i class="close ion-close-round"></i></li>`
  todoList.appendChild(newLi.children[0]);
  storeTask(task)
  inputField.value = null;
  clearButtonVisibility();
}

function removeElement(storedEl) {
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach(function(task, index) {
    if (task === storedEl) {
      tasks.splice(index, 1)
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function storeTask(val) {
  let tasks
  if (!localStorage.getItem("tasks")) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(val);
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

function clearButtonVisibility() {
  if (todoList.childNodes.length < 2) {
    clearAllButton.classList = "clear-all hidden"
  } else {
    clearAllButton.classList = "clear-all"
  }
}

function switchToAddMode() {
  if (switchBtnRight.classList.contains("active-case")) {
    inputField.style.transform = "rotateX(0deg) translate3d(0, 0, 30px)"
    filterField.style.transform = "rotateX(90deg) translate3d(0, 0, 30px)";
    inputField.focus();
  }
  switchBtnRight.classList.remove('active-case');
  switchBtnLeft.classList.add('active-case');
  activeSwitch.style.left = '0%';
}

function switchToFilterMode() {
  if (!switchBtnRight.classList.contains("active-case")) {
    filterField.focus();
    inputField.style.transform = "rotateX(-90deg) translate3d(0, 0, 30px)"
    filterField.style.transform = "rotateX(0deg) translate3d(0, 0, 30px)";
    inputField.value = null
  }
  switchBtnRight.classList.add('active-case');
  switchBtnLeft.classList.remove('active-case');
  activeSwitch.style.left = '50%';
}