import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ClockIcon } from 'lucide-react';
// import isoTimeFormat from '../lib/isoTimeFormat';

const SeatLayout = () => {
  //get id and date from url using params
  const {id, date} = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [show, setShow] = useState(null);
  const navigate = useNavigate();

  // Function to fetch show data from the above id

  const getShow = async()=>{
    console.log('Debug - ID:', id, 'Date:', date);
    const show = dummyShowsData.find(show=> show._id === id)
    console.log('Debug - Found show:', show);
    if(show){
      console.log('Debug - Available dates:', Object.keys(dummyDateTimeData));
      console.log('Debug - Date exists?', !!dummyDateTimeData[date]);
      setShow({
        movie:show,
        dateTime:dummyDateTimeData
      })
    }
  }

  useEffect(()=>{
    getShow();
  },[])

  return show ? (
    <div className='flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-30 md:pt-50'>
      {/* Available Timing */}
      <div className='w-60 bg-primary/10 border border-primary/20 rounded-lg py-10 h-max md:sticky md:top-30'>
      <p className='text-lg font-semibold px-6'>Available Timings</p>
      <div className='mt-5 space-y-1'>
        {show.dateTime[date] ? show.dateTime[date].map((item, index)=>(
          <div 
            key={index}
            onClick={() => setSelectedTime(item)}
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <ClockIcon className='w-4 h-4'/>
            <p className='text-sm'>{new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        )) : <p className='px-6 text-red-400'>No showtimes available for this date</p>}
      </div>
      </div>

      {/* Seat Layout */}
      <div></div>
    </div>
  ) : (
    <Loading/>
  )
}

export default SeatLayout