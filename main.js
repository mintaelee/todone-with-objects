/*

Global arrays. There ought to be a 1:1 relationship of each index of your todos
and each index of your isDone.

For example, isDone[3] would hold the "done-ness" information for todos[3].

*/

let todos = [];
let isDone = [];

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
    todos.push(newTodo);
    isDone.push(false);

    // Update HTML
    updateHTML(todos);
}


function clearAllTodos(event) {
    // Stop page from reloading on button click.
    event.preventDefault();
    
    // Remove all todos from BOTH arrays.
    todos = [];
    isDone = [];
    
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
    while (isDone.includes(true)){
        // Find index of completed element
        let deleteIndex = isDone.indexOf(true);

        // Remove the element from both arrays
        isDone.splice(deleteIndex, 1);
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

    // Grab the text and index of the element that was clicked
    const clickedText= clickedElement.innerText;
    const clickedIndex = todos.indexOf(clickedText);

    // Check if the clicked element is completed by looking at its text decoration property
    // If the element is not done yet, apply strikethrough, add to isDone array,
    // and assign class name as 'todo-completed'
    // Otherwise, take strikethrough away, remove from isDone array, and assign 
    // class name as 'todo-not-completed'
    
    if (clickedElement.style.textDecoration === 'line-through'){
        clickedElement.style.textDecoration = '';
        clickedElement.className = 'todo-not-completed';
        isDone[clickedIndex] = false;
    } else {
        clickedElement.style.textDecoration = 'line-through';
        clickedElement.className = 'todo-completed';
        isDone[clickedIndex] = true;
    }

}

function mouseoverDone(event){
    event.target.style.fontSize = '1.5em';
}

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

}


function updateHTML(items) {
    // Clear HTML
    removeAllChildrenOfOl();

    // Update HTML List based on the current arrays
    const todoList = document.querySelector('#todo-list');

    for (let i = 0; i < items.length; i++){
        const newList = document.createElement('li');
        newList.innerText = items[i];
        newList.className = 'todo-not-completed';

        // Add an event listener on the newly created html element to launch
        // `toggleDone` when it's clicked.
        newList.addEventListener('click', toggleDone);
        newList.addEventListener('mouseover', mouseoverDone);
        newList.addEventListener('mouseout', mouseoutDone);

        // Put our new element on the list part of our page!
        todoList.appendChild(newList);
    }
}
