$(document).ready(function() {
    // Load tasks from cookies if any
    loadTasks();
  
    // Event listener for 'New' button
    $('#newTaskBtn').click(function() {
      var task = prompt("Enter a new task:");
  
      if (task && task.trim() !== "") {
        addTask(task);
      } else {
        alert("Task cannot be empty.");
      }
    });
  
    // Function to add a new task
    function addTask(task) {
      // Create a new div for the task
      var taskDiv = $('<div class="todo"></div>').text(task);
      
      // Prepend it to the task list
      $('#ft_list').prepend(taskDiv);
  
      // Save the tasks to cookies
      saveTasks();
    }
  
    // Event listener to remove a task
    $('#ft_list').on('click', '.todo', function() {
      var confirmation = confirm("Do you want to remove this task?");
      
      if (confirmation) {
        $(this).remove();
        saveTasks();
      }
    });
  
    // Function to save tasks in cookies
    function saveTasks() {
      var tasks = [];
      $('#ft_list .todo').each(function() {
        tasks.push($(this).text());
      });
      
      // Save tasks as a cookie
      document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
    }
  
    // Function to load tasks from cookies
    function loadTasks() {
      var cookies = document.cookie.split(';');
      var tasks = [];
  
      // Look for the 'tasks' cookie
      cookies.forEach(function(cookie) {
        if (cookie.trim().startsWith("tasks=")) {
          tasks = JSON.parse(cookie.trim().substring("tasks=".length));
        }
      });
  
      // Add each task to the list
      tasks.forEach(function(task) {
        addTask(task);
      });
    }
  });
  