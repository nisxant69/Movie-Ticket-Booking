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
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'

const App = () => {
  const isAdminRoute = useLocation().pathname.startsWith('/admin')
  return (
    <>
    <Toaster />
    {!isAdminRoute && <Navbar /> }
    {/* Define the routes for the application */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/movies/:id/:date" element={<SeatLayout />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/favorite" element={<Favorite />} />

      {/* Admin routes */}
      <Route path='/admin/*' element={<Layout/>}>
        <Route index element={<Dashboard/>} />
        <Route path='add-shows' element={<AddShows/>} />
        <Route path='list-shows' element={<ListShows/>} />
        <Route path='list-bookings' element={<ListBookings/>} />
      </Route>
    </Routes>
    {!isAdminRoute && <Footer /> }
    </>
  )
}

export default App