import React from 'react'
import { Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import Home from '../pages/Home'
import FormLogin from '../pages/FormLogin'
import FormRegister from '../pages/FormRegister'
import UserContext from '../context/userContext'
import { useState } from 'react'
import RouteProtected from './RouteProtected'

function App() {

    const [isLoged, setIsLoged] = useState(
        () => window.localStorage.getItem("loggedUser") !== null
      );

  return (
    <BrowserRouter>
        <UserContext.Provider value={{isLoged, setIsLoged}}> 
            <Routes>
                <Route path='/' element={ <Navigate to="/login" /> }/>
                <Route element={<FormLogin/>} path='/login'/>
                <Route element={<FormRegister/>} path='/register'/>
                <Route element={<RouteProtected session={isLoged}/>} >
                    <Route element={<Home/>} path='/home' />
                </Route>
            </Routes>
        </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App