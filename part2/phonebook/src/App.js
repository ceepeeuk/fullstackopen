import {useState, useEffect} from 'react'
import NameFilter from "./components/NameFilter";
import AddNew from "./components/AddNew";
import Person from "./components/Person";
import personService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newFilter, setNewFilter] = useState('')

    const [filteredPersons, setFilteredPersons] = useState([]);

    useEffect(() => {
        personService.getAll()
            .then(data => {
                setPersons(data);
                setFilteredPersons(data);
            });
    }, []);

    const addName = (event) => {
        event.preventDefault();
        let existing = persons.find((person) => person.name === newName);
        if (existing) {
            const update = window.confirm(`${newName} is already in the phonebook, replace the old number with a new one?`);
            if (update) {
                const updatedPerson = {name: newName, number: newNumber, id: existing.id};
                personService.update(updatedPerson)
                    .then(() => {
                        setPersons([ ...persons.filter(p => p.id !== updatedPerson.id), updatedPerson]);
                        setFilteredPersons([...filteredPersons.filter(p => p.id !== updatedPerson.id), updatedPerson])
                    });
            }
        } else {
            let newPerson = {name: newName, number: newNumber};
            personService.add(newPerson).then(data => {
                setPersons(persons.concat(data));
                setFilteredPersons(filteredPersons.concat(data));
            });
        }
    }

    const deleteName = (id) => {
        personService.deleteUser(id)
            .then(() => {
                setPersons(persons.filter(p => p.id != id));
                setFilteredPersons(filteredPersons.filter(p => p.id != id));
            });
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
            {
                filteredPersons.map(person => <Person name={person.name}
                                                   number={person.number}
                                                   deleteUser={() => deleteName(person.id)}
                                                   key={person.id} />)
            }
        </div>
    )
}

export default App