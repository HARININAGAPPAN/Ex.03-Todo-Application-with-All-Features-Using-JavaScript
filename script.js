
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskName = input.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    let task = {
        id: Date.now(),
        text: taskName,
        completed: false
    };

    tasks.push(task);
    input.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "completed") {
            return task.completed;
        }

        if (currentFilter === "pending") {
            return !task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;
        span.className = task.completed
            ? "task-text completed"
            : "task-text";

        let actions = document.createElement("div");
        actions.className = "task-actions";

        let completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed
            ? "Undo"
            : "Done";

        completeBtn.onclick = () => toggleTask(task.id);

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";
        deleteBtn.onclick = () => deleteTask(task.id);

        actions.appendChild(completeBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateCount();
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    displayTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    displayTasks();
}

function showTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

function clearCompleted() {
    tasks = tasks.filter(task => !task.completed);

    saveTasks();
    displayTasks();
}

function updateCount() {
    let pending = tasks.filter(task => !task.completed).length;

    document.getElementById("taskCount").textContent =
        "Pending Tasks: " + pending;
}

document.getElementById("taskInput").addEventListener(
    "keypress", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    }
);

displayTasks();
