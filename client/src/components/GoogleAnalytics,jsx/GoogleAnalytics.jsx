// src/components/GoogleAnalytics.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import { Chart } from "react-google-charts";
import axios from "axios";
// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GoogleAnalytics = () => {
  const [userrCountryData, settUserCountryData] = useState([]);
  console.log(userrCountryData);
  const [salesData, setSalesData] = useState(null);
  const [trafficData, setTrafficData] = useState(null);

  useEffect(() => {
    setSalesData({
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          label: "Sales Report",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    });

    setTrafficData({
      labels: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      datasets: [
        {
          label: "User Traffic",
          data: [120, 190, 300, 500, 200, 300, 400],
          borderColor: "rgba(255,99,132,1)",
          backgroundColor: "rgba(255,99,132,0.2)",
        },
      ],
    });
  }, []);

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        // Simulating an API call with static data
        // Replace this with your actual API endpoint
        const response = await axios.get(
          "http://localhost:8080/v1/api/userdata"
        ); // Replace with your actual API endpoint

        // Extract users from the response
        const users = response.data;

        // Initialize a dictionary to count the number of users in each country
        const countryCounts = {};

        // Count the users in each country
        users.forEach((user) => {
          const location = user.location;
          if (location) {
            countryCounts[location] = (countryCounts[location] || 0) + 1;
          }
        });

        // Convert the dictionary to the required format
        const countryData = [["Country", "Users"]];
        for (const [country, count] of Object.entries(countryCounts)) {
          countryData.push([country, count]);
        }

        // Update state with processed data
        settUserCountryData(countryData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data on component mount
    fetchUserData();
  }, []);

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <h2 className="text-2xl font-bold mb-4">Google Analytics Reports</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold">Sales Report</h3>
        {salesData ? <Line data={salesData} /> : <p>Loading sales data...</p>}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">User Traffic</h3>
        {trafficData ? (
          <Bar data={trafficData} />
        ) : (
          <p>Loading traffic data...</p>
        )}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold">User by Country</h3>
        <div className="flex">
          {userrCountryData ? (
            <div className="w-3/4">
              <Chart
                chartType="GeoChart"
                data={userrCountryData}
                options={{
                  colorAxis: { colors: ["#E37400", "#F9AB00"] },
                }}
                width="100%"
                height="400px"
              />
            </div>
          ) : (
            <p>Loading user country data...</p>
          )}
          {userrCountryData && (
            <div className="w-1/4 ml-4">
              <h4 className="text-lg font-semibold mb-2">Top Countries</h4>
              <ul>
                {userrCountryData
                  .slice(1) // Skip the header row
                  .sort((a, b) => b[1] - a[1]) // Sort by number of users
                  .map(([country, users]) => (
                    <li key={country} className="mb-1">
                      {country}: {users}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleAnalytics;


// main dynamic data

// import React, { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line, Bar } from "react-chartjs-2";
// import { Chart } from "react-google-charts";
// import axios from "axios";

// // Register the necessary Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const GoogleAnalytics = () => {
//   const [userCountryData, setUserCountryData] = useState([]);
//   const [salesData, setSalesData] = useState(null);
//   const [trafficData, setTrafficData] = useState(null);

//   useEffect(() => {
//     // Function to fetch user data
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/v1/api/userdata"); // Replace with your actual API endpoint
//         const users = response.data;

//         // Initialize a dictionary to count the number of users in each country
//         const countryCounts = {};
//         const salesCounts = new Array(12).fill(0); // Assuming sales data for 12 months
//         const trafficCounts = new Array(7).fill(0); // Assuming traffic data for 7 days

//         users.forEach((user) => {
//           const location = user.location;
//           if (location) {
//             countryCounts[location] = (countryCounts[location] || 0) + 1;
//           }

//           // Simulate sales data based on user join dates
//           const joinDate = new Date(user.createdAt);
//           salesCounts[joinDate.getMonth()]++;

//           // Simulate traffic data (assuming equal distribution for simplicity)
//           const joinDay = joinDate.getDay();
//           trafficCounts[joinDay]++;
//         });

//         // Convert countryCounts dictionary to the required format
//         const countryData = [["Country", "Users"]];
//         for (const [country, count] of Object.entries(countryCounts)) {
//           countryData.push([country, count]);
//         }

//         setUserCountryData(countryData);

//         // Set sales data
//         setSalesData({
//           labels: [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ],
//           datasets: [
//             {
//               label: "Sales Report",
//               data: salesCounts,
//               borderColor: "rgba(75,192,192,1)",
//               backgroundColor: "rgba(75,192,192,0.2)",
//             },
//           ],
//         });

//         // Set traffic data
//         setTrafficData({
//           labels: [
//             "Sunday",
//             "Monday",
//             "Tuesday",
//             "Wednesday",
//             "Thursday",
//             "Friday",
//             "Saturday",
//           ],
//           datasets: [
//             {
//               label: "User Traffic",
//               data: trafficCounts,
//               borderColor: "rgba(255,99,132,1)",
//               backgroundColor: "rgba(255,99,132,0.2)",
//             },
//           ],
//         });

//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     // Fetch user data on component mount
//     fetchUserData();
//   }, []);

//   return (
//     <div className="p-4 max-w-[800px] max-h-[1390px] mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Google Analytics Reports</h2>
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold">Sales Report</h3>
//         {salesData ? <Line data={salesData} /> : <p>Loading sales data...</p>}
//       </div>
      
//       <div className="mb-8">
//         <h3 className="text-xl font-semibold">User Traffic</h3>
//         {trafficData ? <Bar data={trafficData} /> : <p>Loading traffic data...</p>}
//       </div>

//       <div className="mb-8">
//         <h3 className="text-xl font-semibold">User by Country</h3>
//         <div className="flex">
//           {userCountryData ? (
//             <div className="w-3/4">
//               <Chart
//                 chartType="GeoChart"
//                 data={userCountryData}
//                 options={{
//                   colorAxis: { colors: ["#E37400", "#F9AB00"] },
//                 }}
//                 width="100%"
//                 height="400px"
//               />
//             </div>
//           ) : (
//             <p>Loading user country data...</p>
//           )}
//           {userCountryData && (
//             <div className="w-1/4 ml-4">
//               <h4 className="text-lg font-semibold mb-2">Top Countries</h4>
//               <ul>
//                 {userCountryData
//                   .slice(1) // Skip the header row
//                   .sort((a, b) => b[1] - a[1]) // Sort by number of users
//                   .map(([country, users]) => (
//                     <li key={country} className="mb-1">
//                       {country}: {users}
//                     </li>
//                   ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleAnalytics;
