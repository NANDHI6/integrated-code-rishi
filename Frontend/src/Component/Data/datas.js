import React, { useState, useEffect } from "react";
import { WiCloudDown } from "react-icons/wi";
import { NavLink } from "react-router-dom";
import "./datas.css";
import { useSelector } from "react-redux";
import { fetchAllData, fetchSingleData } from "../../HTTPHandler/api";
import { Box, Button } from "@mui/material";
import api from "../../HTTPHandler/axiosConfig";
import { toast } from "react-toastify";

const Datas = () => {
  const data = useSelector((state) => state.auth.user);
  const [userData, setUserData] = useState([]);

  const [filteredUserData, setFilteredUserData] = useState([]); // State to store filtered user data

  const [error, setError] = useState(null);

  const [searchEmail, setSearchEmail] = useState(""); // State to store the search email
  console.log(data.RoleId);

  // ! for Date fetch
  const [selectedDate, setSelectedDate] = useState("");
  useEffect(() => {
    data.RoleId === 1 ? fetchUserData() : SingleData();
  }, []);
  useEffect(() => {
    if (userData.length > 0) {
      if (searchEmail) {
        const filteredData = userData.filter((user) =>
          user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
        );
        setFilteredUserData(filteredData);
      } else {
        setFilteredUserData(userData);
      }
    }
  }, [searchEmail, userData]);

  // getting email from redux state and passing to the axios

  // to fetch the single data axios call for user
  const SingleData = () => {
    fetchSingleData(data.Email)
      .then((response) => {
        console.log(response.Response);
        // setUserData(response.Response);
        setFilteredUserData(response.Response);
      })
      .catch((error) => {
        console.error("error fetching data", error);
        setError("Error fetching user data. Please try again later");
      });
  };
  // to fetch the all data for admin
  const fetchUserData = () => {
    fetchAllData(data)
      .then((response) => {
        // console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again later.");
      });
  };
  const handleSearch = () => {
    // Filter user data based on searchEmail
    const filteredData = userData.filter((user) =>
      user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFilteredUserData(filteredData);
  };
  const handleDownload = () => {
    const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
    const rows = filteredUserData.map((row) => [
      row.Userid,
      row.Date,
      row.Time,
      row.Activity_type,
      row.Comments,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "filtered_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // const handleDownload = () => {
  //   const csvContent =
  //     "data:text/csv;charset=utf-8," +
  //     userData.map((row) => Object.values(row).join(",")).join("\n");
  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "data.csv");
  //   document.body.appendChild(link);
  //   link.click();
  // };
  // ! for date Fetch
  const handleDateChange = (e) => {
    const date = e.target.value; // Date in YYYY-MM-DD format
    setSelectedDate(date);
  };

  const handleSearchByDate = async () => {
    if (!selectedDate) {
      toast.error("please Select a date");
      return;
    }
    try {
      const response = await api.get("/data", {
        params: {
          date: selectedDate,
          email: data.Email,
        },
      });
      if (response.status === 200) {
        const data = response.data;

        if (data.Response && data.Response.length > 0) {
          console.log(data);
          setFilteredUserData(data.Response);
          toast.success("Successfully fetched the data");
        } else {
          console.log("No data recorded on that date");
          setFilteredUserData([]);
          toast.error("No data recorded on that date");
        }
      } else {
        console.error("Error:", response.data.message);
        toast.error("No data recorded on that date");
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("No data recorded on that date");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="admincon" style={{ width: "80%", height: "75%" }}>
        <div
          className="display back"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <AnimatedText */}
          <Box style={{ fontWeight: "800", fontSize: "30px" }}>
            {data.RoleId === 1 ? "User Data" : "Time Logs"}
          </Box>
        </div>
        {/* marquee content */}
        <div className="marquee">
        <marquee>
          Any violation will be treated as a security incident and referred to HR for appropriate diciplinary action
        </marquee>
        </div>
        <div
          className="search-container"
          style={{ width: "100%", textAlign: "center" }}
        >
          {data.RoleId === 1 ? (
            <div>
              <input
                type="text"
                placeholder="Search by email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />

              {/* <button onClick={handleSearch} style={{ height: "30px" }}>
                Search
              </button> */}
              <button
                onClick={handleDownload}
                className="download-button"
                style={{ position: "relative", left: "210px" }}
              >
                <WiCloudDown size={25} />
              </button>
            </div>
          ) : (
            <div>
              {/* for date fetch */}
              <div className="date" style={{ width: "100%", height: "50px" }}>
                <input
                  type="date"
                  onChange={handleDateChange}
                  style={{
                    width: "130px",
                    height: "30px",
                    paddingLeft: "10px",
                  }}
                />
                <button onClick={handleSearchByDate} className="search">
                  Search
                </button>
              </div>
            </div>
          )}
        </div>

        {error && <p>{error}</p>}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Date</th>
                <th>Time</th>
                <th>Activity Type</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserData.map((user) => (
                <tr key={user.id}>
                  <td>{user.Userid}</td>
                  <td>{user.Date}</td>
                  <td>{user.Time}</td>
                  <td>{user.Activity_type}</td>
                  <td>{user.Comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="containerback">
          <NavLink to="/main" style={{ textDecoration: "none" }}>
            <Button variant="contained" href="#contained-buttons">
              Back
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Datas;




// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import api from "../../HTTPHandler/axiosConfig";
// import { toast } from "react-toastify";

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [selectedDate, setSelectedDate] = useState("2024-05-27");
//   const [productiveData, setProductiveData] = useState([]);

  



  
//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       SingleData();
//     }
//   }, [data]);

//   useEffect(() => {
//     if (userData.length > 0) {
//       if (searchEmail) {
//         const filteredData = userData.filter((user) =>
//           user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//         );
//         setFilteredUserData(filteredData);
//       } else {
//         setFilteredUserData(userData);
//       }
//     }
//   }, [searchEmail, userData]);

//   const SingleData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setFilteredUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later");
//       });
//   };

//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleSearch = () => {
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value;
//     setSelectedDate(date);
//   };

//   const handleSearchByDate = async () => {
//     if (!selectedDate) {
//       toast.error("Please select a date");
//       return;
//     }
//     try {
//       const response = await api.get("/data", {
//         params: {
//           date: selectedDate,
//           email: data.Email,
//         },
//       });
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.Response && responseData.Response.length > 0) {
//           setFilteredUserData(responseData.Response);
//           toast.success("Successfully fetched the data");
//         } else {
//           setFilteredUserData([]);
//           toast.error("No data recorded on that date");
//         }
//       } else {
//         console.error("Error:", response.data.message);
//         toast.error("No data recorded on that date");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("No data recorded on that date");
//     }
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div
//           className="search-container"
//           style={{ width: "100%", textAlign: "center" }}
//         >
//           {data.RoleId === 1 ? (
//             <div>
//               <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//               />
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               {/* <table>
//                 <thead>
//                   <tr>
//                     <th>User ID</th>
//                     <th>Date</th>
//                     <th>Time In</th>
//                     <th>Time Out</th>
//                     <th>Break In</th>
//                     <th>Break Out</th>
//                     <th>Break Duration</th>
//                     <th>Lunch In</th>
//                     <th>Lunch Out</th>
//                     <th>Lunch Duration</th>
//                     <th>Productive Hours</th>
//                     <th>Non-Productive Hours</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredUserData && filteredUserData.map((user, index) => (
//                     <tr key={`${user.Userid}-${index}`}>
//                       <td>{user.Userid}</td>
//                       <td>{user.Date}</td>
//                       <td>{user.time_in}</td>
//                       <td>{user.time_out}</td>
//                       <td>{user.breakin}</td>
//                       <td>{user.breakout}</td>
//                       <td>{user.break_duration}</td>
//                       <td>{user.lunchin}</td>
//                       <td>{user.lunchout}</td>
//                       <td>{user.lunch_duration}</td>
//                       <td>{user.productive_hours}</td>
//                       <td>{user.non_productive_hours}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table> */}
//               <div className="productive-data-container">
//                 <h2>Productive Data</h2>
//                 <table>
//                   <thead>
//                     <tr>
//                     <th>User ID</th>
//                     <th>Date</th>
//                     <th>Time In</th>
                 
//                     <th>BreakIn/Out</th>
//                     <th>Lunch In/Out</th>
//                     <th>Time Out</th>
//                     <th>Productive Hours</th>
//                     <th>Non-Productive Hours</th>
                    
//                     {/* <th>Break In</th>
//                     <th>Break Out</th> */}
//                     {/* <th>Break Duration</th>
//                     <th>Lunch In</th>
//                     <th>Lunch Out</th>
//                     <th>Lunch Duration</th> */}
                    
                
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                       <td>{user.Userid}</td>
//                       <td>{user.Date}</td>
//                       <td>{user.time_in}</td>
//                       <td>{user.break_duration}</td>
//                       <td>{user.lunch_duration}</td>
//                       <td>{user.time_out}</td>
//                       <td>{user.productive_hours}</td>
//                       <td>{user.non_productive_hours}</td>
//                       {/* <td>{user.time_out}</td> */}
//                       {/* <td>{user.breakin}</td>
//                       <td>{user.breakout}</td>
                      
//                       <td>{user.lunchin}</td>
//                       <td>{user.lunchout}</td>
//                       <td>{user.lunch_duration}</td> */}
                      
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 <input
//                   type="date"
//                   onChange={handleDateChange}
//                   style={{
//                     width: "130px",
//                     height: "30px",
//                     paddingLeft: "10px",
//                   }}
//                 />
//                 <button onClick={handleSearchByDate} className="search">
//                   Search
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//         {error && <p>{error}</p>}
//         <div className="containerback">
//           <NavLink to="/main" style={{ textDecoration: "none" }}>
//             <Button variant="contained" href="#contained-buttons">
//               Back
//             </Button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Datas;


// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from '../../HTTPHandler/api'; // Ensure api is imported correctly

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productiveData, setProductiveData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(""); // Define selectedDate and setSelectedDate

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   useEffect(() => {
//     if (userData.length > 0) {
//       if (searchEmail) {
//         const filteredData = userData.filter((user) =>
//           user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//         );
//         setFilteredUserData(filteredData);
//       } else {
//         setFilteredUserData(userData);
//       }
//     }
//   }, [searchEmail, userData]);

//   const fetchSingleUserData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setUserData(response.Response);
//         setFilteredUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleSearch = () => {
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchByDate = () => {
//     if (!startDate || !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("No data recorded in the selected date range");
//       });
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

//   // const handleSearchByDate= async () => {
//   //   if (!selectedDate) {
//   //     toast.error("please Select a date");
//   //     return;
//   //   }
//   //   try {
//   //     const response = await api.get("/data", {
//   //       params: {
//   //         date: selectedDate,
//   //         email: data.Email,
//   //       },
//   //     });
//   //     if (response.status === 200) {
//   //       const data = response.data;

//   //       if (data.Response && data.Response.length > 0) {
//   //         console.log(data);
//   //         setFilteredUserData(data.Response);
//   //         toast.success("Successfully fetched the data");
//   //       } else {
//   //         console.log("No data recorded on that date");
//   //         setFilteredUserData([]);
//   //         toast.error("No data recorded on that date");
//   //       }
//   //     } else {
//   //       console.error("Error:", response.data.message);
//   //       toast.error("No data recorded on that date");
//   //       // Handle the error as needed
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     toast.error("No data recorded on that date");
//   //   }
//   // };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           {data.RoleId === 1 ? (
//             <div>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <button onClick={handleSearchByDate} className="search">
//                 Search
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="productive-data-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time In</th>
//                       <th>BreakIn/Out</th>
//                       <th>Lunch In/Out</th>
//                       <th>Time Out</th>
//                       <th>Productive Hours</th>
//                       <th>Non-Productive Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.time_in}</td>
//                         <td>{user.break_duration}</td>
//                         <td>{user.lunch_duration}</td>
//                         <td>{user.time_out}</td>
//                         <td>{user.productive_hours}</td>
//                         <td>{user.non_productive_hours}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 <input
//                   type="date"
//                   onChange={handleDateChange}
//                   style={{
//                     width: "130px",
//                     height: "30px",
//                     paddingLeft: "10px",
//                   }}
//                 />
//                 <button onClick={handleSearchByDate} className="search">
//                   Search
//                 </button>
//                 <table>
//             <thead>
//               <tr>
//                 <th>User ID</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Activity Type</th>
//                 <th>Comments</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUserData.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.Userid}</td>
//                   <td>{user.Date}</td>
//                   <td>{user.Time}</td>
//                   <td>{user.Activity_type}</td>
//                   <td>{user.Comments}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//               </div>
//             </div>
//           )}
//         </div>
//         {error && <p>{error}</p>}
       

//         {error && <p>{error}</p>}
//         <div className="containerback">
//           <NavLink to="/main" style={{ textDecoration: "none" }}>
//             <Button variant="contained" href="#contained-buttons">
//               Back
//             </Button>
//           </NavLink>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Datas;

// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from '../../HTTPHandler/api'; // Ensure api is imported correctly

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productiveData, setProductiveData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(""); // Define selectedDate and setSelectedDate

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   useEffect(() => {
//     if (userData.length > 0) {
//       if (searchEmail) {
//         const filteredData = userData.filter((user) =>
//           user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//         );
//         setFilteredUserData(filteredData);
//       } else {
//         setFilteredUserData(userData);
//       }
//     }
//   }, [searchEmail, userData]);

//   const fetchSingleUserData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setUserData(response.Response);
//         setFilteredUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleSearch = () => {
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchByDate = () => {
//     if (!startDate || !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("No data recorded in the selected date range");
//       });
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           {data.RoleId === 1 ? (
//             <div className="date" style={{ width: "100%", height: "50px" }}>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <button onClick={handleSearchByDate} className="search">
//                 Search
//               </button>

//               <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//               />
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
             
//                 >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="productive-data-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time In</th>
//                       <th>BreakIn/Out</th>
//                       <th>Lunch In/Out</th>
//                       <th>Time Out</th>
//                       <th>Productive Hours</th>
//                       <th>Non-Productive Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.time_in}</td>
//                         <td>{user.break_duration}</td>
//                         <td>{user.lunch_duration}</td>
//                         <td>{user.time_out}</td>
//                         <td>{user.productive_hours}</td>
//                         <td>{user.non_productive_hours}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
              
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 {/* <input
//                   type="date"
//                   onChange={handleDateChange}
//                   style={{
//                     width: "130px",
//                     height: "30px",
//                     paddingLeft: "10px",
//                   }}
//                 />
//                 <button onClick={handleSearchByDate} className="search">
//                   Search
//                 </button> */}
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Activity Type</th>
//                       <th>Comments</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUserData.map((user) => (
//                       <tr key={user.id}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.Time}</td>
//                         <td>{user.Activity_type}</td>
//                         <td>{user.Comments}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//           <NavLink to="/main" style={{ textDecoration: "none" }}>
//             <Button variant="contained" href="#contained-buttons">
//               Back
//             </Button>
//           </NavLink>
//         </div>
//     </div>
//   );
// };

// export default Datas;


// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from '../../HTTPHandler/api'; // Ensure api is imported correctly

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productiveData, setProductiveData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(""); // Define selectedDate and setSelectedDate

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   useEffect(() => {
//     setFilteredUserData(userData); // Reset filteredUserData when userData changes
//   }, [userData]);

//   const fetchSingleUserData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//     const handleSearch = () => {
//     // Filter user data based on searchEmail
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchByDate = () => {
//     if (!startDate || !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("No data recorded in the selected date range");
//       });
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           {data.RoleId === 1 ? (
//             <div className="date" style={{ width: "100%", height: "50px" }}>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <button onClick={handleSearchByDate} className="search">
//                 Search
//               </button>

//               <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="search-button"
//               >
//                 Search
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="productive-data-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time In</th>
//                       <th>BreakIn/Out</th>
//                       <th>Lunch In/Out</th>
//                       <th>Time Out</th>
//                       <th>Productive Hours</th>
//                       <th>Non-Productive Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.time_in}</td>
//                         <td>{user.break_duration}</td>
//                         <td>{user.lunch_duration}</td>
//                         <td>{user.time_out}</td>
//                         <td>{user.productive_hours}</td>
//                           <td>{user.non_productive_hours}</td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Activity Type</th>
//                       <th>Comments</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUserData.map((user) => (
//                       <tr key={user.id}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.Time}</td>
//                         <td>{user.Activity_type}</td>
//                         <td>{user.Comments}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//         <NavLink to="/main" style={{ textDecoration: "none" }}>
//           <Button variant="contained" href="#contained-buttons">
//             Back
//           </Button>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Datas;

//---------------------


// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from '../../HTTPHandler/api'; // Ensure api is imported correctly

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productiveData, setProductiveData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   useEffect(() => {
//     // Update filteredUserData whenever userData changes
//     setFilteredUserData(userData);
//   }, [userData]);

//   const fetchSingleUserData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setUserData(response.Response);
       
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later.");
  

//       });
//   };


//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleSearch = () => {
//     // Filter user data based on searchEmail
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchByDate = () => {
//     if (!startDate || !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("No data recorded in the selected date range");
//       });
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           {data.RoleId === 1 ? (
//             <div className="date" style={{ width: "100%", height: "50px" }}>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <button onClick={handleSearchByDate} className="search">
//                 Search
//               </button>

//               {/* <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="search-button"
//               >
//                 Search
//               </button> */}
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="productive-data-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time In</th>
//                       <th>BreakIn/Out</th>
//                       <th>Lunch In/Out</th>
//                       <th>Time Out</th>
//                       <th>Productive Hours</th>
//                       <th>Non-Productive Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.time_in}</td>
//                         <td>{user.break_duration}</td>
//                         <td>{user.lunch_duration}</td>
//                         <td>{user.time_out}</td>
//                         <td>{user.productive_hours}</td>
//                         <td>{user.non_productive_hours}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>           
//                    </div>
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Activity Type</th>
//                       <th>Comments</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUserData.map((user) => (
//                       <tr key={user.id}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.Time}</td>
//                         <td>{user.Activity_type}</td>
//                         <td>{user.Comments}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//         <NavLink to="/main" style={{ textDecoration: "none" }}>
//           <Button variant="contained" href="#contained-buttons">
//             Back
//           </Button>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Datas;









// //new code calculation in node.
// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData, getProductiveData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from '../../HTTPHandler/api'; // Ensure api is imported correctly

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);
//   const [filteredUserData, setFilteredUserData] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchEmail, setSearchEmail] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [productiveData, setProductiveData] = useState([]);
//   const [selectedDate, setSelectedDate] = useState("");

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   useEffect(() => {
//     // Update filteredUserData whenever userData changes
//     setFilteredUserData(userData);
//   }, [userData]);

//   const fetchSingleUserData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         setUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         setUserData(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//         setError("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleSearch = () => {
//     // Filter user data based on searchEmail
//     const filteredData = userData.filter((user) =>
//       user.Userid.toLowerCase().includes(searchEmail.toLowerCase())
//     );
//     setFilteredUserData(filteredData);
//   };

//   const handleDownload = () => {
//     const headers = ["User ID", "Date", "Time", "Activity Type", "Comments"];
//     const rows = filteredUserData.map((row) => [
//       row.Userid,
//       row.Date,
//       row.Time,
//       row.Activity_type,
//       row.Comments,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "filtered_data.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const handleStartDateChange = (e) => {
//     setStartDate(e.target.value);
//   };

//   const handleEndDateChange = (e) => {
//     setEndDate(e.target.value);
//   };

//   const handleSearchByDate = () => {
//     if (!startDate || !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("No data recorded in the selected date range");
//       });
//   };

//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div
//           className="display back"
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           {data.RoleId === 1 ? (
//             <div className="date" style={{ width: "100%", height: "50px" }}>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{
//                   width: "130px",
//                   height: "30px",
//                   paddingLeft: "10px",
//                 }}
//               />
//               <button onClick={handleSearchByDate} className="search">
//                 Search
//               </button>

//               {/* <input
//                 type="text"
//                 placeholder="Search by email"
//                 value={searchEmail}
//                 onChange={(e) => setSearchEmail(e.target.value)}
//               />
//               <button
//                 onClick={handleSearch}
//                 className="search-button"
//               >
//                 Search
//               </button> */}
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="productive-data-container">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time In</th>
//                       <th>BreakIn/Out</th>
//                       <th>Lunch In/Out</th>
//                       <th>Time Out</th>
//                       <th>Productive Hours</th>
//                       <th>Non-Productive Hours</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {productiveData && productiveData.map((user, index) => (
//                       <tr key={`${user.Userid}-${index}`}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.time_in}</td>
//                         <td>{user.break_duration}</td>
//                         <td>{user.lunch_duration}</td>
//                         <td>{user.time_out}</td>
//                         <td>{user.productive_hours}</td>
//                         <td>{user.non_productive_hours}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>           
//                    </div>
//             </div>
//           ) : (
//             <div>
//               <div className="date" style={{ width: "100%", height: "50px" }}>
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>User ID</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Activity Type</th>
//                       <th>Comments</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredUserData.map((user) => (
//                       <tr key={user.id}>
//                         <td>{user.Userid}</td>
//                         <td>{user.Date}</td>
//                         <td>{user.Time}</td>
//                         <td>{user.Activity_type}</td>
//                         <td>{user.Comments}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//         <NavLink to="/main" style={{ textDecoration: "none" }}>
//           <Button variant="contained" href="#contained-buttons">
//             Back
//           </Button>
//         </NavLink>
//       </div>
//     </div>
//   );
// };

// export default Datas;
