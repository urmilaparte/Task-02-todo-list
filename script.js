// Task List App Logic

document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');

    // Add task on button click or Enter key
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return;
        
        const taskItem = createTaskItem(taskText);
        taskList.prepend(taskItem);
        taskInput.value = '';
        taskInput.focus();
        
        updateTaskCount();
    }

    function createTaskItem(text) {
        // Create elements
        const item = document.createElement('div');
        item.className = 'task-item';

        const status = document.createElement('button');
        status.className = 'task-status incomplete';
        status.setAttribute('aria-label', 'Mark as complete');
        status.innerHTML = '<i class="fa-regular fa-circle"></i>';

        const content = document.createElement('div');
        content.className = 'task-content';
        const title = document.createElement('div');
        title.className = 'task-title';
        title.textContent = text;
        content.appendChild(title);

        const actions = document.createElement('div');
        actions.className = 'task-actions';
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-btn';
        delBtn.setAttribute('aria-label', 'Delete task');
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        actions.appendChild(delBtn);

        // Assemble
        item.appendChild(status);
        item.appendChild(content);
        item.appendChild(actions);

        // Event: Complete toggle
        status.addEventListener('click', function () {
            item.classList.toggle('completed');
            if (item.classList.contains('completed')) {
                status.className = 'task-status complete';
                status.innerHTML = '<i class="fa-solid fa-check"></i>';
                status.setAttribute('aria-label', 'Mark as incomplete');
            } else {
                status.className = 'task-status incomplete';
                status.innerHTML = '<i class="fa-regular fa-circle"></i>';
                status.setAttribute('aria-label', 'Mark as complete');
            }
        });

        // Event: Delete
        delBtn.addEventListener('click', function () {
            item.classList.add('removing');
            setTimeout(() => {
                item.remove();
                updateTaskCount();
            }, 300);
        });

        return item;
    }

    function updateTaskCount() {
        const totalTasks = taskList.children.length;
        const completedTasks = taskList.querySelectorAll('.task-item.completed').length;
        
        if (totalTasks === 0) {
            taskCount.textContent = '0 tasks';
        } else if (completedTasks === 0) {
            taskCount.textContent = `${totalTasks} task${totalTasks !== 1 ? 's' : ''}`;
        } else {
            taskCount.textContent = `${completedTasks}/${totalTasks} completed`;
        }
    }

    // Initialize task count
    updateTaskCount();
});
