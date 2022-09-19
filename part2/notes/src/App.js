import Note from './components/Note'
import { useState, useEffect } from "react";
import notesService from "./services/notes";
import Notification from "./components/Notification";
import './index.css';

const App = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('a new note...');
    const [showAll, setShowAll] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        notesService.getAll()
            .then(({data}) => setNotes(data));
    }, [])

    const updateNotification = (message) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 1000);

    };

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
        }

        notesService.create(noteObject).then(() => {
            setNotes(notes.concat(noteObject));
            setNewNote('')
        })
        .catch((e) => {
            const message = e?.response?.data?.error;
            updateNotification(message);
        });
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value);
    }

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important);

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all' }
                </button>
            </div>
            <ul>
                {notesToShow.map(note =>
                    <Note key={note.id} note={note} />
                )}
            </ul>
            <form onSubmit={addNote}>
                <input
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App