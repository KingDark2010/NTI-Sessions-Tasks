// declaration of global vars
const showHidebtn = document.querySelector('#showHidebtn button')
const addBtn = document.querySelector('#add-btn')
const myForm = document.querySelector('#myForm')
const formData = document.querySelector('#myForm form')
const tasksWrap = document.querySelector('#content-wrapper .row ')
const taskTitle = document.querySelector('#task-title')
const taskContent = document.querySelector('#task-content')
const taskType = document.querySelector('#task-type')

// helper functions
const getTasks = () =>{
    tasks = localStorage.getItem('tasks') || '[]'
    return JSON.parse(tasks)
}

const setTasks = (tasks) =>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

showHideEvent = function(e){
    myForm.classList.toggle('d-none')
    if(e.target) this.innerText === "show form"?  this.innerText = "hide form" : this.innerText = "show form"
    else{ e.innerText="show form" }
}

taskData = function(task){
    task[taskTitle.name] = taskTitle.value
    task[taskContent.name] = taskContent.value
    task[taskType.name] = taskType.value
    return task
}

taskUI = function(task){
    //create a new div elment
    const taskDiv = document.createElement('div')
    //add class col-4 to the div
    taskDiv.className = `col-4 ${task.id}`
    taskDiv.innerHTML = `  <div class="m-3 border border-primary border-3 p-2 bg-danger text-white">
                        <h3>${task[taskTitle.name]}</h3>
                        <p>${task[taskContent.name]}</p><button class="btn btn-warning delete">delete</button><button class="btn btn-success edit">edit</button>
                        </div>`;
    tasksWrap.appendChild(taskDiv)
}

loadTasks = function(){
    tasksWrap.innerText=""
    tasks = getTasks();
    if (tasks.length == 0) {
        tasksWrap.innerHTML = '<div class="alert alert-danger" role="alert">No Tasks Found</div>'
    }else {
        tasks.forEach(task => taskUI(task))
    }
}

addTask = function(e){
    e.preventDefault()
    let task = { status:false, id : new Date().getTime()}
    taskData(task)
    taskUI(task)
    const tasks = getTasks();
    tasks.push(task);
    setTasks(tasks);
    formData.reset();
    showHideEvent(showHidebtn)
    loadTasks()
}

deleteTask =function(e){
    tasks = getTasks();
    if(e.target.classList.contains('delete')){ 
        tasks.splice(tasks.indexOf(e.target.parentElement.parentElement.parentElement.dataset.id),1)
        setTasks(tasks)
        loadTasks()
    }
}

editTask = function(e){
    tasks = getTasks();
    if(e.target.classList.contains('edit')){
        console.log(e.target)
        let myID = e.target.parentElement.parentElement.classList[1]
        let myIndex ;
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].id === Number(myID)){
                console.log(tasks[i])
                myIndex = i
            }
        }
        const taskDiv = document.createElement('div')
        taskDiv.className = `mb-3`
        taskDiv.innerHTML = `<button id="update-btn" type="submit" class="btn btn-primary">Update</button>`
        formData.appendChild(taskDiv)
        showHideEvent(showHidebtn)
        addBtn.className = 'd-none'
        taskTitle.value = tasks[myIndex][taskTitle.name]
        taskContent.value = tasks[myIndex][taskContent.name]
        taskType.value = tasks[myIndex][taskType.name]
        taskDiv.addEventListener('click', function(e){
            tasks[myIndex][taskTitle.name] = taskTitle.value
            tasks[myIndex][taskContent.name] = taskContent.value
            tasks[myIndex][taskType.name] = taskType.value
            setTasks(tasks)
            loadTasks()
            formData.reset()
            showHideEvent(showHidebtn)
            taskDiv.remove()
            addBtn.className = 'btn btn-success'
        })
        console.log(myIndex)
    }
}

showHidebtn.addEventListener('click', showHideEvent)
addBtn.addEventListener('click', addTask)
tasksWrap.addEventListener('click', deleteTask)
tasksWrap.addEventListener('click', editTask)

loadTasks()
