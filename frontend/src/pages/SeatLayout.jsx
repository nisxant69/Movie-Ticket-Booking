import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { assets, dummyDateTimeData, dummyShowsData } from '../assets/assets';
import Loading from '../components/Loading';
import { ClockIcon } from 'lucide-react';
import BlurCircle from '../components/BlurCircle';
// import isoTimeFormat from '../lib/isoTimeFormat';

const SeatLayout = () => {
  const groupRows =[["A","B"],["C","D"],["E","F"],["G","H"],["I","J"],]

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

  const handleseatClick = (seatId) =>{
    if (!selectedTime) {
    return toast("Please select time first")
    }
    if(!selectedSeats.includes(seatId) && selectedSeats.length > 4){
    return toast("You can only select 5 seats")
    }
    setSelectedSeats(prev => prev.includes(seatId) ? prev.filter(seat => seat !==
    seatId) : [...prev, seatId])
}

const renderSeats = (row, count = 9) => (
  <div key={row} className="flex gap-2 mt-2">
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Array.from({ length: count }, (_, i) => {
        const seatId = `${row}${i + 1}`;
        return (
          <button
            key={seatId}
            onClick={() => handleSeatClick(seatId)}
            className={`h-8 w-8 rounded border border-primary-60 cursor-pointer ${
              selectedSeats.includes(seatId) && "bg-primary text-white"
            }`}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  </div>
);

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
            key={item.time}
            onClick={() => setSelectedTime(item)}
            className={`flex items-center gap-2 px-6 py-2 w-max rounded-r-md cursor-pointer transition ${selectedTime?.time === item.time ? 'bg-primary text-white' : 'hover:bg-primary/20'}`}>
            <ClockIcon className='w-4 h-4'/>
            <p className='text-sm'>{new Date(item.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        )) : <p className='px-6 text-red-400'>No showtimes available for this date</p>}
      </div>
      </div>

      {/* Seat Layout */}
      <div className= 'relative flex-1 flex flex-col items-center max-md:mt-16'>
        <BlurCircle top="-100px" left="-100px"/>
        <BlurCircle bottom="0px" right="0px"/>
        <h1 className='text-2xl font-semibold mb-4'>Select Your Seat</h1>
        <img src={assets.screenImage} alt="screen"/>
        <p className='text-gray-400 text-sm mb-4'>Screen Side</p>
        <div className= 'flex flex-col items-center mt-16 text-xs text-gray-300'>
<div className='grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6'>
{groupRows[0].map(row => renderSeats(row) )}
</div>
</div>
      </div>
    </div>
  ) : (
    <Loading/>
  )
}

export default SeatLayout