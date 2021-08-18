// Define UI Vars

const taskInput = document.querySelector('#exampleFormControlInput1');

const taskAddBtn = document.querySelector('.btn.btn-outline-success.btn-sm');

const taskFilter = document.querySelector('#exampleFormControlInput2');

const taskDeleteAll = document.querySelector('#delete-all');

const taskCollection = document.querySelector('#task-collection');

// Load all events
loadEventListener()


// Load all events function
function loadEventListener(){
    // add task
    taskAddBtn.addEventListener('click', addTask);
    // add task with enter key
    taskInput.addEventListener("keyup", enterTask);
    // delete single task
    taskCollection.addEventListener("click", removeTask);
    // delete all tasks
    taskDeleteAll.addEventListener("click", removeAllTasks);
    // filter tasks
    taskFilter.addEventListener("keyup", filterTasks);
}

// add item on click function

function addTask(event) {
    if (taskInput.value === "") {
        showAlert("Please enter a task", "alert-danger");
    } else {
        //create table raw for task
        const taskRaw = document.createElement('tr');
        const task = document.createElement('th');
        const taskDelete = document.createElement('th');
        // adding task to table
        task.classList = "task-element";
        task.innerHTML = `${taskInput.value}`;
        taskDelete.classList= 'left-btn'
        taskDelete.innerHTML = `<button type="button" class="btn btn-outline-danger delete"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg> Delete</button>`
        taskRaw.appendChild(task);
        taskRaw.appendChild(taskDelete);
        taskCollection.appendChild((taskRaw));
        taskDeleteAll.disabled = false;
        taskInput.value = "";
    }
    event.preventDefault()
}

// make tasks adable woith enter key function
function enterTask(event) {
    if (event.key == "Enter") {
        taskAddBtn.click();
    }
    event.preventDefault();
}

// remove choosen task function

function removeTask(event) {
    if(event.target.classList.contains('delete')) {
        event.target.parentElement.parentElement.remove();
        showAlert(`Task ${event.target.parentElement.parentElement.firstChild.innerHTML} deleted`, 'alert-success');
    }
}

//remove all tasks 

function removeAllTasks() {
    while(taskCollection.firstChild) {
        taskCollection.removeChild(taskCollection.firstChild);
    }
    showAlert("All tasks deleted", "alert-success");
    taskDeleteAll.disabled = true;
}

// validation alert function

function showAlert(message, className) {
    //create a new alert element
    const alert = document.createElement('div');
    //add the alert class
    alert.className = `alert ${className}`;
    //add the message
    alert.innerHTML = message;
    //append the alert to the body
    const container = document.querySelector('.border');
    container.appendChild(alert);
    //remove the alert after 3 seconds
    setTimeout(() => { container.removeChild(alert); }, 3000);
}
// task filter function 

function filterTasks(event) {
    const text = event.target.value.toLowerCase();
    const tasks = taskCollection.querySelectorAll('.task-element');
    tasks.forEach(function(task) {
        if(task.innerHTML.toLowerCase().indexOf(text) > -1) {
            task.parentElement.style.display = 'table-row';
        } else {
            task.parentElement.style.display = 'none';
        }
    });
}