const form = document.querySelector('form')
const input = document.querySelector('#inp')
const output = document.querySelector('#output')
const allFilterBtn = document.querySelector('#allFilter')
const completedFilterBtn = document.querySelector('#completedFilter')
const incompleteFilterBtn = document.querySelector('#incompleteFilter')

let imgDone = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
`

let imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`

let imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
`

let tasks = JSON.parse(localStorage.getItem('tasks')) || []
let currentFilter = 'all'

const API = 'https://jsonplaceholder.typicode.com/todos'
const getTasks = async () => {
    if (tasks.length) return;
    try {
        const req = await fetch(API);
        if (!req.ok) throw new Error('Failed to fetch tasks from API');
        const res = await req.json();
        tasks = res.slice(0, 10).map(task => ({
            id: task.id,
            name: task.title,
            completed: task.completed,
        }));
        saveToLocalStorage();
        renderToDos();
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
};


const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const addToDo = (e) => {
    e.preventDefault(); //предотвратить перезагружение страницы
    if (!input.value.trim().length) {
        alert("You didn't write anything!");
        return;
    }

    const dueDateInput = document.querySelector('#dueDate');
    const dueDate = dueDateInput.value ? new Date(dueDateInput.value) : null;

    if (!dueDate || dueDate < new Date()) {
        alert('Please select a valid future due date.');
        return;
    }

    const toDo = {
        id: tasks[tasks.length - 1]?.id + 1 || 1,
        name: input.value,
        completed: false,
        dueDate: dueDate.toISOString(),
    };

    tasks.push(toDo);
    saveToLocalStorage();
    renderToDos();
    input.value = '';
    dueDateInput.value = '';
};


const showAnimation = () => {
    const body = document.querySelector('body')
    if (!body.classList.contains('firework-bg')) {
        body.classList.add('firework-bg')

        for (let i = 0; i < 5; i++) {
            const firework = document.createElement('div')
            firework.className = 'firework'
            firework.style.left = `${Math.random() * 100}%`
            firework.style.top = `${Math.random() * 100}%`
            firework.style.animationDelay = `${Math.random() * 1}s`
            body.appendChild(firework)
            setTimeout(() => firework.remove(), 2000)
        }

        setTimeout(() => body.classList.remove('firework-bg'), 2000)
    }
}

const renderToDos = () => {
    output.innerHTML = '';
    let filteredTasks = tasks;

    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach((el, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.draggable = true;
        card.dataset.index = index;

        const now = new Date();
        const dueDate = new Date(el.dueDate);

        if (el.completed) {
            card.classList.add('done');
        } else if (dueDate < now) {
            card.classList.add('overdue');
        }

        const title = document.createElement('h2');
        const dueDateLabel = document.createElement('p');
        const btnsWrapper = document.createElement('div');
        const done = document.createElement('button');
        const edit = document.createElement('button');
        const trash = document.createElement('button');

        title.textContent = el.name;
        dueDateLabel.textContent = `Due: ${dueDate.toLocaleString()}`;
        done.innerHTML = imgDone;
        edit.innerHTML = imgEdit;
        trash.innerHTML = imgTrash;

        done.addEventListener('click', () => {
            el.completed = !el.completed;
            saveToLocalStorage();
            renderToDos();
        });

        edit.addEventListener('click', () => {
            const newName = prompt('Enter the new name', el.name);
            const newDueDate = prompt('Enter the new due date (YYYY-MM-DD HH:mm)', el.dueDate);
            if (newName && newName.trim().length && newDueDate) {
                el.name = newName.trim();
                el.dueDate = new Date(newDueDate).toISOString();
                saveToLocalStorage();
                renderToDos();
            }
        });

        trash.addEventListener('click', () => {
            const answer = confirm('Are you sure you want to delete this task?');
            if (answer) {
                tasks = tasks.filter(item => item.id !== el.id);
                saveToLocalStorage();
                renderToDos();
            }
        });

        btnsWrapper.append(done, edit, trash);
        card.append(title, dueDateLabel, btnsWrapper);
        output.append(card);

        card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.index);
            e.target.classList.add('dragging');
        });

        card.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });

    output.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingCard = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(output, e.clientY);
        if (afterElement == null) {
            output.appendChild(draggingCard);
        } else {
            output.insertBefore(draggingCard, afterElement);
        }
    });

    output.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingIndex = e.dataTransfer.getData('text/plain');
        const newIndex = [...output.children].findIndex(
            (child) => child === document.querySelector('.dragging')
        );

        const [movedTask] = tasks.splice(draggingIndex, 1);
        tasks.splice(newIndex, 0, movedTask);
        saveToLocalStorage();
        renderToDos();
    });
};

const getDragAfterElement = (container, y) => {
    const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
};


const notifyOverdueTasks = () => {
    const now = new Date();
    tasks.forEach(task => {
        if (!task.completed && new Date(task.dueDate) < now && !task.notified) {
            alert(`Task "${task.name}" is overdue!`);
            task.notified = true;
        }
    });
    saveToLocalStorage(); 
};  

setInterval(() => {
    notifyOverdueTasks();
    renderToDos();
}, 60000);

const updateFilterButtonStyles = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    if (currentFilter === 'all') allFilterBtn.classList.add('active');
    if (currentFilter === 'completed') completedFilterBtn.classList.add('active');
    if (currentFilter === 'incomplete') incompleteFilterBtn.classList.add('active');
};

allFilterBtn.addEventListener('click', () => {
    currentFilter = 'all';
    updateFilterButtonStyles();
    renderToDos();
});

completedFilterBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    updateFilterButtonStyles();
    renderToDos();
});

incompleteFilterBtn.addEventListener('click', () => {
    currentFilter = 'incomplete';
    updateFilterButtonStyles();
    renderToDos();
});

form.addEventListener('submit', addToDo)

const addFromLS = () => {
    const data = JSON.parse(localStorage.getItem('tasks'))
    if (data) {
        tasks = data
        renderToDos()
    }
}

addFromLS()
getTasks()