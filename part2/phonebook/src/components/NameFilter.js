const NameFilter = ({ newFilter, handleFilterChange }) => (
    <div>
        filter: <input value={newFilter} onChange={handleFilterChange}/>
    </div>
)

export default NameFilter