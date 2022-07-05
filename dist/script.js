import { LocalStorage } from './localStorage.js';
import { UserInterface } from './ui.js';
const localStorage = new LocalStorage();
const userInterface = new UserInterface();
function initializeTheNotes() {
    const notes_array = localStorage.getLocalStorage() || [];
    userInterface.init(notes_array);
}
initializeTheNotes();
// type myType = string | number;
