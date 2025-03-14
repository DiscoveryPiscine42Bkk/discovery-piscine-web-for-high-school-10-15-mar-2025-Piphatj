// Get DOM elements
const newTodoBtn = document.getElementById('newTodoBtn');
const ftList = document.getElementById('ft_list');

// Helper function to get cookies
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Helper function to set cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

// Function to load the TO DO list from the cookie
function loadTodos() {
  const todos = getCookie('todos');
  if (todos) {
    const todoArray = JSON.parse(todos);
    todoArray.forEach(todo => {
      createTodoElement(todo);
    });
  }
}

// Function to create a new TO DO element
function createTodoElement(todoText) {
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.textContent = todoText;

  // Add click event to remove the TO DO
  todoDiv.addEventListener('click', () => {
    if (confirm('Are you sure you want to remove this TO DO?')) {
      todoDiv.remove();
      saveTodos(); // Save after removing item
    }
  });

  // Add new TO DO to the top of the list
  ftList.prepend(todoDiv);
}

// Function to save TO DO list to a cookie
function saveTodos() {
  const todoDivs = document.querySelectorAll('.todo');
  const todoArray = [];
  todoDivs.forEach(todoDiv => {
    todoArray.push(todoDiv.textContent);
  });
  setCookie('todos', JSON.stringify(todoArray), 7); // Save for 7 days
}

// Add a new TO DO when the 'New' button is clicked
newTodoBtn.addEventListener('click', () => {
  const todoText = prompt('Enter a new TO DO:');
  if (todoText && todoText.trim() !== '') {
    createTodoElement(todoText.trim());
    saveTodos(); // Save after adding new item
  } else {
    alert('Error: TO DO cannot be empty.');
  }
});

// Load the TO DO list when the page loads
loadTodos();
