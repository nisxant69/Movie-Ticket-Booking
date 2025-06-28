import React from 'react'
import { Route,Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/home'
import MovieDetails from './pages/MovieDetails'
import Movies from './pages/Movies'
import MyBookings from './pages/MyBookings'
import SeatLayout from './pages/SeatLayout'
import Favorite from './pages/Favorite'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar /> }
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies:id" element={<MovieDetails />} />
      <Route path="/movies/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favorite" element={<Favorite />} />
    </Routes>
    {!isAdminRoute && <Footer /> }
    </>
  )
}

export default App