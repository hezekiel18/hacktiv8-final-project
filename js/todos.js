document.addEventListener("DOMContentLoaded", function () {
  loadTodos();
});

const addTodo = (event) => {
  event.preventDefault();
  var todoInput = document.getElementById("todoInput");
  var todoList = document.getElementById("todoList");
  const todoId = `todo-${Date.now()}`;

  if (todoInput.value.trim() === "") {
    alert("Please enter a valid to-do");
    return;
  }

  //   todo card
  var todoCard = document.createElement("div");
  todoCard.className = "card my-2 rounded-4";

  var todoBody = document.createElement("div");
  todoBody.className =
    "card-body d-flex justify-content-between align-items-center";
  todoCard.appendChild(todoBody);

  //   todo label
  var label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = todoId;
  label.textContent = todoInput.value;

  var checkboxContainer = document.createElement("div");
  checkboxContainer.className = "form-check";

  //   todo checkbox
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "form-check-input";
  checkbox.checked = false;
  checkbox.id = todoId;
  checkbox.onclick = () => {
    label.classList.toggle("text-decoration-line-through", checkbox.checked);
    saveTodos();
  };

  // delete icon
  var deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-link";
  var icon = document.createElement("i");
  icon.className = "text-danger fa-solid fa-delete-left";
  deleteButton.appendChild(icon);

  deleteButton.onclick = () => {
    todoList.removeChild(todoCard);
    saveTodos();
  };

  checkboxContainer.appendChild(checkbox);
  checkboxContainer.appendChild(label);

  todoBody.appendChild(checkboxContainer);
  todoBody.appendChild(deleteButton);

  todoList.appendChild(todoCard);

  saveTodos();
  todoInput.value = "";
};

const saveTodos = () => {
  var todoList = document.getElementById("todoList");
  var todos = [];

  todoList.childNodes.forEach(function (todoCard) {
    var todoText = todoCard.querySelector("label").textContent;
    var todoId = todoCard.querySelector("input").id;
    var isChecked = todoCard
      .querySelector("label")
      .classList.contains("text-decoration-line-through");
    todos.push({ text: todoText, checked: isChecked, id: todoId });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  var todoList = document.getElementById("todoList");
  var storedTodos = localStorage.getItem("todos");

  if (storedTodos) {
    var todos = JSON.parse(storedTodos);

    todos.forEach(function (todo) {
      //   todo card
      var todoCard = document.createElement("div");
      todoCard.className = "card my-2 rounded-4";

      var todoBody = document.createElement("div");
      todoBody.className =
        "card-body d-flex justify-content-between align-items-center";
      todoCard.appendChild(todoBody);

      var checkboxContainer = document.createElement("div");
      checkboxContainer.className = "form-check";

      //   todo label
      var label = document.createElement("label");
      label.className = "form-check-label";
      label.textContent = todo.text;
      label.htmlFor = todo.id;

      //   todo checkbox
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "form-check-input";
      checkbox.checked = todo.checked;
      checkbox.id = todo.id;
      checkbox.onclick = function () {
        label.classList.toggle(
          "text-decoration-line-through",
          checkbox.checked
        );
        saveTodos();
      };

      if (todo.checked) {
        label.classList.add("text-decoration-line-through");
      }

      // delete icon
      var deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-link";
      var icon = document.createElement("i");
      icon.className = "text-danger fa-solid fa-delete-left";
      deleteButton.appendChild(icon);

      deleteButton.onclick = () => {
        todoList.removeChild(todoCard);
        saveTodos();
      };

      checkboxContainer.appendChild(label);
      checkboxContainer.appendChild(checkbox);

      todoBody.appendChild(checkboxContainer);
      todoBody.appendChild(deleteButton);

      todoList.appendChild(todoCard);
    });
  }
};
