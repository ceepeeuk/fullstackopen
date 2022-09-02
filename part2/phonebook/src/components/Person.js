const Person = ({ name, number, deleteUser}) => (
    <div>{name} {number} <button onClick={deleteUser}>delete</button></div>
)

export default Person;