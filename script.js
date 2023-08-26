
const addBtn = document.querySelector("#add-btn");
const taskInput = document.querySelector("#wrapper input");
const taskContainer = document.querySelector("#tasks");
const error = document.querySelector("#error");
const pendingValue = document.querySelector(".pending-value");
const totalValue = document.querySelector(".total-value");

const displayCount = () => {
    let taskcount = 0;
    Tasks.forEach((task) => {
        if( task.iscomplete == false){
            taskcount++;
        }
    });
    
    pendingValue.innerHTML = taskcount;
    totalValue.innerHTML = Tasks.length;
}

// localStorage.removeItem('tasks');
let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(Tasks);

let taskCount = parseInt(Tasks.length);

if( taskCount >0){
    Tasks.forEach(Task => {
        createTask(Task);
    });
    displayCount();
}

const addTask = () => {

    const taskName = taskInput.value.trim();
    error.style.display = "block";

    if( !taskName ){
        setTimeout ( () => {
            error.style.display = "none";
        }, 1500);
        return;
    }

    error.style.display = "none";

    const Task = {
        id:new Date().getTime(),
        name:taskName,
        iscomplete:false
    }

    // console.log(Task);
    Tasks.push(Task);
    console.log(Tasks);
    localStorage.setItem('tasks', JSON.stringify(Tasks));

    createTask(Task);
    displayCount();
}

function createTask( Task){

    const taskElement = `<div class="task ${ Task.iscomplete ? "completed" : ""}" id="${Task.id}">
        <input type="checkbox" class="task-check" ${ Task.iscomplete ? "checked" : ""}>
        <span class="taskname" ${ !Task.iscomplete ? "contenteditable " : ""}>
            ${Task.name}
        </span>
        <button class="delete">
            <i class="del fa-solid fa-trash"></i>
        </button>
    </div>`;

    taskContainer.insertAdjacentHTML("beforeend",taskElement);
}

taskContainer.addEventListener("click", (e)=>{
    if( e.target.classList.contains("task-check")){
        
        const task = e.target.parentElement;
        const taskId = task.id;
        console.log(task,taskId);
        const checkbox = task.querySelector("input");

        Tasks.forEach( (task) =>{
            if( task.id == taskId){
                task.iscomplete = checkbox.checked;
            }
        });

        localStorage.setItem("tasks", JSON.stringify(Tasks));

        // console.log(task);
        displayCount();
        window.location.reload();
    }
});

addBtn.addEventListener("click",addTask);

taskContainer.addEventListener("click", (e)=>{
    if( e.target.classList.contains("delete")){
        const taskId = e.target.parentElement.id;
        console.log(taskId);
        e.target.parentElement.remove();

        removeTask(taskId);
    }
});


function removeTask(taskId) {
    Tasks = Tasks.filter( (task) => task.id != taskId);

    localStorage.setItem("tasks",JSON.stringify(Tasks));
    displayCount();
}
