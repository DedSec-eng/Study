document.addEventListener('DOMContentLoaded', function() {
    const columns = document.querySelectorAll('.column');
    const addButtons = document.querySelectorAll('.add-button');
    const editModal = document.getElementById('edit-modal');
    const editTextArea = document.getElementById('edit-textarea');
    const saveButton = document.getElementById('save-button');
    const closeButton = document.querySelector('.close-button');

    let draggedNote = null;
    let editingNote = null;

    // Функция для создания новой заметки
    function createNote(text, columnId) {
        const note = document.createElement('div');
        note.classList.add('note');
        note.draggable = true; // Разрешаем перетаскивание

        const noteText = document.createElement('p');
        noteText.textContent = text;
        note.appendChild(noteText);

        const noteButtons = document.createElement('div');
        noteButtons.classList.add('note-buttons');

        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', () => openEditModal(note, text));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => note.remove());

        noteButtons.appendChild(editButton);
        noteButtons.appendChild(deleteButton);
        note.appendChild(noteButtons);

        note.addEventListener('dragstart', dragStart);
        return note;
    }


    // Обработчики событий для Drag and Drop
    function dragStart(event) {
        draggedNote = this; // Запоминаем, какой элемент перетаскиваем
    }

    function dragOver(event) {
        event.preventDefault(); // Необходимо для разрешения drop
    }

    function drop(event) {
        event.preventDefault();
        const targetColumn = this.closest('.column'); // Находим колонку, куда перетаскиваем
        if (targetColumn && draggedNote) {
            targetColumn.querySelector('.notes-container').appendChild(draggedNote);
            draggedNote = null; // Сбрасываем draggedNote
        }
    }

    // Обработчики для кнопок "Добавить задачу"
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const columnId = this.dataset.column;
            const newNoteText = prompt('Введите текст для новой заметки:');
            if (newNoteText) {
                const note = createNote(newNoteText, columnId);
                document.getElementById(`${columnId}-notes`).appendChild(note);
            }
        });
    });

    // Обработчики для колонок (Drag and Drop)
    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('drop', drop);
    });


    // Модальное окно редактирования
    // ... (Остальной код вашего todo-list.js)

    const addNoteModal = document.getElementById('add-note-modal');
    const addNoteTextArea = document.getElementById('add-note-textarea');
    const addNoteButton = document.getElementById('add-note-button');
    const addNoteCloseButton = document.getElementById('add-note-close');

    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const columnId = this.dataset.column;
            addNoteModal.style.display = 'block'; // Показываем диалог

            addNoteButton.onclick = () => { // Обработчик для кнопки "Добавить" в диалоге
                const newNoteText = addNoteTextArea.value; // Получаем текст из textarea
                if (newNoteText) {
                    const note = createNote(newNoteText, columnId);
                    document.getElementById(`${columnId}-notes`).appendChild(note);
                    saveData(); // Сохраняем данные
                }
                addNoteModal.style.display = 'none'; // Скрываем диалог
                addNoteTextArea.value = ''; // Очищаем textarea
            };

            addNoteCloseButton.onclick = () => { // Обработчик для кнопки "Закрыть"
                addNoteModal.style.display = 'none'; // Скрываем диалог
                addNoteTextArea.value = ''; // Очищаем textarea
            };
        });
    });

    window.addEventListener('click', (event) => { // Закрытие диалога при клике вне его
        if (event.target === addNoteModal) {
            addNoteModal.style.display = 'none';
            addNoteTextArea.value = ''; // Очищаем textarea
        }
    });

    closeButton.addEventListener('click', () => {
        editModal.style.display = 'none';
        editingNote = null;
    });

    saveButton.addEventListener('click', () => {
        if (editingNote) {
            editingNote.querySelector('p').textContent = editTextArea.value;
            editModal.style.display = 'none';
            editingNote = null;
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === editModal) {
            editModal.style.display = 'none';
            editingNote = null;
        }
    });
});

