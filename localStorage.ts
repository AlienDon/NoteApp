import { ToDoItem } from './models.js';

export class LocalStorage {
    setLocalStorage(notes_array: Array<ToDoItem>) {
        localStorage.setItem('notes_array', JSON.stringify(notes_array));
    }
    
    getLocalStorage() {
        const localStorageStoredNote = localStorage.getItem('notes_array');
        let result: Array<ToDoItem> = [];
        if (localStorageStoredNote) {
            result = JSON.parse(localStorageStoredNote);
        }
        return result;
    }
    clearLocalStorage() {
        localStorage.clear()
    }
}