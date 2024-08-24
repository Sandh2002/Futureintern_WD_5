/* script.js */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        isCompleted: false,
        createdAt: new Date().toLocaleString()
    };

    addTaskToDOM(task);

    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = task.isCompleted ? document.getElementById('completedTasks') : document.getElementById('pendingTasks');

    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', task.id);
    taskItem.className = task.isCompleted ? 'completed' : '';

    taskItem.innerHTML = `
        ${task.text} 
        <span class="task-buttons">
            ${task.isCompleted ? '' : `<button class="complete" onclick="completeTask(${task.id})">Complete</button>`}
            <button class="edit" onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        </span>
    `;

    taskList.appendChild(taskItem);
}

function completeTask(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    taskItem.classList.add('completed');
    const taskText = taskItem.firstChild.textContent.trim();
    taskItem.remove();
    
    const task = {
        id: id,
        text: taskText,
        isCompleted: true,
        completedAt: new Date().toLocaleString()
    };

    addTaskToDOM(task);
}

function deleteTask(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    taskItem.remove();
}

function editTask(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    const taskText = prompt('Edit your task:', taskItem.firstChild.textContent.trim());

    if (taskText !== null && taskText.trim() !== '') {
        taskItem.firstChild.textContent = taskText.trim();
    }
}
