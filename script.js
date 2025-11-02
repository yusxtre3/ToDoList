document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  loadTasks();

  addBtn.addEventListener("click", addTask);

  // Görev ekleme
  function addTask() {
    const task = taskInput.value.trim();
    if (task === "") {
      alert("Lütfen bir görev gir!");
      return;
    }

    const li = document.createElement("li");
    li.textContent = task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Sil";
    delBtn.classList.add("delete");
    li.appendChild(delBtn);

    taskList.appendChild(li);
    saveTask(task);
    taskInput.value = "";
  }

  // Görev silme
  taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const li = e.target.parentElement;
      removeTask(li.firstChild.textContent.trim());
      li.remove();
    }
  });

  // LocalStorage’a kaydetme
  function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // LocalStorage’dan silme
  function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter((t) => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // LocalStorage’dan yükleme
  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Sil";
      delBtn.classList.add("delete");
      li.appendChild(delBtn);

      taskList.appendChild(li);
    });
  }
});