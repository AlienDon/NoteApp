export class LocalStorage {
    setLocalStorage(notes_array) {
        localStorage.setItem('notes_array', JSON.stringify(notes_array));
    }
    getLocalStorage() {
        const localStorageStoredNote = localStorage.getItem('notes_array');
        let result = [];
        if (localStorageStoredNote) {
            result = JSON.parse(localStorageStoredNote);
        }
        return result;
    }
    clearLocalStorage() {
        localStorage.clear();
    }
}
