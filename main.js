/*

Global arrays. There ought to be a 1:1 relationship of each index of your todos
and each index of your isDone.

For example, isDone[3] would hold the "done-ness" information for todos[3].

*/

let todos = [];

// Global indexCounter to check the index of the next element to add.
let indexCounter = 0;

// When the html finishes loading, launch `init`.
window.onload = init;

// Set up all event listeners.
function init() {
    // When they click the add todo button, run `addTodo`.
    document.querySelector('#add-todo').addEventListener('click', addTodo);

        
    // When they click the clear done todos button, run `clearDoneTodos`.
    document.querySelector('#clear-done-todos').addEventListener('click', clearDoneTodos);

    
    // When they click the clear all todos button, run `clearAllTodos`.
    document.querySelector('#clear-all-todos').addEventListener('click', clearAllTodos);

}

function addTodo(event) {
    // Stop page from reloading on button click.
    event.preventDefault();


    // Get new todo from the new todo input field.
    const newTodo = document.querySelector('#new-todo').value;

    // Clear the input field of all text.
    document.querySelector('#new-todo').value = '';

    // Put the todo and its "done-ness" in their respective arrays.
    todos.push({'index': indexCounter, 'todo': newTodo, 'status': false});

    // Update HTML
    appendHTML(todos[indexCounter]);
}


function clearAllTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    
    // Remove all todos from BOTH arrays.
    todos = [];
    
    // Remove all todos from the html.
    // You'll have to write that function too, but we'll call it here:
    removeAllChildrenOfOl();
}

function clearDoneTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();

    // Select all completed elements
    // const classToClear = document.querySelectorAll('.todo-completed');

    // Remove selected elements
    // classToClear.forEach(CompletedNode => CompletedNode.parentNode.removeChild(CompletedNode));


    // Loop through isDone array until there is no completed element
    while (todos.filter(todo => todo.status === true).length > 0){
        // Find index of completed element
        let deleteIndex = todos.findIndex(i => i.status === true);

        // Remove the element from both arrays
        todos.splice(deleteIndex, 1);
    }

    // Update HTML
    updateHTML(todos);



}

function toggleDone(event) {
    // No need to run `event.preventDefault` here; that default behavior only
    // applies to buttons.
    
    // Grab the HTML element that was clicked.
    // If you don't know, the event parameter has what you need... somewhere.
    const clickedElement = event.target;

    // Grab the id of the element that was clicked and set it to the index to refer to
    const clickedIndex = parseInt(clickedElement.id);

    // Check if the clicked element is completed by looking at its text decoration property
    // If the element is not done yet, apply strikethrough, make corresponding isDone
    // element to 'true', and assign class name as 'todo-completed'
    // Otherwise, take strikethrough away, make corresponding isDone element to 'false', 
    // and assign class name as 'todo-not-completed'
    
    if (clickedElement.style.textDecoration === 'line-through'){
        clickedElement.style.textDecoration = '';
        clickedElement.className = 'todo-not-completed';
        todos[clickedIndex].status = false;
    } else {
        clickedElement.style.textDecoration = 'line-through';
        clickedElement.className = 'todo-completed';
        todos[clickedIndex].status = true;
    }

}
// Function to create a mouseover effect
function mouseoverDone(event){
    event.target.style.fontSize = '1.5em';
}

// Function to create a mouseout effect
function mouseoutDone(event){
    event.target.style.fontSize = '1em';
}

function removeAllChildrenOfOl() {
    // Grab the ol.
    const listToRemove = document.querySelector('#todo-list');


    // Remove all its children.
    // The way I like to do that is to continue to remove children as long as
    // there are some to remove.
    // Look at the methods `.hasChildNodes` and `removeChild`.
    // There are other ways too, though. Feel free to poke around.
    while (listToRemove.hasChildNodes()){
        listToRemove.removeChild(listToRemove.firstChild);
    }

    // Reset indexCounter.
    indexCounter = 0;

}

function appendHTML(item) {
    // Grab the todo list.
    const todoList = document.querySelector('#todo-list');

    // Create a new list element
    const newList = document.createElement('li');
    newList.innerText = item.todo;

    // Set class name as default and id as current index
    newList.className = 'todo-not-completed';
    newList.id = item.index;

    // Increase current index by one.
    indexCounter ++;

    // Add an event listener on the newly created html element to launch
    // `toggleDone` when it's clicked.
    newList.addEventListener('click', toggleDone);

    // Add event listeners for mouseover and mouseout
    newList.addEventListener('mouseover', mouseoverDone);
    newList.addEventListener('mouseout', mouseoutDone);

    // Put our new element on the list part of our page!
    todoList.appendChild(newList);
}

function updateHTML(items) {
    // Clear HTML
    removeAllChildrenOfOl();

    // Update HTML List based on the current arrays
    const todoList = document.querySelector('#todo-list');

    // Loop through items in the todo list and update HTML.
    for (let i = 0; i < items.length; i++){
        items[i].index = i;
        appendHTML(items[i]);
    }
}
