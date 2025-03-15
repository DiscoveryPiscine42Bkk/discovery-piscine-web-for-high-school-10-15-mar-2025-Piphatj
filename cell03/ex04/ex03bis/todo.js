$(document).ready(function() {
  loadTasks();
  $('#newTaskBtn').click(function() {
    var task = prompt("Enter a new task:");

    if (task && task.trim() !== "") {
      addTask(task);
    } else {
      alert("Task cannot be empty.");
    }
  });


  function addTask(task) {
    var taskDiv = $('<div class="todo"></div>').text(decodeURIComponent(task));
    

    $('#ft_list').prepend(taskDiv);

 
    saveTasks();
  }


  $('#ft_list').on('click', '.todo', function() {
    var confirmation = confirm("Do you want to remove this task?");
    
    if (confirmation) {
      $(this).remove();
      saveTasks();
    }
  });
  function saveTasks() {
    var tasks = [];
    $('#ft_list .todo').each(function() {
      tasks.push(encodeURIComponent($(this).text()));
    });
    
   
    document.cookie = "tasks=" + JSON.stringify(tasks) + ";path=/";
  }

  function loadTasks() {
    var cookies = document.cookie.split(';');
    var tasks = [];


    cookies.forEach(function(cookie) {
      if (cookie.trim().startsWith("tasks=")) {
        tasks = JSON.parse(cookie.trim().substring("tasks=".length));
      }
    });

    tasks.forEach(function(task) {
      addTask(task);
    });
  }
});