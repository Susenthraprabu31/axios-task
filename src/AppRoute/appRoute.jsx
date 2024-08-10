// Creating APP route for all components
import { Navigate } from "react-router-dom"
import AddUser from "../Component/addUser"
import EditUser from "../Component/editUser"
import UserList from "../Component/userList"

export default ([
    // to create user
    {
        path:'/addUser',
        element: <AddUser />
    },
    // toedit user
    {
        path:'/editUser/:id',
        element: <EditUser />
    },
    // to display available users
    {
        path:'/',
        element: <UserList/>
    },
    // to navigate users to home page in case of wrong path provided
    {
        path:'*',
        element:<Navigate to='/' />
    }
])