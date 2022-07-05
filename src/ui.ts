import { ToDoItem } from './models';
import { LocalStorage } from './localStorage';


export class UserInterface {

    localStorage = new LocalStorage();

    ul_Note: HTMLElement | null = document.getElementById('ul_Note');
    btn_CreateNote: HTMLElement | null = document.getElementById('btn_CreateNote');
    input_Field = document.getElementById('input_Field') as HTMLInputElement;
    btn_DeleteAll: HTMLElement | null = document.getElementById('btn_DeleteAll');

    notes_array: Array<ToDoItem> = [];

    init(notes_array: Array<ToDoItem>) {
        this.notes_array = notes_array;
        this.btn_CreateNote?.addEventListener('click', () => {
            this.onCreateLiElem()
            this.localStorage.setLocalStorage(this.notes_array);
        });

        this.input_Field?.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.onCreateLiElem();
                this.localStorage.setLocalStorage(this.notes_array);
            };
        });

        this.btn_DeleteAll?.addEventListener('dblclick', () => {
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
                tryCounts ++;
            } while (this.notes_array.find(elem => todoItem.id == elem.id) || tryCounts === 5);
            todoItem.text = this.input_Field.value;
            this.createLiElem(todoItem);
            this.notes_array.push(todoItem);
            this.localStorage.setLocalStorage(this.notes_array);
            this.input_Field.value = '';
        } else {
            alert('Please fill out the input field')
        }
    }


    createLiElem(todoItem: ToDoItem) {
        const li_elem: HTMLElement = document.createElement('li');
        const btn_Edit: HTMLElement = document.createElement('button');
        const btn_Delete: HTMLElement = document.createElement('button');
        const btn_Save: HTMLElement = document.createElement('button');
        const btn_Cancel: HTMLElement = document.createElement('button');
        const input_Edit: HTMLInputElement = document.createElement('input') as HTMLInputElement;
        const span_Text: HTMLElement = document.createElement('span');
        const check_Input: HTMLInputElement | null = document.createElement('input') as HTMLInputElement;
        check_Input.type = 'checkbox';

        const div_Note = document.createElement('div') as HTMLDivElement;
        const div_Edit = document.createElement('div') as HTMLDivElement;
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

        this.ul_Note?.appendChild(li_elem);
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

    setTodoItemChecked(todoItem: ToDoItem, check_Input: HTMLInputElement, span_Text: HTMLElement) {
        todoItem.done = check_Input.checked;
        this.checkForCheckedState(check_Input, span_Text);
        this.localStorage.setLocalStorage(this.notes_array);
    }

    saveTodoItem(div_Edit: HTMLDivElement, div_Note: HTMLDivElement, span_Text: HTMLElement, input_Edit: HTMLInputElement) {
        div_Edit.style.display = 'none';
        div_Note.style.display = 'block';
        const indexOfSavedNote = this.notes_array.findIndex(note => note.id.toString() == span_Text.id);
        span_Text.innerText = input_Edit.value;
        if (indexOfSavedNote != -1) {
            this.notes_array[indexOfSavedNote].text = input_Edit.value;
            this.localStorage.setLocalStorage(this.notes_array);
        }
    }

    deleteTodoItem(div_Note: HTMLDivElement, li_elem: HTMLElement, span_Text: HTMLElement) {
        div_Note.style.display = 'none';
        this.ul_Note?.removeChild(li_elem);
        const specificNote = this.notes_array.findIndex(note => note.id.toString() == span_Text.id);
        this.notes_array.splice(specificNote, 1);
        this.localStorage.setLocalStorage(this.notes_array);
    }

    editTodoItem(div_Edit: HTMLDivElement, div_Note: HTMLDivElement, input_Edit: HTMLInputElement, span_Text: HTMLElement) {
        div_Edit.style.display = 'block';
        div_Note.style.display = 'none';
        input_Edit.value = span_Text.innerText;
        this.localStorage.setLocalStorage(this.notes_array);
    }

    checkForCheckedState(check_Input: HTMLInputElement, span_Text: HTMLElement) {
        if (check_Input.checked) {
            span_Text.style.textDecoration = 'line-through';
        } else {
            span_Text.style.textDecoration = 'none';
        }
    }
}
