import axios from "axios";

// API url to fetch data
const API_URL = 'https://66a7ad2253c13f22a3d0af22.mockapi.io/api/users';
// To get all users
const getAllUsers = () => {
    return axios.get(API_URL);
}
// to get users by id
const getUserById = (id) => {
    return axios.get(`${API_URL}/${id}`);
}
// to create new users
const createUser = (userData) => {
    return axios.post(API_URL, userData);
}
// to update user
const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/${id}`, userData);
}
// to delete user
const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
}

export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}