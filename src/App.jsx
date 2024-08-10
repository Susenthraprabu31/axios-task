import React from 'react'
import UserList from './Component/userList'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import appRoute from './AppRoute/appRoute'
import { FunctionProvider } from './context/functionContext'

let router = createBrowserRouter(appRoute);

function App() {
  return (
    <>
      <FunctionProvider>
        <RouterProvider router={router} >
          <UserList />
        </RouterProvider>
      </FunctionProvider>
    </>
  )
}

export default App