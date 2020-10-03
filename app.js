console.log('testing');

//Define UI variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('.filter');
const taskInput = document.querySelector('#task');

//load all event listerners
loadEventListeners();

function loadEventListeners() {
    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks)
    //Add task form
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Remove all tasks
    clearBtn.addEventListener('click', removeAllTasks);
    // Filter Tasks
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    } 
    
    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center ';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element
        const link = document.createElement('button');
        link.className = 'btn delete-item';
        // Add icon html
        link.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>'
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('Add some task');
    }
    else {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item list-group-item d-flex justify-content-between align-items-center ';
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element
        const link = document.createElement('button');
        link.className = 'btn delete-item';
        // Add icon html
        link.innerHTML = '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/></svg>'
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);

        //Local storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";
        e.preventDefault();
    }
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task from Local Storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    } 

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);          
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?'))
            e.target.parentElement.parentElement.remove();

        //Remove from local storage
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
}
//Remove all tasks
function removeAllTasks(e) {
    if(confirm('Are you sure?'))
        taskList.remove();

    clearTasksFromLocalStorage();
    
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//Filtering tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.classList.add('d-flex');
            task.classList.remove('d-none');
            console.log(text);
        }
        else {
            task.classList.remove('d-flex');
            task.classList.add('d-none');
        }

            

    });

}


