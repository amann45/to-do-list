$(document).ready(function() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";
  renderTasks();

  // Add task
  $("#addBtn").click(function() {
    let taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, completed: false });
      renderTasks();
      $("#taskInput").val("");
    }
  });

  // Toggle complete
  $("#taskList").on("click", "span", function() {
    let index = $(this).parent().data("index");
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  });

  // Delete task
  $("#taskList").on("click", ".delete-btn", function() {
    let index = $(this).parent().data("index");
    tasks.splice(index, 1);
    renderTasks();
  });

  // Edit task
  $("#taskList").on("click", ".edit-btn", function() {
    let index = $(this).parent().data("index");
    let newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null && newText.trim() !== "") {
      tasks[index].text = newText.trim();
      renderTasks();
    }
  });

  // Filter buttons
  $(".filter-btn").click(function() {
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
    currentFilter = $(this).data("filter");
    renderTasks();
  });

  // --- LocalStorage Controls ---
  $("#saveBtn").click(function() {
    saveTasks();
    alert("Tasks saved to localStorage!");
  });

  $("#retrieveBtn").click(function() {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
    alert("Tasks retrieved from localStorage!");
  });

  $("#clearBtn").click(function() {
    localStorage.removeItem("tasks");
    tasks = [];
    renderTasks();
    alert("All tasks removed from localStorage!");
  });

  // Save tasks
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Render tasks with filter
  function renderTasks() {
    $("#taskList").empty();
    tasks.forEach((task, index) => {
      if (
        currentFilter === "all" ||
        (currentFilter === "completed" && task.completed) ||
        (currentFilter === "pending" && !task.completed)
      ) {
        let li = $("<li>").attr("data-index", index);
        let textSpan = $("<span>").text(task.completed ? "✅ " + task.text : "❌ " + task.text);
        if (task.completed) textSpan.addClass("completed");

        let editBtn = $("<button>").text("Edit").addClass("edit-btn");
        let deleteBtn = $("<button>").text("X").addClass("delete-btn");

        li.append(textSpan, editBtn, deleteBtn);
        $("#taskList").append(li);
      }
    });
  }
});
