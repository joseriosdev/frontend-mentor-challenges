document.addEventListener('DOMContentLoaded', () => {
  const todoInput = document.getElementById('todo-input');
  const todoContainer = document.querySelector('.container__section--todos');
  const itemsLeftSpan = document.querySelector('.desktop-btns-footer p:first-child');
  
  let todos = [
    { id: 1, text: 'Talk with my Creator', completed: true },
    { id: 2, text: 'Prepare English class', completed: false }
  ];

  const renderTodos = () => {
    const footer = document.querySelector('.desktop-btns-footer');
    todoContainer.innerHTML = '';
    
    todos.forEach((todo, index) => {
      const todoElement = createTodoElement(todo, index);
      todoContainer.appendChild(todoElement);
      
      const hr = document.createElement('hr');
      todoContainer.appendChild(hr);
    });

    todoContainer.appendChild(footer);
    updateItemsLeft();
  };

  const createTodoElement = (todo, index) => {
    const div = document.createElement('div');
    div.classList.add('todo-item');
    if (todo.completed) div.classList.add('todo-done');
    
    div.setAttribute('draggable', true);
    div.dataset.index = index;

    div.innerHTML = `
      <div class="list-circle ${todo.completed ? 'checked' : ''}">
        <img src="images/icon-check.svg" class="${todo.completed ? 'd-inline-block' : 'd-none'}">
      </div>
      <p>${todo.text}</p>
      <div class="delete-x"></div>
    `;

    div.querySelector('.list-circle').onclick = () => toggleTodo(todo.id);
    div.querySelector('.delete-x').onclick = () => deleteTodo(todo.id);

    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragover', handleDragOver);
    div.addEventListener('drop', handleDrop);
    div.addEventListener('dragend', handleDragEnd);

    return div;
  };

  const addTodo = (text) => {
    todos.push({ id: Date.now(), text, completed: false });
    todoInput.value = '';
    renderTodos();
  };

  const toggleTodo = (id) => {
    todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    renderTodos();
  };

  const deleteTodo = (id) => {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
  };

  const updateItemsLeft = () => {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeftSpan.innerText = `${activeCount} items left`;
  };

  // --- DRAG & DROP ---
  let dragSrcEl = null;

  function handleDragStart(e) {
    this.style.opacity = '0.4';
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
  }

  function handleDragOver(e) {
    if (e.preventDefault) e.preventDefault();
    return false;
  }

  function handleDrop(e) {
    e.stopPropagation();
    if (dragSrcEl !== this) {
      const fromIndex = parseInt(dragSrcEl.dataset.index);
      const toIndex = parseInt(this.dataset.index);
      
      const movedItem = todos.splice(fromIndex, 1)[0];
      todos.splice(toIndex, 0, movedItem);
      
      renderTodos();
    }
    return false;
  }

  function handleDragEnd() {
    this.style.opacity = '1';
  }

  todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim() !== '') {
      addTodo(todoInput.value.trim());
    }
  });

  renderTodos();
});
