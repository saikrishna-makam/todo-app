var currentUser = sessionStorage.getItem("user");
var currentUserData = JSON.parse(localStorage.getItem(currentUser));

var todoListView = document.getElementById("todo-list");
var addTaskDialogue = document.getElementById("add-item-dialogue");
var addTaskBtn = document.getElementById("add-item-btn");
var span = document.getElementsByClassName("close")[0];

function showTodoList() {
    var todoList = [];
    if(currentUserData['todos']) {
        todoList = currentUserData['todos'];
    }
    
    let listTag = "";
    todoList.forEach((element, index) => {

        if(element.done === "yes") {
            listTag += `<li><input class="task-done" type="checkbox" checked>${element.title}<span class="edit-icon" onclick="editTodoTask(${index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${index})"><i class="fa fa-trash"></i></span></li>`;
        } else {
            listTag += `<li><input class="task-done" type="checkbox">${element.title}<span class="edit-icon" onclick="editTodoTask(${index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${index})"><i class="fa fa-trash"></i></span></li>`;
        }
    });
    todoListView.innerHTML = listTag;
}

showTodoList();


addTaskBtn.onclick = function() {
    addTaskDialogue.style.display = "block";
    document.getElementById("dialogue-title").innerHTML = "Add Task";
    document.getElementById("dialogue-btn").innerHTML = "Add";
    document.getElementById("taskform").reset();
    document.getElementById("preview-img").src = "http://placehold.it/180"; 
    document.getElementById("index").value = currentUserData["todos"].length;
    var date = document.getElementById("date");
    var reminderDate = document.getElementById("reminder-date");
    var today = new Date();
    var todayStr = today.toISOString().substr(0, 10);
    date.value = todayStr;
    reminderDate.value = todayStr;
    
    document.getElementById("dialogue-btn").value = "add";
}


span.onclick = function() {
    addTaskDialogue.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == addTaskDialogue) {
        addTaskDialogue.style.display = "none";
    }
}

function hideReminderDate() {
    var reminderDate = document.getElementById("reminder-date");
    let reminderCheck = (function() {
        var reminderVal = document.getElementsByName("reminder");
        for(i = 0; i < reminderVal.length; i++) {
            console.log(reminderVal[i].value);
            if(reminderVal[i].checked)
                return reminderVal[i].value;
        }
    })();
    
    if(reminderCheck === "reminder-yes") {
        reminderDate.readOnly = false;
        reminderDate.style.opacity = 1;
    } else {
        reminderDate.readOnly = true;
        reminderDate.style.opacity = 0.4;
    }
}

function editTodoTask(index) {
    addTaskDialogue.style.display = "block";
    document.getElementById("dialogue-title").innerHTML = "Edit Task";
    document.getElementById("dialogue-btn").innerHTML = "Save";
    let todoList = currentUserData['todos'];
    document.getElementById("index").value = index;
    document.getElementById("title").value = todoList[index].title;
    document.getElementById("date").value = todoList[index].date;
    let priorities = todoList[index].priority.split(" ");
    for(let i = 0; i < priorities.length; i++) {
        document.getElementById(priorities[i]).checked = true;
    } 
    document.getElementById(todoList[index]["public"]).checked = true;
    document.getElementById(todoList[index].reminder).checked = true;
    let reminderDate = document.getElementById("reminder-date");
    let today = new Date();
    let todayStr = today.toISOString().substr(0, 10);
    if(todoList[index].reminder == "reminder-yes") {
        reminderDate.value = todoList[index].reminderdate;    
        reminderDate.readOnly = false;
        reminderDate.style.opacity = 1;
    } else {
        reminderDate.value = todayStr;
        reminderDate.readOnly = true;
        reminderDate.style.opacity = 0.4;
    }   
    if(todoList[index].done == "yes")
        document.getElementById("task-done").checked = true;
    document.getElementById("preview-img").src = todoList[index].taskimageurl;
}

function addTodoTask() {
    var title = document.getElementById("title");
    var date = document.getElementById("date");
    var priority = (function() {
        var priorityVal = document.getElementsByName("priority");
        var result = "";
        for(i = 0; i < priorityVal.length; i++) {
            if(priorityVal[i].checked)
                result += priorityVal[i].value + " ";
        }
        return result.trim();
    })();    
    let reminder = (function() {
        var reminderVal = document.getElementsByName("reminder");
        for(i = 0; i < reminderVal.length; i++) {
            console.log(reminderVal[i].value);
            if(reminderVal[i].checked)
                return reminderVal[i].value;
        }
    })();
    var todoPublic = (function() {
        var publicVal = document.getElementsByName("public");
        for(i = 0; i < publicVal.length; i++) {
            console.log(publicVal[i].value);
            if(publicVal[i].checked)
                return publicVal[i].value;
        }
    })();
     
    var reminderDate = document.getElementById("reminder-date");
    var done = (document.getElementById("task-done").checked) ? "yes" : "no";
    var taskimage = document.getElementById("preview-img");
    
    var task = {};
    
    task["title"] = title.value;
    task["date"] = date.value;
    task["priority"] = priority;
    task["public"] = todoPublic;
    task["reminder"] = reminder;
    if(reminder == "reminder-yes")
        task["reminderdate"] = reminderDate.value;
    else
        task["reminderdate"] = "";
    task["done"] = done;
    task["taskimageurl"] = getBase64Image(taskimage);
    
    if(!currentUserData['todos']) {
        currentUserData['todos'] = [];
    }
    currentUserData['todos'][parseInt(document.getElementById("index").value)] = task;
    
    try {
        localStorage.setItem(currentUserData.email, JSON.stringify(currentUserData));
    } catch(e) {
        console.log("Storage failed: " + e);
    }
}

function deleteTodoTask(index) {
    currentUserData['todos'].splice(index, 1);
    localStorage.setItem(currentUserData.email, JSON.stringify(currentUserData));
    showTodoList();
}


