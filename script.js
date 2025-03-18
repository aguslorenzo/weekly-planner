"use strict"
async function loadTasks() {
    const response = await fetch("http://localhost:8080/tasks");
    const tasks = await response.json();

    tasks.forEach(task => {
        const dayElement = document.getElementById(task.day);
        if (dayElement) {
            const ul = dayElement.querySelector("ul");
            const li = document.createElement("li");
            li.textContent = task.text;
            li.classList.add("editable-li");
            ul.appendChild(li);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadTasks);

async function saveTask(day, text) {
    if (!text.trim()) return; // No guardar tareas vacías

    await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day, text })
    });
}
document.querySelectorAll(".day").forEach(day => {
    day.addEventListener("click", async(e) => {
        if (e.target.tagName === "LI") {
            return;
        }
        const ul = day.querySelector("ul");
        const li = document.createElement("li");
        li.contentEditable = "true";
        
        ul.appendChild(li);
        li.focus();
        li.classList.add("editable-li");

        
        li.addEventListener("keydown", async (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (li.textContent.trim().length > 0) {
                    li.blur();
                    await saveTask(day.id, li.textContent.trim()); 
                } else {
                    ul.removeChild(li);
                }
            }
        });
        
        //si queda el li vacío lo elimina
        li.addEventListener("blur", async () => {
            if (li.textContent.trim().length === 0) {
                ul.removeChild(li);
            } else {
                await saveTask(day.id, li.textContent.trim());
            }
        });
    });
});

//Editar si se hace click en un li
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("editable-li")) {
        e.target.contentEditable = "true";
        e.target.focus();
    }
});
