import React, {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Header from './Component/Header/Header';
import './App.scss';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateRoom from './Pages/CreateRoom';
import Rooms from './Pages/Rooms/Rooms';
import Room from './Pages/Room/Room';
import EditRoom from './Pages/EditRoom/EditRoom';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/rooms/create' element={<CreateRoom />} />
        <Route path='/rooms' element={<Rooms />} />
        <Route path='/rooms/edit/:id' element={<EditRoom />} />
        <Route path='/rooms/all/:id' element={<Room />} />
      </Routes>
    </Router>
  );
};

export default App;
