import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Dashboard = () => {
  return (
    <div className="flex h-full">
      <Sidebar/>
      <div className="flex-1 p-4">
        <Header />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <h1>Chart1</h1>
        <h1>Chart2</h1>
        <h1>Chart3</h1>
        <h1>Chart4</h1>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;
