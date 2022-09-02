import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
        .then(({data}) => data)
}

const add = (person) => {
    return axios.post(baseUrl, person)
        .then(({data}) => data);
};

const deleteUser = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
}

const update = (updatedPerson) => {
    return axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson);
}

export default { getAll, add, deleteUser, update }