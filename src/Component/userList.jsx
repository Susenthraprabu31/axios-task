import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../Services/appServices'
import { FunctionalContext } from '../context/functionContext';
import TopBar from './topBar'
import {useNavigate } from 'react-router-dom';

function userList() {
    // calling defined usestate from context
    let { users, setUsers } = useContext(FunctionalContext);
    // initializing navigation
    let navigate = useNavigate();
    // hook  defined to call axios getAllUsers when setUsers changes happens
    useEffect(() => {
        getAllUsers()
            .then(response => { setUsers(response.data) })
            .catch(error => console.error('Error fectching data:', error));
    }, [setUsers]);
    // defined to handle delete users 
    const handleDelete = async (id) => {
        try {
            // axios function call
            await deleteUser(id); // Axios call to delete user
            const response = await getAllUsers(); // Fetch updated list after deletion
            setUsers(response.data); // Update context with new user list
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    return (
        <>
        {/* nav bar */}
        <TopBar />
        {/* table to display list users */}
            <div className="container mt-4 userList">
                <table className="table table-bordered table-striped userList">
                    <thead className="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Website</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}</td>
                                <td>{user.website}</td>
                                <td>{user.company.name}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm del-btn" onClick={() => navigate(`/editUser/${user.id}`)}>Edit</button>
                                    &nbsp;
                                    <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm del-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default userList