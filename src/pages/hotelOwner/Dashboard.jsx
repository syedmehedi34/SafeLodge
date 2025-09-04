/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Title from "../../components/Title";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [dashBoardData, setDashboardData] = useState();

  return (
    <div>
      <Title
        align="left"
        font="outfit"
        title="Dashboard"
        subTitle="Monitor your room listings, track bookings and analyze revenue—all in one place. Stay updated with real-time insights to ensure smooth operations."
      />

      <div className="flex gap-4 my-8">
        {/* total bookings  */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            className="max-sm:hidden h-10"
            src={assets.totalBookingIcon}
            alt=""
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Bookings</p>
            <p className="text-neutral-400 text-base">0</p>
          </div>
        </div>

        {/* total revenue portion */}
        <div className="bg-primary/3 border border-primary/10 rounded flex p-4 pr-8">
          <img
            className="max-sm:hidden h-10"
            src={assets.totalRevenueIcon}
            alt=""
          />
          <div className="flex flex-col sm:ml-4 font-medium">
            <p className="text-blue-500 text-lg">Total Revenue</p>
            <p className="text-neutral-400 text-base">$ 0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
