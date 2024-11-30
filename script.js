const addnotbtn = document.getElementById('addnotbtn');
const newNote = document.getElementById('newnote');
const notscontainer = document.getElementById('notscontainer');
const Toggle = document.getElementById('Toggle');

let editingNoteIndex = null;

window.addEventListener('load', () => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach((note, index) => createNoteElement(note, index));
});

addnotbtn.addEventListener('click', () => {
    const noteText = newNote.value.trim();
    if (noteText === '') {
        alert('Please enter a note.');
        return;
    }
    if (editingNoteIndex !== null) {
        updateNoteInLocalStorage(noteText, editingNoteIndex);
        resetInput();
    } else {
        createNoteElement(noteText);
        saveNoteInLocalStorage(noteText);
    }
    newNote.value = '';
});

function createNoteElement(text, index = null) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';

    const noteText = document.createElement('pre');
    noteText.textContent = text;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => editNote(text, index || getNoteIndex(text)));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        noteDiv.remove();
        deleteNoteFromLocalStorage(text);
    });

    noteDiv.appendChild(noteText);
    noteDiv.appendChild(editBtn);
    noteDiv.appendChild(deleteBtn);
    notscontainer.appendChild(noteDiv);
}

function saveNoteInLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNoteInLocalStorage(newText, index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes[index] = newText;
    localStorage.setItem('notes', JSON.stringify(notes));

    notscontainer.innerHTML = '';
    notes.forEach((note, i) => createNoteElement(note, i));
    editingNoteIndex = null;
}

function deleteNoteFromLocalStorage(note) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedNotes = notes.filter(n => n !== note);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
}

function editNote(text, index) {
    newNote.value = text;
    addnotbtn.textContent = 'Update Note';
    editingNoteIndex = index;
}

function getNoteIndex(text) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return notes.indexOf(text);
}

function resetInput() {
    newNote.value = '';
    addnotbtn.textContent = 'Add Note';
}

Toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});
