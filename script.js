"use strict"
document.querySelectorAll(".day").forEach(day => {
    day.addEventListener("click", (e) => {
        if (e.target.tagName === "LI") {
            return;
        }
        const ul = day.querySelector("ul");

        const li = document.createElement("li");
        li.contentEditable = "true";
        
        ul.appendChild(li);
        li.focus();
        li.classList.add("editable-li");

        
        li.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                if (li.textContent.trim().length > 0) {
                    li.blur(); 
                } else {
                    ul.removeChild(li);
                }
            }
        });
        
        //si queda el li vacío lo elimina
        li.addEventListener("blur", () => {
            if (li.textContent.trim().length === 0) {
                ul.removeChild(li);
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
