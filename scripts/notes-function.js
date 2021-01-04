'use strict'

// read existing notes from localstorage 

const getSavedNotes = () => {

  const notesJSON = localStorage.getItem('notes');

  try {
    return notesJSON ? JSON.parse(notesJSON) : []; 
  } catch (error) {
    return [];
  }
  
}
//save the notes to local storage 

const saveNote = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
}

// remove a note from the list 

const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if(noteIndex > -1){
    notes.splice(noteIndex, 1);
  }
}
// generate the DOM structure for a note 
const generateNoteDOM = (element) => {
  
  const divTag = document.createElement('div');
  const aTag= document.createElement('a');
  const buttonElement = document.createElement('button');
  const pTag = document.createElement('p');

  aTag.setAttribute('href', `/edit.html#${element.id}`);

  aTag.classList.add('list-item__title');
  pTag.classList.add('list-item__subtitle');
  buttonElement.classList.add('list-item__button');

  buttonElement.textContent = ' x ';
  divTag.appendChild(buttonElement);

  buttonElement.addEventListener('click', () =>{
    removeNote(element.id);
    saveNote(notes);
    renderNotes(notes, filters);
  })

  if (element.title === "") {
    aTag.textContent = `Please add Note...`;
    divTag.classList.add('list-item__error');
  } else{
    aTag.textContent = `${element.title}`;
    divTag.classList.add('list-item');
  }
    divTag.appendChild(aTag);
    pTag.textContent = `Last edited ${moment(element.updatedAt).fromNow()}`;
    divTag.appendChild(pTag);
    return divTag; 
}

//sort note by one of three ways 

const sortNotes = (notes, sortBy) => {

  if (sortBy === 'byEdited'){
    return notes.sort((a, b) => {
      if(a.updatedAt > b.updatedAt){
        return -1 ;
      }else if (a.updatedAt < b.updatedAt){
        return 1;
      }else{
        return 0;
      }
    })
  } else if (sortBy === 'byCreated'){
      return notes.sort((a, b) => {
        if (a.createdAt > b.createdAt){
          return -1;
        }else if(a.createdAt < b.createdAt){
          return 1;
        }else{
          return 0;
        }
      })
  } else if (sortBy === 'alphabetical'){
    return notes.sort((a, b) => {
      if(a.title.toLowerCase() < b.title.toLowerCase()){
        return -1;
      }else if(a.title.toLowerCase() > b.title.toLowerCase()){
        return 1;
      }else{
        return 0;
      } 
    })
  }else{
    return notes;
  }
}

//render application notes

const renderNotes = (notes, filters) => {
  const notesElement = document.querySelector('#notes');
  notes = sortNotes(notes, filters.sortBy);
  const filteredNotes = notes.filter((element) => element.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  notesElement.innerHTML = '';

  if(filteredNotes.length > 0){
    filteredNotes.forEach((element) => {
    const p = generateNoteDOM(element);
    notesElement.appendChild(p);
  })
  }else{
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No notes to show';
    emptyMessage.classList.add('empty-message');
    notesElement.appendChild(emptyMessage);


  }

}