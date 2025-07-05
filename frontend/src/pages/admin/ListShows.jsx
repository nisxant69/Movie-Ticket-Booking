import React, { useEffect, useState } from 'react'
import { dummyShowsData, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/Loading'
import Title from '../../components/admin/Title'
import { StarIcon, CalendarIcon, ClockIcon, UsersIcon } from 'lucide-react'
import { formatDateTime } from '../../lib/formatTime'


const ListShows = () => {

  const currency = import.meta.env.VITE_CURRENCY
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
      try {
            // Using the dummy dashboard data which contains show information
            setShows([{
              movie: dummyShowsData[0],
              showDateTime: "2025-10-01T14:30:00.00Z",
              showPrice: 280,
              occupiedSeats: {
                A1: "user_1",
                B1: "user_2",
                C1: "user_3",
              }
            }]);
            setLoading(false);
      } catch (error) {
            console.error(error);
      }
  }

    useEffect(() => {
      getAllShows();
    }, []);

  return !loading ? (
    <>
      <Title text1="List" text2="Shows"/>
      <div className='max-w-4xl mt-6 overflow-x-auto'>
        <table className='w-full border-collapse rounded-md overflow-hidden text-nowrap'>
          <thead>
            <tr className='bg-primary/20 text-left text-white'>
              <th className='p-2 font-medium pl-5'>Movie Name</th>
              <th className='p-2 font-medium'>Show Time</th>
              <th className='p-2 font-medium'>Total Bookings</th>
              <th className='p-2 font-medium'>Earnings</th>
            </tr>
          </thead>
                    <tbody className="text-sm font-light" >
            {shows.map((show, index) => (
              <tr key={index} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
              <td className="p-2 min-w-45 pl-5">{show.movie.title}</td>
              <td className="p-2">{formatDateTime(show.showDateTime)}</td>
              <td className="p-2">{Object.keys(show.occupiedSeats || {}).length}</td>
              <td className="p-2">{currency}{Object.keys(show.occupiedSeats || {}).length * show.showPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  ) : <Loading/>
}

export default ListShows