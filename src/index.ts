import { LocalStorage } from './localStorage';
import { ToDoItem } from './models';
import { UserInterface } from './ui';

const localStorage = new LocalStorage();
const userInterface = new UserInterface();


function initializeTheNotes() {
    const notes_array: Array<ToDoItem> = localStorage.getLocalStorage() || [];
    userInterface.init(notes_array);
}
initializeTheNotes();

    // type myType = string | number;
