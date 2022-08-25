// *Choosing Elements
// Form
const todoForm = document.querySelector('#todo-form');

// İnputs
const todoInput = document.querySelector('#todo');
const searchInput = document.querySelector('#filter');

// Buttons
const addTodoButton = document.querySelector('#add-button');
const clearTodosButton  = document.querySelector('#clear-todos');

// Others
const todoList = document.querySelector('#list-group');
const addBody = document.querySelector('#add-body');
const seeBody = document.querySelector('#see-body');


// *Events
// Add ToDo Event
todoForm.addEventListener('submit', addTodo);

// Load all todos to uı from local storage
document.addEventListener("DOMContentLoaded", loadAllTodosToUI);

// Delete Todos
seeBody.addEventListener("click", deleteTodoItem);

// Filter Todos
searchInput.addEventListener("keyup", searchTodos);

// Clear Todos
clearTodosButton.addEventListener('click', clearTodos);

// *Functions
// Add Todo Function
function addTodo(e){
    e.preventDefault();
    const newTodo = todoInput.value.trim();
    
    if(newTodo === ""){
        showAlert("danger", "To-do ınput can't be empty!");
    }else{
        showAlert("success", "To-do successfully added!");
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
    }
}

// Add Todo to UI Function
function addTodoToUI(newTodo){
    // Create List Item and make adjustments
    const listItem = document.createElement("li");
    listItem.classList = "list-group-item d-flex justify-content-between";

    // Create Link in List İtem and make adjustments
    const linkInListItem = document.createElement('a');
    linkInListItem.href = "#";
    linkInListItem.classList = "delete-item";
    linkInListItem.innerHTML = "<i class = 'fa fa-remove'></i>"

    // Add text node in list item
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(linkInListItem);

    // Append the todo list group and clear input
    todoList.appendChild(listItem);
    todoInput.value = "";
}

// Show Alert Function
function showAlert(alertType, alertMessage){
    // Create Alert Div
    const alertDiv = document.createElement("div");
    alertDiv.classList = `alert alert-${alertType}`;

    // Add text node in div
    alertDiv.textContent = alertMessage;

    // Add alert div to UI
    addBody.appendChild(alertDiv);

    // Set Timeout
    setTimeout(() => {
        alertDiv.remove();
    }, 1500);
}

// Get Todos From Storage
function getTodosFromStorage(){
    let todoItems;

    if(localStorage.getItem("todoItems_key") === null){
        todoItems = [];
    }else{
        todoItems = JSON.parse(localStorage.getItem("todoItems_key"));
    }

    return todoItems;
}

// Add Todo to Local Storage
function addTodoToStorage(newTodo){
    let todoItems = getTodosFromStorage();

    todoItems.push(newTodo);

    localStorage.setItem("todoItems_key", JSON.stringify(todoItems));
}

// When page loaded add todos to uı from local storage
function loadAllTodosToUI(){
    let todoItems = getTodosFromStorage();

    todoItems.forEach(todoItem => {
        addTodoToUI(todoItem);
    });
}

// Delete todo items 
function deleteTodoItem(e){
    if (e.target.className === "fa fa-remove") {
        const myTarget = e.target.parentElement.parentElement;

        // Delete item to UI
        myTarget.remove(); //li element remove

        // Delete item to Storage
        deleteTodoItemFromStorage(myTarget);
       
        showAlert("success", "To-do successfully deleted!");
    }
}

// Delete todo items from storage
function deleteTodoItemFromStorage(deleteTodoItem){
    let todoItems = getTodosFromStorage();

    todoItems.forEach((todo, index) => {
        if(todo === deleteTodoItem.textContent){
            todoItems.splice(index, 1);
        }
    });

    localStorage.setItem("todoItems_key", JSON.stringify(todoItems));
}

// Filter Todos
function searchTodos(e){
    const searchValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll('.list-group-item');

    listItems.forEach(listItem => {
        const itemText = listItem.textContent.toLowerCase();

        if(itemText.indexOf(searchValue) === -1){
            listItem.setAttribute("style", "display: none !important");
        }else{
            listItem.setAttribute("style", "display: block");
        }
    });
}

// Clear Todos
function clearTodos() {
    
    if(todoList.firstElementChild != null){
        // Clear UI
        while (todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }

        // Clear Storage
        localStorage.clear();

        showAlert("info", "All to-do deleted successfully!");
    }else{
        showAlert("warning", "To delete all to-do's, you must add a to-do first.");
    }
}