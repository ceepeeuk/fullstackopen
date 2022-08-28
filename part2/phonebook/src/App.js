import {useState} from 'react'
import NameFilter from "./components/NameFilter";
import AddNew from "./components/AddNew";
import Person from "./components/Person";

const App = () => {
    let initialData = [
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ];
    const [persons, setPersons] = useState(initialData);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const [filteredPersons, setFilteredPersons] = useState(initialData);

    const addName = (event) => {
        event.preventDefault();
        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} is already in the phonebook`);
        } else {
            let newPerson = {name: newName, number: newNumber, id: persons.length + 1};
            setPersons(persons.concat(newPerson));
            setFilteredPersons(filteredPersons.concat(newPerson));
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setNewFilter(event.target.value)
        const filterInput = event.target.value.toLowerCase();

        if (filterInput === '') {
            setFilteredPersons(persons);
        } else {
            const filtered = persons.filter(person => person.name.toLowerCase().startsWith(filterInput));
            setFilteredPersons(filtered);
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            < NameFilter newFilter={newFilter} handleFilterChange={handleFilterChange} />
            <h2>Add a new</h2>
            <AddNew
                addName={addName}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            {filteredPersons.map(person => <Person name={person.name} number={person.number} key={person.id} />)}
        </div>
    )
}

export default App