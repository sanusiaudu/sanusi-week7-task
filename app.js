const todaysDate = document.getElementById("todays-date")
const taskCount = document.querySelector(".task-counter")
const taskArticle = document.querySelector(".task-article")
const inputArticle = document.getElementById("input-article")
const inputForm = document.querySelector(".input-form")
const taskInput = document.getElementById("task-input")
const addTaskBtn = document.querySelector(".add-task-btn")
const addBtn = document.getElementById("add-btn")
const closeBtn = document.getElementById("close-btn")
5
// set date
const date = new Date()
const day = date.toDateString().slice(0, 3)
const restOfDate = date.toDateString().slice(3)

todaysDate.innerHTML = `${day},${restOfDate}`
taskCounter()

// Add new task feature
addTaskBtn.addEventListener("click", () => {
  inputForm.classList.remove("display")
  addTaskBtn.classList.add("display")
})

// Task Input
inputForm.addEventListener("submit", addTask)

function inputButtonEvents() {
  //  Task Add Button
  addBtn.addEventListener("click", addTask)

  // Task Close Button
  closeBtn.addEventListener("click", (e) => {
    e.preventDefault()
    setToDefault()
  })
}

inputButtonEvents()

function addTask(e) {
  e.preventDefault()
  // Update task count
  let task = taskInput.value
  if (task !== "") {
    const newTask = document.createElement("section")
    newTask.classList.add("single-task")
    task = task.charAt(0).toUpperCase() + task.slice(1)
    newTask.innerHTML = `
    <article class="task-holder">
      <article class="task">
        <figure class="check-icon">
            <img class="check-img" src="./img/tick.png" alt="check icon">
        </figure>
        <div>
            <p class="message">${task}</p>
            <figure>
                <img class="edit-btn" src="./img/edit.png" alt="edit icon">
                <img class="delete-btn" src="./img/delete.png" alt="delete icon">
            </figure>
        </div>
      </article>
      <hr>
    </article>
    `

    // Update DOM Elements
    taskInput.textContent = ""
    taskArticle.appendChild(newTask)
    setToDefault()

    const editBtn = newTask.querySelector(".edit-btn")
    const deleteBtn = newTask.querySelector(".delete-btn")
    const checkIcon = newTask.querySelector(".check-icon")

    editBtn.addEventListener("click", editTask)
    deleteBtn.addEventListener("click", deleteTask)
    checkIcon.addEventListener("click", checkTask)
  }
}

// set task counter
function taskCounter() {
  const tasks = document.querySelectorAll(".single-task")
  let isS
  if (tasks.length > 1 || tasks.length == 0) {
    isS = "s"
  } else {
    isS = ""
  }
  taskCount.textContent = `You have ${tasks.length} task${isS}`
}

setInterval(taskCounter, 1)

function editTask(e) {
  const element =
    e.currentTarget.parentElement.parentElement.parentElement.parentElement
      .parentElement

  const editItem = document.createElement("article")
  const task = element.querySelector(".message")
  addTaskBtn.classList.add("display")

  editItem.innerHTML = `
    <article id="input-article">
        <form class="edit-form display">
            <input class="edit-input" type="text" value="${task.innerHTML}" placeholder="task">
            <figure>
                <button id="add-btn" class=" add-btn item-btns" type="submit">
                    <img class="add-btn" src="./img/plus.png" alt="add button">
                </button>
                <button id="close-btn" class=" close-btn item-btns" type="submit">
                    <img class="delete-btn" src="./img/close.png" alt="close button">
                </button>
            </figure>
        </form>
    </article>
  `
  element.appendChild(editItem)
  const editForm = element.querySelector(".edit-form")
  const mainTask = element.querySelector(".task-holder")
  const editInput = element.querySelector(".edit-input")

  editForm.classList.remove("display")
  mainTask.classList.add("display")

  const editAddBtn = element.querySelector(".add-btn")
  const editCloseBtn = element.querySelector(".close-btn")

  editAddBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (editInput.value !== "") {
      let editText = editInput.value
      editText = editText.charAt(0).toUpperCase() + editText.slice(1)
      task.innerHTML = editText
      setToDefault()
      editForm.classList.add("display")
      mainTask.classList.remove("display")
    }
  })

  editCloseBtn.addEventListener("click", (e) => {
    e.preventDefault()
    setToDefault()
    editForm.classList.add("display")
    mainTask.classList.remove("display")
  })
}

function deleteTask(e) {
  const item =
    e.currentTarget.parentElement.parentElement.parentElement.parentElement
      .parentElement
  taskArticle.removeChild(item)
  taskCounter()
  setToDefault()
}

function checkTask(e) {
  const element = e.currentTarget
  const messageTag = element.nextSibling.nextSibling.firstChild.nextSibling
  setTimeout(() => {
    messageTag.classList.add("check-task")
  }, 200)

  setTimeout(() => {
    taskArticle.removeChild(element.parentElement.parentElement.parentElement)
  }, 1000)
}

function setToDefault() {
  taskInput.value = ""
  inputForm.classList.add("display")
  addTaskBtn.classList.remove("display")
}