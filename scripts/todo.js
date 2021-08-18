var currentUser = sessionStorage.getItem("user");
var currentUserData = JSON.parse(localStorage.getItem(currentUser));
var todoListView = document.getElementById("todo-list");
var addTaskDialogue = document.getElementById("add-item-dialogue");
var addTaskBtn = document.getElementById("add-item-btn");
var span = document.getElementsByClassName("close")[0];


function showTodoList() {   
    let sortSelectValue = document.getElementById("sort-select"); 
    let fromDate = document.getElementById("search-from-date").value; 
    let toDate = document.getElementById("search-to-date").value;   
    let doNow = document.getElementById("search-do-now").checked;
    let doTomorrow = document.getElementById("search-do-tomorrow").checked;
    let doSoon = document.getElementById("search-do-soon").checked; 
    let done = document.getElementById("search-task-done").checked;
    let pending = document.getElementById("search-task-pending").checked;
    let splitFromDate = fromDate.split("-");
    let splitToDate = toDate.split("-");
    
    let fromDateObj = new Date(splitFromDate[0], splitFromDate[1] - 1, splitFromDate[2]).getTime();
    let toDateObj = new Date(splitToDate[0], splitToDate[1] - 1, splitToDate[2]).getTime();
    
    let userData = JSON.parse(localStorage.getItem(currentUser));
    
    var todoList = [];
    if(userData['todos']) {
        todoList = userData['todos'];
    }
    
    let listTag = "";
    
    var splitElementDate;
    var elementDateObj;
    var priority;
    var doneVal;
    
    document.getElementById("todolist-error").innerHTML = "";
    
    if(sortSelectValue.value === "due-date") {
        todoList.sort(function(task1, task2) { 
            splitTask1Date = task1["date"].split("-");
            splitTask2Date = task2["date"].split("-");
            return new Date(task1["date"]) - new Date(task2["date"]);
        });
    } else if(sortSelectValue.value === "priority") {
        var prioritySorting = {};
        prioritySorting["do-now"] = 1;
        prioritySorting["do-tomorrow"] = 2;
        prioritySorting["do-soon"] = 3;
        prioritySorting[""] = 4;
        todoList.sort((task1, task2)=>prioritySorting[(task1.priority.split(" "))[0]] - prioritySorting[(task2.priority.split(" "))[0]]);
    }
    
    if(fromDate !== "" || toDate !== "") {
        todoList.forEach((element, index) => {
            splitElementDate = element["date"].split("-");
            elementDateObj = new Date(splitElementDate[0], splitElementDate[1] - 1, splitElementDate[2]).getTime();
            priority = element["priority"];
            doneVal = element["done"];
            pendingVal = (new Date() > elementDateObj);

            if((fromDateObj <= elementDateObj && elementDateObj <= toDateObj) && (doNow === priority.includes("do-now")) && (doTomorrow === priority.includes("do-tomorrow")) && (doSoon === priority.includes("do-soon")) && (done === (doneVal === "yes")) && (pending === pendingVal)) {
                if(doneVal === "yes") {
                    listTag += `<li id="todo-item${element.index}" onclick="selectItem(${element.index})"><input class="task-done" type="checkbox" checked>${element.title}<span class="edit-icon" onclick="editTodoTask(${element.index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${element.index})"><i class="fa fa-trash"></i></span></li>`;
                } else {
                    listTag += `<li id="todo-item${element.index}" onclick="selectItem(${element.index})"><input class="task-done" type="checkbox">${element.title}<span class="edit-icon" onclick="editTodoTask(${element.index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${element.index})"><i class="fa fa-trash"></i></span></li>`;
                }
            } else
                return;
        });
    } else if((fromDate === "" || toDate === "") || (todoList.length === 0 && listTag === "")) {
        todoList.forEach((element, index) => {

            if(element.done === "yes") {
                listTag += `<li id="todo-item${element.index}" onclick="selectItem(${element.index})"><input class="task-done" type="checkbox" checked>${element.title}<span class="edit-icon" onclick="editTodoTask(${element.index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${element.index})"><i class="fa fa-trash"></i></span></li>`;
            } else {
                listTag += `<li id="todo-item${element.index}" onclick="selectItem(${element.index})"><input class="task-done" type="checkbox">${element.title}<span class="edit-icon" onclick="editTodoTask(${element.index})"><i class="fa fa-edit"></i></span><span class="delete-icon" onclick="deleteTodoTask(${element.index})"><i class="fa fa-trash"></i></span></li>`;
            }
        });
    }
    
    if(listTag === "")
        document.getElementById("todolist-msg").innerHTML = "No task found.";
    else 
        document.getElementById("todolist-msg").innerHTML = "";
    
    todoListView.innerHTML = listTag;
}

showTodoList();

function searchTodoList() {
    let fromDate = document.getElementById("search-from-date").value; 
    let toDate = document.getElementById("search-to-date").value; 
    if(fromDate === "" || toDate === "") {
        todoListView.innerHTML = "";
        document.getElementById("todolist-error").innerHTML = "Please choose valid date range.";
        document.getElementById("todolist-msg").innerHTML = "";
        return;
    }
    showTodoList();
}

function resetTodoList() {
    document.getElementById("search-form").reset();
    showTodoList();
}

var selectedItems = [];

function selectItem(index) {
    if(!selectedItems.includes(index)) {
        document.getElementById("todo-item" + index).style.backgroundColor = "#ddd";
        selectedItems.push(index);
    } else {
        document.getElementById("todo-item" + index).style.backgroundColor = "#fff";
        selectedItems.splice(index, 1);
    }
}

function deleteSelectedItems() {   
    console.log("selectedItems: ");
    for(let index = 0; index < selectedItems.length; index++) {
        console.log(selectedItems[index]);
    }
    let todoList = currentUserData['todos'];
    for(let index = 0; index < selectedItems.length; index++) {
        for(let i = 0; i < todoList.length; i++) {
            if(todoList[i].index == selectedItems[index]) {
                todoList.splice(i, 1);
            }
        }
    }
    localStorage.setItem(currentUserData.email, JSON.stringify(currentUserData));
    selectedItems = [];
    showTodoList();
}

function sortTodoList() {
    showTodoList();
}

addTaskBtn.onclick = function() {
    addTaskDialogue.style.display = "block";
    document.getElementById("dialogue-title").innerHTML = "Add Task";
    document.getElementById("dialogue-btn").innerHTML = "Add";
    document.getElementById("taskform").reset();
    document.getElementById("preview-img").src = "images/task-image.jpg"
    document.getElementById("upload-file").required = true;
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
    document.getElementById("upload-file").required = false;
    let todoList = currentUserData['todos'];
    let todoItem;
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].index == index) {
            todoItem = todoList[i];
            break;
        }
    }
    document.getElementById("index").value = todoItem.index;
    document.getElementById("title").value = todoItem.title;
    document.getElementById("date").value = todoItem.date;
    let prioritiesLen = 0;
    let priorities;
    let priorityChecks = document.getElementsByName("priority");
    for(let i = 0; i < priorityChecks.length; i++) {
        priorityChecks[i].checked = false;
    } 
    if(todoItem.priority !== "") {
        priorities = todoItem.priority.split(" ");
        prioritiesLen = priorities.length;
    }
    console.log("priorities: ");
    for(let i = 0; i < prioritiesLen; i++) {
        console.log(priorities[i]);
        document.getElementById(priorities[i]).checked = true;
    } 
    document.getElementById(todoItem["public"]).checked = true;
    document.getElementById(todoItem.reminder).checked = true;
    let reminderDate = document.getElementById("reminder-date");
    let today = new Date();
    let todayStr = today.toISOString().substr(0, 10);
    if(todoItem.reminder == "reminder-yes") {
        reminderDate.value = todoItem.reminderdate;    
        reminderDate.readOnly = false;
        reminderDate.style.opacity = 1;
    } else {
        reminderDate.value = todayStr;
        reminderDate.readOnly = true;
        reminderDate.style.opacity = 0.4;
    }   
    document.getElementById("task-done").checked = false;
    if(todoItem.done == "yes") {        
        document.getElementById("task-done").checked = true;
    }
    document.getElementById("preview-img").src = todoItem.taskimageurl;
}

function addTodoTask() {
    var index = document.getElementById("index");
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
    task["index"] = index.value;
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
    let todoList = currentUserData['todos'];
    for(let i = 0; i < todoList.length; i++) {
        if(todoList[i].index == index) {
            todoList.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(currentUserData.email, JSON.stringify(currentUserData));
    showTodoList();
}


