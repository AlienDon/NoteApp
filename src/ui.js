import { ToDoItem } from './models.js';
import { LocalStorage } from './localStorage.js';
export class UserInterface {
    constructor() {
        this.localStorage = new LocalStorage();
        this.ul_Note = document.getElementById('ul_Note');
        this.btn_CreateNote = document.getElementById('btn_CreateNote');
        this.input_Field = document.getElementById('input_Field');
        this.btn_DeleteAll = document.getElementById('btn_DeleteAll');
        this.notes_array = [];
    }
    init(notes_array) {
        var _a, _b, _c;
        this.notes_array = notes_array;
        (_a = this.btn_CreateNote) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            this.onCreateLiElem();
            this.localStorage.setLocalStorage(this.notes_array);
        });
        (_b = this.input_Field) === null || _b === void 0 ? void 0 : _b.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.onCreateLiElem();
                this.localStorage.setLocalStorage(this.notes_array);
            }
            ;
        });
        (_c = this.btn_DeleteAll) === null || _c === void 0 ? void 0 : _c.addEventListener('dblclick', () => {
            if (this.ul_Note) {
                this.ul_Note.innerText = '';
                // ulNote.remove();
                this.localStorage.clearLocalStorage();
                this.notes_array = [];
            }
        });
        notes_array.forEach(note => this.createLiElem(note));
    }
    onCreateLiElem() {
        if (this.input_Field && this.input_Field.value !== '') {
            const todoItem = new ToDoItem();
            let tryCounts = 0;
            do {
                todoItem.id = Math.floor(Math.random() * 1000000000000000);
                tryCounts++;
            } while (this.notes_array.find(elem => todoItem.id == elem.id) || tryCounts === 5);
            todoItem.text = this.input_Field.value;
            this.createLiElem(todoItem);
            this.notes_array.push(todoItem);
            this.localStorage.setLocalStorage(this.notes_array);
            this.input_Field.value = '';
        }
        else {
            alert('Please fill out the input field');
        }
    }
    createLiElem(todoItem) {
        var _a;
        const li_elem = document.createElement('li');
        const btn_Edit = document.createElement('button');
        const btn_Delete = document.createElement('button');
        const btn_Save = document.createElement('button');
        const btn_Cancel = document.createElement('button');
        const input_Edit = document.createElement('input');
        const span_Text = document.createElement('span');
        const check_Input = document.createElement('input');
        check_Input.type = 'checkbox';
        const div_Note = document.createElement('div');
        const div_Edit = document.createElement('div');
        div_Edit.style.display = 'none';
        btn_Edit.innerText = 'Edit';
        btn_Delete.innerText = 'Delete';
        btn_Save.innerText = 'Save';
        btn_Cancel.innerText = 'Cancel';
        span_Text.innerText = todoItem.text;
        span_Text.id = todoItem.id.toString();
        check_Input.checked = todoItem.done;
        this.checkForCheckedState(check_Input, span_Text);
        btn_Edit.addEventListener('click', () => {
            this.editTodoItem(div_Edit, div_Note, input_Edit, span_Text);
        });
        btn_Delete.addEventListener('click', () => {
            this.deleteTodoItem(div_Note, li_elem, span_Text);
        });
        btn_Save.addEventListener('click', () => {
            this.saveTodoItem(div_Edit, div_Note, span_Text, input_Edit);
        });
        btn_Cancel.addEventListener('click', () => {
            div_Edit.style.display = 'none';
            div_Note.style.display = 'block';
        });
        check_Input.addEventListener('click', () => {
            this.setTodoItemChecked(todoItem, check_Input, span_Text);
        });
        (_a = this.ul_Note) === null || _a === void 0 ? void 0 : _a.appendChild(li_elem);
        li_elem.appendChild(div_Note);
        div_Note.appendChild(check_Input);
        div_Note.appendChild(span_Text);
        div_Note.appendChild(btn_Edit);
        div_Note.appendChild(btn_Delete);
        li_elem.appendChild(div_Edit);
        div_Edit.appendChild(input_Edit);
        div_Edit.appendChild(btn_Save);
        div_Edit.appendChild(btn_Cancel);
        // divEdit.appendChild(spanEditText);
    }
    setTodoItemChecked(todoItem, check_Input, span_Text) {
        todoItem.done = check_Input.checked;
        this.checkForCheckedState(check_Input, span_Text);
        this.localStorage.setLocalStorage(this.notes_array);
    }
    saveTodoItem(div_Edit, div_Note, span_Text, input_Edit) {
        div_Edit.style.display = 'none';
        div_Note.style.display = 'block';
        const indexOfSavedNote = this.notes_array.findIndex(note => note.id.toString() == span_Text.id);
        span_Text.innerText = input_Edit.value;
        if (indexOfSavedNote != -1) {
            this.notes_array[indexOfSavedNote].text = input_Edit.value;
            this.localStorage.setLocalStorage(this.notes_array);
        }
    }
    deleteTodoItem(div_Note, li_elem, span_Text) {
        var _a;
        div_Note.style.display = 'none';
        (_a = this.ul_Note) === null || _a === void 0 ? void 0 : _a.removeChild(li_elem);
        const specificNote = this.notes_array.findIndex(note => note.id.toString() == span_Text.id);
        this.notes_array.splice(specificNote, 1);
        this.localStorage.setLocalStorage(this.notes_array);
    }
    editTodoItem(div_Edit, div_Note, input_Edit, span_Text) {
        div_Edit.style.display = 'block';
        div_Note.style.display = 'none';
        input_Edit.value = span_Text.innerText;
        this.localStorage.setLocalStorage(this.notes_array);
    }
    checkForCheckedState(check_Input, span_Text) {
        if (check_Input.checked) {
            span_Text.style.textDecoration = 'line-through';
        }
        else {
            span_Text.style.textDecoration = 'none';
        }
    }
}
