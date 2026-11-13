// Memuat daftar tugas dari localStorage saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTasks);
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
        addTaskToDOM(task.text, task.completed);
    });
}
// Menambahkan tugas ke dalam DOM dan localStorage
function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.if(taskText !== "") {
        addTaskToDOM(taskText, false);
    saveTaskToLocalStorage(taskText, false);
    taskInput.value = "";
}
}
// Menambahkan tugas ke dalam DOM
function addTaskToDOM(taskText, completed) {
    let li = document.createElement("li");
    li.textContent = taskText;
    li.className = completed ? "completed" : "";
    li.addEventListener("click", toggleTaskCompletion);
    li.addEventListener("contextmenu", deleteTask);
    document.getElementById("taskList").appendChild(li);
}
// Menambahkan event listener untuk menandai tugas selesai
li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateTaskInLocalStorage(taskText);
});
// Tombol untuk menghapus tugas
let deleteButton = document.createElement("button");
deleteButton.textContent = "Hapus";
deleteButton.addEventListener("click", function () {
    deleteTask(taskText, li);
});
li.appendChild(deleteButton);
document.getElementById("taskList").appendChild(li);