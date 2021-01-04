'use strict'
let notes = getSavedNotes();

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes,filters);

document.querySelector('#create-note').addEventListener('click',(event)=>{
    const id = uuidv4();
    const timeStamp = moment().valueOf()

    notes.push({
        id,
        title:'',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp,
    })
    saveNote(notes);
    location.assign(`/edit.html#${id}`);
});

document.querySelector('#search-text').addEventListener('input', (event)=>{
filters.searchText = event.target.value;
renderNotes(notes,filters);
})

document.querySelector('#filter-by').addEventListener('change',(event)=>{

    filters.sortBy = event.target.value;
    renderNotes(notes, filters);
})

window.addEventListener('storage', (e)=>{
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue);
        renderNotes(notes, filters);
    }
})








