var tasks = [];

    function handleSubmit(event) {
      event.preventDefault();

      var input = document.getElementById('task-input');
      var taskTitle = input.value.trim();

      if (taskTitle !== '') {
        var newTask = {
          id: Date.now(),
          title: taskTitle,
          completed: false
        };

        tasks.push(newTask);
        renderTasks();
        input.value = '';
      }
    }

    function handleCheckTask(taskId) {
      var task = tasks.find(function(item) {
        return item.id == taskId;
      });

      if (task) {
        task.completed = !task.completed;
        renderTasks();
      }
    }

    function handleDelete() {
      tasks = tasks.filter(function(item) {
        return !item.completed;
      });

      renderTasks();
    }

    function renderTasks() {
      var taskList = document.getElementById('task-list');
      taskList.innerHTML = '';

      tasks.forEach(function(task) {
        var listItem = document.createElement('li');
        listItem.className = 'todo-item' + (task.completed ? ' is-completed' : '');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
          handleCheckTask(task.id);
        });

        var label = document.createElement('label');
        label.textContent = task.title;

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        taskList.appendChild(listItem);
      });
    }