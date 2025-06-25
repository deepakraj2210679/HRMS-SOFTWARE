import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [employeeCount, setEmployeeCount] = useState(0);
  const [activeEmployeeCount, setActiveEmployeeCount] = useState(0);
  const [onboardingCount, setOnboardingCount] = useState(0);
  const [recentEmployees, setRecentEmployees] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const fetchDashboardData = async () => {
      try {
        const empRes = await axios.get("https://hrms-software.onrender.com/getEmployee");
        const onboardRes = await axios.get("https://hrms-software.onrender.com/getUsers");

        setEmployeeCount(empRes.data.length);
        setActiveEmployeeCount(empRes.data.filter(emp => emp.EMPLOYEE_ACTIVE_STATUS).length);
        setOnboardingCount(onboardRes.data.length);

        const sortedEmployees = [...empRes.data].sort(
          (a, b) => new Date(b.DATE_OF_JOINING) - new Date(a.DATE_OF_JOINING)
        ).slice(0, 5);
        setRecentEmployees(sortedEmployees);
      } catch (error) {
        toast.error("Error loading dashboard data");
      }
    };

    fetchDashboardData();
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <div className="p-10 bg-gradient-to-tr from-sky-50 to-yellow-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-3xl font-bold font-sans text-indigo-800"> Dashboard</div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-700">{formattedTime}</div>
          <div className="text-md text-gray-500">{formattedDate}</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="rounded-xl shadow-md p-6 text-white bg-gradient-to-br from-blue-500 to-blue-700 hover:scale-105 transition-transform duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"> Total Employees</h3>
              <p className="text-4xl mt-1">{employeeCount}</p>
            </div>
           
          </div>
          <Link to="/employees" className="text-sm mt-4 block text-white underline hover:opacity-80">
            View all employees →
          </Link>
        </div>

        <div className="rounded-xl shadow-md p-6 text-white bg-gradient-to-br from-green-400 to-green-600 hover:scale-105 transition-transform duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"> Active Employees</h3>
              <p className="text-4xl mt-1">{activeEmployeeCount}</p>
              <p className="text-sm">{employeeCount > 0 ? `${Math.round((activeEmployeeCount / employeeCount) * 100)}%` : '0%'}</p>
            </div>
            
          </div>
          <Link to="/employees" className="text-sm mt-4 block text-white underline hover:opacity-80">
            View active employees →
          </Link>
        </div>

        <div className="rounded-xl shadow-md p-6 text-white bg-gradient-to-br from-yellow-400 to-yellow-600 hover:scale-105 transition-transform duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2"> Onboarding Pending</h3>
              <p className="text-4xl mt-1">{onboardingCount}</p>
            </div>
            
          </div>
          <Link to="/onboarding" className="text-sm mt-4 block text-white underline hover:opacity-80">
            Process onboarding →
          </Link>
        </div>
      </div>

      {/* Recent Employees */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-indigo-700">📋 Recently Onboarded Employees</h2>
          <Link to="/employees" className="text-indigo-600 hover:underline text-sm">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gradient-to-r from-teal-400 to-sky-500 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Department</th>
              <th className="px-4 py-2 text-left">Designation</th>
              <th className="px-4 py-2 text-left">Joining</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
            <tbody>
              {recentEmployees.length > 0 ? (
                recentEmployees.map((emp, idx) => (
                  <tr key={idx} className="border-t hover:bg-blue-50">
                    <td className="px-4 py-2">{emp.NAME}</td>
                    <td className="px-4 py-2">{emp.EMPLOYEE_ID}</td>
                    <td className="px-4 py-2">{emp.DEPARTMENT}</td>
                    <td className="px-4 py-2">{emp.DESIGNATION}</td>
                    <td className="px-4 py-2">{emp.DATE_OF_JOINING?.split("T")[0]}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${emp.EMPLOYEE_ACTIVE_STATUS ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {emp.EMPLOYEE_ACTIVE_STATUS ? "Active" : "Inactive"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">No recent employees</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      {/* Quick Actions */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <Link
    to="/onboarding"
    className="p-4 bg-violet-300 text-violet-900 font-semibold rounded-lg hover:bg-violet-500 transition"
  >
     Add Onboarding
  </Link>
  <Link
    to="/employees"
    className="p-4 bg-emerald-300 text-emerald-900 font-semibold rounded-lg hover:bg-emerald-500 transition"
  >
     Manage Employees
  </Link>
  <Link
    to="/employees"
    className="p-4 bg-rose-300 text-rose-900 font-semibold rounded-lg hover:bg-rose-500 transition"
  >
     Update Status
  </Link>
</div>

    </div>
  );
};

export { Dashboard };
