import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {  Navigate } from 'react-router-dom'
import {  BrowserRouter as Router } from 'react-router-dom'
import { Routes,Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Register from './pages/Register'
import SignIn from './pages/Signin'
import AddHotel from './pages/AddHotel'
import { useAppContext } from './contexts/AppContext'
import MyHotels from './pages/MyHotels'
import EditHotel from './pages/EditHotel'
import Search from './pages/Search'
import Details from './pages/Details'
import Booking from './pages/Booking'
import MyBookings from './pages/MyBookings'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
  const {isLoggedIn}=useAppContext()

  return (
   <div>
    <Router >
      <Routes>
        <Route path='/' element={<Layout >
          <Home/>
        </Layout>}/>
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />

        <Route path='/register' element={
          <Layout>
            <Register/>
          </Layout>
          }/>

          <Route
          path="/detail/:hotelId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
          <Route path='/sign-in' element={
            <Layout>
              <SignIn/>
            </Layout>
          }/>
          
        {
          isLoggedIn && 
          <>
              <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
          <Route path='/add-hotel'
          element={
            <Layout>
              <AddHotel/>
            </Layout>
          }
          />
             <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
             <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                 <EditHotel/>
                </Layout>
              }
            />
          </>
        }
        <Route path='*' element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
   </div>
      
  )
}

export default App