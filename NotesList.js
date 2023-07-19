import React from 'react'
import { useState ,useEffect} from 'react';
function NotesList() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (newNoteText.trim() === '') {
      return;
    }

    const newNote = {
      id: Date.now(),
      text: newNoteText.trim(),
      date: new Date().toLocaleDateString(),
    };

    setNotes([...notes, newNote]);
    setNewNoteText('');
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };
  return (
    <div className="App">
      <header>
        <h1>Notesmaster</h1>
      </header>
      <main>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note">
              <span>{note.text}</span>
              <div className="note-footer">
                <small>{note.date}</small>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className="note-input">
          <textarea
            placeholder="Enter your note here..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          ></textarea>
          <button onClick={addNote}>Add Note</button>
        </div>
      </main>
    </div>
  );
}


export default NotesList