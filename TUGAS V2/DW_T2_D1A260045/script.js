document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) return; // bukan halaman manajemen

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.id, task.text, task.completed));

    document.getElementById("addBtn")?.addEventListener("click", addTask);
    document.getElementById("taskInput")?.addEventListener("keypress", e => {
        if (e.key === "Enter") addTask();
    });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const id = Date.now().toString(); // ID unik
    addTaskToDOM(id, taskText, false);
    saveTask({ id, text: taskText, completed: false });
    taskInput.value = "";
}

function addTaskToDOM(id, taskText, completed) {
    const li = document.createElement("li");
    li.textContent = taskText;
    li.className = completed ? "completed" : "";

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        toggleTask(id);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Hapus";
    delBtn.addEventListener("click", e => {
        e.stopPropagation(); // jangan trigger toggle
        deleteTask(id, li);
    });

    li.appendChild(delBtn);
    document.getElementById("taskList").appendChild(li);
}

function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function toggleTask(id) {
    const tasks = getTasks().map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function deleteTask(id, el) {
    const tasks = getTasks().filter(t => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    el.remove();
}