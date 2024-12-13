const form = document.querySelector('form');
const input = document.querySelector('#inp');
const output = document.querySelector('#output');
const allFilterBtn = document.querySelector('#allFilter');
const completedFilterBtn = document.querySelector('#completedFilter');
const incompleteFilterBtn = document.querySelector('#incompleteFilter');

let imgDone, imgEdit, imgTrash;

imgDone = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
  <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
  <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>
`;

imgEdit = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
`;

imgTrash = `
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
`;

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all'; 

const saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const addToDo = (e) => {
    e.preventDefault();
    if (!input.value.trim().length) {
        alert('You didn\'t write anything!');
    } else {
        const toDo = {
            id: tasks[tasks.length - 1]?.id + 1 || 1,
            name: input.value,
            completed: false,
        };
        tasks.push(toDo);
        saveToLocalStorage();
        renderToDos();
    }

    input.value = '';
};

const renderToDos = () => {
    output.innerHTML = '';
    let filteredTasks = tasks;

    if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    } else if (currentFilter === 'incomplete') {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(el => {
        const card = document.createElement('div');
        card.className = 'card';
        const title = document.createElement('h2');
        const btnsWrapper = document.createElement('div');
        const done = document.createElement('button');
        const edit = document.createElement('button');
        const trash = document.createElement('button');

        title.textContent = el.name;
        done.innerHTML = imgDone;
        edit.innerHTML = imgEdit;
        trash.innerHTML = imgTrash;

        done.addEventListener('click', () => {
            el.completed = !el.completed;
            saveToLocalStorage();
            renderToDos();
        });

        if (el.completed) {
            card.classList.add('done');
        } else {
            card.classList.remove('done');
        }

        edit.addEventListener('click', () => {
            const answer = confirm('Are you sure you want to change the name?');
            if (answer) {
                const newName = prompt('Enter the new name');
                if (newName && newName.trim().length) {
                    el.name = newName;
                    saveToLocalStorage();
                    renderToDos();
                }
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
        card.append(title, btnsWrapper);
        output.append(card);
    });
};

allFilterBtn.addEventListener('click', () => {
    currentFilter = 'all';
    renderToDos();
});

completedFilterBtn.addEventListener('click', () => {
    currentFilter = 'completed';
    renderToDos();
});

incompleteFilterBtn.addEventListener('click', () => {
    currentFilter = 'incomplete';
    renderToDos();
});

form.addEventListener('submit', addToDo);

const addFromLS = () => {
    const data = JSON.parse(localStorage.getItem('tasks'));
    if (data) {
        tasks = data;
        renderToDos();
    }
};

addFromLS();
