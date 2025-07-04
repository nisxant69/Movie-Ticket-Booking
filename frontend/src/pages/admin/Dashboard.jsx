import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, UsersIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';

const Dashboard = () => {

  const currency = import.meta.env.VITE_CURRENCY;
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });
  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: "Total Bookings", value: dashboardData.totalBookings || "0", icon: ChartLineIcon },
    { title: "Total Revenue", value: `${currency}${dashboardData.totalRevenue || "0"}`, icon: CircleDollarSignIcon },
    { title: "Active Shows", value: dashboardData.activeShows.length || "0", icon: PlayCircleIcon },
    { title: "Total Users", value: dashboardData.totalUser || "0", icon: UsersIcon }
  ];

  const fetchDashboardData = async () => {
    setDashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <div className="space-y-6">
      <Title text1="Admin" text2="Dashboard" />
      
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{card.title}</p>
                <p className="text-2xl font-bold text-white mt-2">{card.value}</p>
              </div>
              <card.icon className="w-8 h-8 text-primary" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Shows Section */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Active Shows</h3>
        <div className="space-y-3">
          {dashboardData.activeShows.slice(0, 5).map((show, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded">
              <div className="flex items-center space-x-3">
                <img 
                  src={show.movie.poster_path} 
                  alt={show.movie.title}
                  className="w-12 h-12 rounded object-cover"
                />
                <div>
                  <p className="text-white font-medium">{show.movie.title}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(show.showDateTime).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-primary font-semibold">{currency}{show.showPrice}</p>
                <p className="text-gray-400 text-sm">
                  {Object.keys(show.occupiedSeats).length} seats booked
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : <Loading />;
};

export default Dashboard;
