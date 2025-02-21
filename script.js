// script.js
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return;
    }

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Excluir</button>
    `;
    
    taskList.appendChild(li);
    taskInput.value = '';
}

function toggleComplete(element) {
    element.parentElement.classList.toggle('completed');
}

function deleteTask(element) {
    element.parentElement.remove();
}

// Permite adicionar tarefa ao pressionar Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});