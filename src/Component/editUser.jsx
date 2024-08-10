import React, { useEffect } from 'react'
import TopBar from './topBar'
import { useParams } from 'react-router-dom'
import { useContext } from 'react';
import { FunctionalContext } from '../context/functionContext';
import { getUserById, updateUser } from '../Services/appServices';
import { useNavigate } from 'react-router-dom';

function editUser() {
    // calling defined usestate from context
    let { editUser, setEditUser } = useContext(FunctionalContext);
    // getting id value of the user from url path
    let { id } = useParams();
    // initiating navigation
    let navigate = useNavigate();
    // useEffect hook defined to handle data when id field is changed
    useEffect(() => {
        // axios function called to fetch data
        getUserById(id)
            .then(response => setEditUser(response.data))
            .catch(error => console.error('Error fecting user:', error));
    }, [id])

    // function handle change is used to handle the input changes
    function handleChange(event) {
        const { name, value } = event.target;
        const nameParts = name.split('.'); // Split the name to handle nested fields

        if (nameParts.length === 1) {
            setEditUser(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (nameParts.length === 2) {
            setEditUser(prevData => ({
                ...prevData,
                [nameParts[0]]: {
                    ...prevData[nameParts[0]],
                    [nameParts[1]]: value
                }
            }));
        }
    }
    // handleSubmit function is used to save the updated data
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            // axios function call
            await updateUser(id, editUser);
            setEditUser({
                id: '',
                name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: ''
                },
                phone: '',
                website: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: ''
                }
            })
            navigate('/')
        } catch (error) {
            console.error('Error creating user', error);
        }
    }

    return (
        <>
        {/* nav bar */}
            <TopBar />
            {/* users form */}
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" name="name" value={editUser.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={editUser.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={editUser.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input type="text" className="form-control" name="address.street" value={editUser.address.street} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Suite</label>
                        <input type="text" className="form-control" name="address.suite" value={editUser.address.suite} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" name="address.city" value={editUser.address.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" name="address.zipcode" value={editUser.address.zipcode} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Geo Locaiton - Lat,Long</label>
                        <input type="text" className="form-control" name="address.geo" value={editUser.address.geo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" name="phone" value={editUser.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input type="text" className="form-control" name="website" value={editUser.website} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" name="company.name" value={editUser.company.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Catch Phrase</label>
                        <input type="text" className="form-control" name="company.catchPhrase" value={editUser.company.catchPhrase} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Business</label>
                        <input type="text" className="form-control" name="company.bs" value={editUser.company.bs} onChange={handleChange} required />
                    </div>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary submit-btn">Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default editUser