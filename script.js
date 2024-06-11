const tasks = []

const ul = document.createElement("ul");

ul.setAttribute("reversed", "");

fetch("data.json")
    .then(response => response.json())
    .then(data => {
        data.forEach(task => {
            tasks.push(task);
            const li = document.createElement("li");
            const txt = document.createTextNode(task.taskName);
            li.appendChild(txt);
            ul.appendChild(li);
        });
    });

const listContainer = document.querySelector(".list-items");
listContainer.appendChild(ul);

console.log(tasks);

function updateTasks() {
    const task = document.querySelector("#listInput").value;
    if (task != ""){
        const taskObj = { "taskName": task };
        tasks.push(taskObj);

        const li = document.createElement("li");
        const txt = document.createTextNode(task);
        li.appendChild(txt);
        
        if (ul.firstChild) {
            ul.insertBefore(li, ul.firstChild);
        } else {
            ul.appendChild(li);
        }

        let jsonStr = JSON.stringify(tasks);
        console.log(jsonStr);
    }
}
function downloadTasks() {
    const jsonStr = JSON.stringify(tasks);

    const file = new Blob([jsonStr], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'data.json';
    a.click();

    URL.revokeObjectURL(url);
}