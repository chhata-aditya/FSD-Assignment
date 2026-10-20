/**
 * Daily Task Flow
 * Author: Chhata
 * Minimalist to-do tracker with clean local storage hooks
 */

const form = document.getElementById("taskForm");
const inputField = document.getElementById("taskInput");
const taskContainer = document.getElementById("taskList");
const counterEl = document.getElementById("counter");
const emptyNotice = document.getElementById("emptyMsg");

let activeTasks = readTasks();

function readTasks() {
  try {
    const data = localStorage.getItem("chhata_flow_tasks");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function writeTasks() {
  try {
    localStorage.setItem("chhata_flow_tasks", JSON.stringify(activeTasks));
  } catch (e) {
    console.error("Local storage error", e);
  }
}

function insertTask(content) {
  const item = {
    id: `chhata_${Date.now()}`,
    text: content,
    done: false
  };
  activeTasks.unshift(item);
  writeTasks();
  paintTasks();
}

function toggleItem(id) {
  activeTasks = activeTasks.map((t) =>
    t.id === id ? { ...t, done: !t.done } : t
  );
  writeTasks();
  paintTasks();
}

function removeItem(id) {
  activeTasks = activeTasks.filter((t) => t.id !== id);
  writeTasks();
  paintTasks();
}

function paintTasks() {
  taskContainer.innerHTML = "";

  activeTasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = `task-item ${t.done ? "completed" : ""}`;

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.className = "task-checkbox";
    cb.checked = t.done;
    cb.addEventListener("change", () => toggleItem(t.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = t.text;

    const del = document.createElement("button");
    del.className = "btn-remove";
    del.innerHTML = "&times;";
    del.title = "Delete task";
    del.addEventListener("click", () => removeItem(t.id));

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(del);
    taskContainer.appendChild(li);
  });

  const total = activeTasks.length;
  const unfinished = activeTasks.filter((t) => !t.done).length;

  if (total === 0) {
    counterEl.textContent = "All Done";
    emptyNotice.style.display = "block";
  } else {
    counterEl.textContent = `${unfinished} of ${total} remaining`;
    emptyNotice.style.display = "none";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = inputField.value.trim();
  if (!val) return;
  insertTask(val);
  inputField.value = "";
});

paintTasks();
