
import React, { createContext, useState } from 'react';

const FunctionalContext = createContext();

const FunctionProvider = ({ children }) => {
//  users usestate 
  const [users, setUsers] = useState([]);
//   create user usestate
  const [formData, setFormData] = useState({
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
  });
// edit user usestate
  const [editUser, setEditUser] = useState({
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
  });

  return (
    <FunctionalContext.Provider value={{ users, setUsers, formData, setFormData, editUser, setEditUser }}>
      {children}
    </FunctionalContext.Provider>
  );
};

export { FunctionProvider, FunctionalContext };
