import React, { useContext } from 'react';
import TopBar from './topBar';
import { FunctionalContext } from '../context/functionContext';
import { createUser } from '../Services/appServices';
import { useNavigate } from 'react-router-dom';

function AddUser() {
    // calling defined usestate from context
    let { formData, setFormData } = useContext(FunctionalContext);
    // initiating navigation
    let navigate = useNavigate();
    // function to handle change in input field
    function handleChange(event) {
        const { name, value } = event.target;
        const nameParts = name.split('.'); // Split the name to handle nested fields

        if (nameParts.length === 1) {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        } else if (nameParts.length === 2) {
            setFormData(prevData => ({
                ...prevData,
                [nameParts[0]]: {
                    ...prevData[nameParts[0]],
                    [nameParts[1]]: value
                }
            }));
        } else if (nameParts.length === 3) {
            setFormData(prevData => ({
                ...prevData,
                [nameParts[0]]: {
                    ...prevData[nameParts[0]],
                    [nameParts[1]]: {
                        ...prevData[nameParts[2]],
                        [nameParts[2]]: value
                    }
                }
            }))
        }
    }
    // handle submit function is called to set the users data
    async function handleSubmit(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        try {
            await createUser(formData);
            setFormData(
                {
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
                }
            )
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
                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Street</label>
                        <input type="text" className="form-control" name="address.street" value={formData.address.street} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Suite</label>
                        <input type="text" className="form-control" name="address.suite" value={formData.address.suite} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input type="text" className="form-control" name="address.city" value={formData.address.city} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Zipcode</label>
                        <input type="text" className="form-control" name="address.zipcode" value={formData.address.zipcode} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Geo Locaiton - Lat,Long</label>
                        <input type="text" className="form-control" name="address.geo" value={formData.address.geo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Website</label>
                        <input type="text" className="form-control" name="website" value={formData.website} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Name</label>
                        <input type="text" className="form-control" name="company.name" value={formData.company.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Catch Phrase</label>
                        <input type="text" className="form-control" name="company.catchPhrase" value={formData.company.catchPhrase} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Company Business</label>
                        <input type="text" className="form-control" name="company.bs" value={formData.company.bs} onChange={handleChange} required />
                    </div>
                    <br />
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AddUser;