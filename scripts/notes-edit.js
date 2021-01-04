'use strict'

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const removeElement = document.querySelector('#remove-note');
const lastEdited = document.querySelector('#last-edited');

const noteId = location.hash.substring(1);
let notes = getSavedNotes();

let note = notes.find((note) => note.id === noteId);

if(!note){
  location.assign('/index.html');
}

titleElement.value = note.title;
bodyElement.value = note.body;
lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;

titleElement.addEventListener('input', (e)=>{

  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  saveNote(notes);
  lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
})

bodyElement.addEventListener('input', (e) =>{
  note.updatedAt = moment().valueOf();
  note.body = e.target.value;
  saveNote(notes);
  lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
})

removeElement.addEventListener('click', ()=>{
  removeNote(note.id);
  saveNote(notes);
  location.assign('/index.html');
})

window.addEventListener('storage', (e)=>{
  if(e.key === 'notes'){
   notes = JSON.parse(e.newValue);

    note = notes.find((note) => note.id === noteId);

    if (!note) {
      location.assign('/index.html');
    }

    titleElement.value = note.title;
    bodyElement.value = note.body;
    lastEdited.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
  }
})



