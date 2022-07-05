import { LocalStorage } from './localStorage.js';
import { ToDoItem } from './models.js';
import { UserInterface } from './ui.js';

const localStorage = new LocalStorage();
const userInterface = new UserInterface();


function initializeTheNotes() {
    const notes_array: Array<ToDoItem> = localStorage.getLocalStorage() || [];
    userInterface.init(notes_array);
}
initializeTheNotes();

    // type myType = string | number;