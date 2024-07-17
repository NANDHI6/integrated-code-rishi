// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { NavLink } from "react-router-dom";
// import "./datas.css";
// import { useSelector } from "react-redux";
// import { fetchAllData, fetchSingleData } from "../../HTTPHandler/api";
// import { Box, Button } from "@mui/material";
// import api from "../../HTTPHandler/axiosConfig";
// import { toast } from "react-toastify";

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [userData, setUserData] = useState([]);

//   const [filteredUserData, setFilteredUserData] = useState([]); // State to store filtered user data

//   const [error, setError] = useState(null);

//   const [searchEmail, setSearchEmail] = useState(""); // State to store the search email
//   console.log(data.RoleId);

//   // ! for Date fetch
//   const [selectedDate, setSelectedDate] = useState("");
//   useEffect(() => {
//     data.RoleId === 1 ? fetchUserData() : SingleData();
//   }, []);
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

//   // getting email from redux state and passing to the axios

//   // to fetch the single data axios call for user
//   const SingleData = () => {
//     fetchSingleData(data.Email)
//       .then((response) => {
//         console.log(response.Response);
//         // setUserData(response.Response);
//         setFilteredUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("error fetching data", error);
//         setError("Error fetching user data. Please try again later");
//       });
//   };
//   // to fetch the all data for admin
//   const fetchUserData = () => {
//     fetchAllData(data)
//       .then((response) => {
//         // console.log(response.data);
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
//   // const handleDownload = () => {
//   //   const csvContent =
//   //     "data:text/csv;charset=utf-8," +
//   //     userData.map((row) => Object.values(row).join(",")).join("\n");
//   //   const encodedUri = encodeURI(csvContent);
//   //   const link = document.createElement("a");
//   //   link.setAttribute("href", encodedUri);
//   //   link.setAttribute("download", "data.csv");
//   //   document.body.appendChild(link);
//   //   link.click();
//   // };
//   // ! for date Fetch
//   const handleDateChange = (e) => {
//     const date = e.target.value; // Date in YYYY-MM-DD format
//     setSelectedDate(date);
//   };

// const handleSearchByDate = async () => {
//   if (!selectedDate) {
//     toast.error("please Select a date");
//     return;
//   }
//   try {
//     const response = await api.get("/data", {
//       params: {
//         date: selectedDate,
//         email: data.Email,
//       },
//     });
//     if (response.status === 200) {
//       const data = response.data;

//       if (data.Response && data.Response.length > 0) {
//         console.log(data);
//         setFilteredUserData(data.Response);
//         toast.success("Successfully fetched the data");
//       } else {
//         console.log("No data recorded on that date");
//         setFilteredUserData([]);
//         toast.error("No data recorded on that date");
//       }
//     } else {
//       console.error("Error:", response.data.message);
//       toast.error("No data recorded on that date");
//       // Handle the error as needed
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     toast.error("No data recorded on that date");
//   }
// };

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
//           {/* <AnimatedText */}
//           <Box style={{ fontWeight: "800", fontSize: "30px" }}>
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         {/* marquee content */}
//         <div className="marquee">
//         <marquee>
//           Any violation will be treated as a security incident and referred to HR for appropriate diciplinary action
//         </marquee>
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

//               {/* <button onClick={handleSearch} style={{ height: "30px" }}>
//                 Search
//               </button> */}
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "210px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//             </div>
//           ) : (
//             <div>
//               {/* for date fetch */}
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

//         <div className="table-container">
//           <table>
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
//         </div>
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


//====================================================================
////3rd dummy





// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import api from "../../HTTPHandler/axiosConfig";
// import { fetchSingleData, getProductiveData } from "../../HTTPHandler/api"; // Adjust the path based on your actual directory structure
// import "./datas.css";

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   const [productiveData, setProductiveData] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [searchEmail, setSearchEmail] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [filteredUserData, setFilteredUserData] = useState([]);

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchUserData();
//     } else {
//       fetchSingleUserData();
//     }
//   }, [data]);

//   const fetchSingleUserData = () => {
//     const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
//     getProductiveData(today, today, data.Email)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setFilteredUserData(response.Response);
//         } else {
//           toast.error("No productive data found for today");
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });

//     fetchSingleData(data.Email)
//       .then((response) => {
//         console.log(response.Response);
//         setFilteredUserData(response.Response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchUserData = () => {
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
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };

//   const handleDownload = () => {
//     const headers = [
//       "User ID",
//       "Date",
//       "Time In",
//       "BreakIn/Out",
//       "Lunch In/Out",
//       "Time Out",
//       "Productive Hours",
//       "Non-Productive Hours",
//     ];
//     const rows = productiveData.map((user) => [
//       user.Userid,
//       user.Date,
//       user.time_in,
//       user.break_duration,
//       user.lunch_duration,
//       user.time_out,
//       user.productive_hours,
//       user.non_productive_hours,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "productive_data.csv");
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

//   const handleEmailChange = (e) => {
//     setSearchEmail(e.target.value);
//   };

//   const handleDateChange = (e) => {
//     setSelectedDate(e.target.value);
//   };

//   // const handleSearchByDate = () => {
//   //   if (!startDate || !endDate) {
//   //     toast.error("Please select both start date and end date");
//   //     return;
//   //   }

//   //   getProductiveData(startDate, endDate)
//   //     .then((response) => {
//   //       if (response.Status === "Success") {
//   //         setProductiveData(response.Response);
//   //       } else {
//   //         toast.error("No data recorded in the selected date range");
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //       toast.error("Error fetching user data. Please try again later.");
//   //     });
//   // };

//   // const handleEmailSearch = () => {
//   //   if (!searchEmail||!startDate || !endDate) {
//   //     toast.error("Please select both start date and end date");
//   //     return;
//   //   }
//   //  {

//   //   }

//   //   getProductiveData(startDate, endDate, searchEmail)
//   //     .then((response) => {
//   //       if (response.Status === "Success" && response.Response.length > 0) {
//   //         const filteredData = response.Response.filter(
//   //           (user) => user.Userid === searchEmail
//   //         );
//   //         setProductiveData(filteredData);
//   //       } else {
//   //         toast.error("No productive data found for the provided email");
//   //         toast.error("No data recorded in the selected date range");
//   //         setProductiveData([]);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //       toast.error("Error fetching user data. Please try again later.");
//   //     });
//   // };



//   // const handleEmailSearch = (roleId) => {
//   //   if ((!startDate || !endDate)) {
//   //     toast.error("Please select both start date and end date");
//   //     return;
//   //   }

//   //   let fetchPromise;

//   //   if (roleId === 1) {
//   //     // Admin case: Fetch all data within the date range
//   //     fetchPromise = getProductiveData(startDate, endDate);
//   //   } else if (roleId === 2) {
//   //     // User case: Fetch only the user's data within the date range
//   //     if (!searchEmail) {
//   //       toast.error("Please provide a valid email");
//   //       return;
//   //     }
//   //     fetchPromise = getProductiveData(startDate, endDate, searchEmail);
//   //   }

//   //   fetchPromise
//   //     .then((response) => {
//   //       if (response.Status === "Success" && response.Response.length > 0) {
//   //         let filteredData = response.Response;
//   //         if (roleId === 2 && searchEmail) {
//   //           filteredData = filteredData.filter((user) => user.Userid === searchEmail);
//   //         }
//   //         setProductiveData(filteredData);
//   //       } else {
//   //         if (roleId === 2 && searchEmail) {
//   //           toast.error("No productive data found for the provided email");
//   //         }
//   //         if (startDate && endDate) {
//   //           toast.error("No data recorded in the selected date range");
//   //         }
//   //         setProductiveData([]);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //       toast.error("Error fetching user data. Please try again later.");
//   //     });
//   // };




//   const handleEmailSearch = () => {
//   if (!startDate && !endDate && !searchEmail) {
//     toast.error("Please provide either a valid email or select both start date and end date");
//     return;
//   }

//   let fetchPromise;

//   if (startDate && endDate && searchEmail) {
//     fetchPromise = getProductiveData(startDate, endDate, searchEmail);
//   } else if (startDate && endDate) {
//     fetchPromise = getProductiveData(startDate, endDate);
//   } else if (searchEmail) {
//     fetchPromise = getProductiveData(null, null, searchEmail);
//   } else {
//     toast.error("Please provide both start date and end date or a valid email");
//     return;
//   }

//   fetchPromise
//     .then((response) => {
//       if (response.Status === "Success" && response.Response.length > 0) {
//         let filteredData = response.Response;
//         if (searchEmail) {
//           filteredData = filteredData.filter((user) => user.Userid === searchEmail);
//         }
//         setProductiveData(filteredData);
//       } else {
//         if (searchEmail) {
//           toast.error("No productive data found for the provided email");
//         }
//         if (startDate && endDate) {
//           toast.error("No data recorded in the selected date range");
//         }
//         setProductiveData([]);
//       }
//     })
//     .catch((error) => {
//       console.error("Error fetching data:", error);
//       toast.error("Error fetching user data. Please try again later.");
//     });
// };





//   // const handleSearchBySelectedDate = async () => {
//   //   if (!selectedDate) {
//   //     toast.error("Please select a date");
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
//   //         setFilteredUserData(data.Response);
//   //         toast.success("Successfully fetched the data");
//   //       } else {
//   //         setFilteredUserData([]);
//   //         toast.error("No data recorded on that date");
//   //       }
//   //     } else {
//   //       console.error("Error:", response.data.message);
//   //       toast.error("No data recorded on that date");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     toast.error("No data recorded on that date");
//   //   }
//   // };

//   return (
//     <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div className="display back" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Box style={{ fontWeight: "800", fontSize: "30px"}} className="nav">
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
//            Start Date:<span className="required">*</span>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//               />
//               End Date:<span className="required">*</span>
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by Email"
//                 value={searchEmail}
//                 onChange={handleEmailChange}
//                 style={{ width: "200px", height: "30px", paddingLeft: "10px", marginLeft: "20px", padding: "10px" }}
//               />
//               <button onClick={() => handleEmailSearch(data.RoleId)} className="search">
//                 Search
//               </button>
//               <button
//                 onClick={handleDownload}
//                 className="download-button"
//                 style={{ position: "relative", left: "90px", top: "8px" }}
//               >
//                 <WiCloudDown size={25} />
//               </button>
//               <div className="table-container">
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
//                     {productiveData.map((user, index) => (
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
//               <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//                 <NavLink to="/main" style={{ textDecoration: "none" }}>
//                   <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
//                     Back
//                   </Button>
//                 </NavLink>
//               </div>
//             </div>
//           ) : (
//             <div className="date" style={{ width: "100%", height: "50px" }}>
//               <input
//                 type="date"
//                 onChange={handleStartDateChange}
//                 style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//               />
//               <input
//                 type="date"
//                 onChange={handleEndDateChange}
//                 style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//               />

//               <button onClick={() => handleEmailSearch(data.RoleId)} className="search">
//                 Search
//               </button>
//               <div className="table-container">
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
//                     {productiveData.map((user, index) => (

//                       <tr key={`${user.Userid}-${index}`}>
//                           <td>{user.Userid}</td>
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
//               <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//                 <NavLink to="/main" style={{ textDecoration: "none" }}>
//                   <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
//                     Back
//                   </Button>
//                 </NavLink>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Datas;






//=================================================================================================




// import React, { useState, useEffect } from "react";
// import { WiCloudDown } from "react-icons/wi";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { Box, Button } from "@mui/material";
// import { toast } from "react-toastify";
// import { getProductiveData } from "../../HTTPHandler/api";
// import "./datas.css";

// const Datas = () => {
//   const data = useSelector((state) => state.auth.user);
//   let email=data.Email
//   console.log("my email",email);
//   const [productiveData, setProductiveData] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [searchEmail, setSearchEmail] = useState("");

//   useEffect(() => {
//     if (data && data.RoleId === 1) {
//       fetchAdminData();
//     } else {
//       fetchNonAdminData();
//     }
//   }, [data]);

//   const fetchAdminData = () => {
//     getProductiveData(startDate, endDate)
//       .then((response) => {
//         if (response.Status === "Success") {
//           setProductiveData(response.Response);
//         } else {
//           toast.error("No data recorded in the selected date range");
//           setProductiveData([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };

//   const fetchNonAdminData = () => {
//     const today = new Date().toISOString().split("T")[0];
//      console.log("today date :",today);
//     getProductiveData(today, today, email)
//       .then((response) => {
//         let filteredData = response.Response;
//         if (email) {
//           filteredData = filteredData.filter((user) => user.Userid === email);
//           setProductiveData(filteredData);
//         }
//          else {
//           toast.error("No productive data found for today");
//           setProductiveData([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };


//   const handleDownload = () => {
//     const headers = [
//       "User ID",
//       "Date",
//       "Time In",
//       "BreakIn/Out",
//       "Lunch In/Out",
//       "Time Out",
//       "Productive Hours",
//       "Non-Productive Hours",
//     ];
//     const rows = productiveData.map((user) => [
//       user.Userid,
//       user.Date,
//       user.time_in,
//       user.break_duration,
//       user.lunch_duration,
//       user.time_out,
//       user.productive_hours,
//       user.non_productive_hours,
//     ]);
//     const csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((row) => row.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "productive_data.csv");
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

//   const handleEmailChange = (e) => {
//     setSearchEmail(e.target.value);
//   };

//   const handleEmailSearch = () => {
//     if (!startDate && !endDate && !searchEmail) {
//       toast.error("Please provide either a valid email or select both start date and end date");
//       return;
//     }

//     let fetchPromise;

//     if (startDate && endDate && searchEmail) {
//       fetchPromise = getProductiveData(startDate, endDate, searchEmail);
//     } else if (startDate && endDate) {
//       fetchPromise = getProductiveData(startDate, endDate);
//     } else if (searchEmail) {
//       fetchPromise = getProductiveData(null, null, searchEmail);
//     } else {
//       toast.error("Please provide both start date and end date or a valid email");
//       return;
//     }

//     fetchPromise
//       .then((response) => {
//         if (response.Status === "Success" && response.Response.length > 0) {
//           let filteredData = response.Response;
//           if (searchEmail) {
//             filteredData = filteredData.filter((user) => user.Userid === searchEmail);
//           }
//           setProductiveData(filteredData);
//         } else {
//           if (searchEmail) {
//             toast.error("No productive data found for the provided email");
//           }
//           if (startDate && endDate) {
//             toast.error("No data recorded in the selected date range");
//           }
//           setProductiveData([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };
//   const handleEmailSearch2 = (email) => {
//     if (!startDate && !endDate) {
//       toast.error("Please select both start date and end date");
//       return;
//     }

//     let fetchPromise;

//     if (startDate && endDate && email) {
//       fetchPromise = getProductiveData(startDate,endDate,email);
//     } else {
//       toast.error("Please provide both start date and end date or a valid email");
//       return;
//     }

//     fetchPromise
//       .then((response) => {
//         if (response.Status === "Success" && response.Response.length > 0) {
//           let filteredData = response.Response;
//           if (email) {
//             filteredData = filteredData.filter((user) => user.Userid === email);
//           }
//           setProductiveData(filteredData);
//         } else {
//           if (email) {
//             toast.error("No productive data found for the provided email");
//           }
//           if (startDate && endDate) {
//             toast.error("No data recorded in the selected date range");
//           }
//           setProductiveData([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         toast.error("Error fetching user data. Please try again later.");
//       });
//   };

//   return (
//     <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <div className="admincon" style={{ width: "80%", height: "75%" }}>
//         <div className="display back" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Box style={{ fontWeight: "800", fontSize: "30px"}} className="nav">
//             {data.RoleId === 1 ? "User Data" : "Time Logs"}
//           </Box>
//         </div>
//         <div className="marquee">
//           <marquee>
//             Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
//           </marquee>
//         </div>
//         <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
//           <div className="date" style={{ width: "100%", height: "50px" }}>
//             <span className="required">*</span> Start Date:
//             <input
//               type="date"
//               onChange={handleStartDateChange}
//               style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//             />
//             <span className="required">*</span> End Date:
//             <input
//               type="date"
//               onChange={handleEndDateChange}
//               style={{ width: "145px", height: "30px", paddingLeft: "10px" }}
//             />
//             {data.RoleId === 1 && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Search by Email"
//                   value={searchEmail}
//                   onChange={handleEmailChange}
//                   style={{ width: "200px", height: "30px", paddingLeft: "10px", marginLeft: "20px" }}
//                 />
//                 <button onClick={handleEmailSearch} className="search">
//                 {/* <button onClick={()=>{handleEmailSearch()}} className="search"> */}
//                   Search
//                 </button>
//                 <button
//                   onClick={handleDownload}
//                   className="download-button"
//                   style={{ position: "relative", left: "10px", top: "8px" }}
//                 >
//                   <WiCloudDown size={25} />
//                 </button>
//               </>
//             )}
//             {data.RoleId !== 1 && (
//               <button onClick={()=>{handleEmailSearch2(email)}} className="search">
//                 Search
//               </button>
//             )}
//           </div>
//           <div className="table-container">
//             <table>
//               <thead>
//                 <tr>
//                   <th>User ID</th>
//                   <th>Date</th>
//                   <th>Time In</th>
//                   <th>BreakIn/Out</th>
//                   <th>Lunch In/Out</th>
//                   <th>Time Out</th>
//                   <th>Productive Hours</th>
//                   <th>Non-Productive Hours</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {productiveData.map((user, index) => (
//                   <tr key={`${user.Userid}-${index}`}>
//                     <td>{user.Userid}</td>
//                     <td>{user.Date}</td>
//                     <td>{user.time_in}</td>
//                     <td>{user.break_duration}</td>
//                     <td>{user.lunch_duration}</td>
//                     <td>{user.time_out}</td>
//                     <td>{user.productive_hours}</td>
//                     <td>{user.non_productive_hours}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
//             <NavLink to="/main" style={{ textDecoration: "none" }}>
//               <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
//                 Back
//               </Button>
//             </NavLink>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Datas;




// new dummy  16/7/2024

import React, { useState, useEffect } from "react";
import { WiCloudDown } from "react-icons/wi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { getProductiveData } from "../../HTTPHandler/api";
import "./datas.css";

const Datas = () => {
  const data = useSelector((state) => state.auth.user);
  let email = data.Email;
  console.log("my email", email);
  const [productiveData, setProductiveData] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  useEffect(() => {
    if (data && data.RoleId === 1) {
      fetchAdminData();
    } else {
      fetchNonAdminData();
    }
  }, [data]);

  const fetchAdminData = () => {
    getProductiveData(startDate, endDate)
      .then((response) => {
        if (response.Status === "Success") {
          setProductiveData(response.Response);
        } else {
          toast.error("No data recorded in the selected date range");
          setProductiveData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching user data. Please try again later.");
      });
  };

  const fetchNonAdminData = () => {
    const today = new Date().toISOString().split("T")[0];
    console.log("today date :", today);
    getProductiveData(today, today, email)
      .then((response) => {
        let filteredData = response.Response;
        if (email) {
          filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === email.toLowerCase());
          setProductiveData(filteredData);
        } else {
          toast.error("No productive data found for today");
          setProductiveData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching user data. Please try again later.");
      });
  };

  const handleDownload = () => {
    const headers = [
      "User ID",
      "Date",
      "Time In",
      "BreakIn/Out",
      "Lunch In/Out",
      "Time Out",
      "Productive Hours",
      "Non-Productive Hours",
    ];
    const rows = productiveData.map((user) => [
      user.Userid,
      user.Date,
      user.time_in,
      user.break_duration,
      user.lunch_duration,
      user.time_out,
      user.productive_hours,
      user.non_productive_hours,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "productive_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEmailChange = (e) => {
    const trimmedEmail = e.target.value.trim();
    setSearchEmail(trimmedEmail);
  };

  const handleEmailSearch = () => {
    if (!startDate && !endDate && !searchEmail) {
      toast.error("Please provide either a valid email or select both start date and end date");
      return;
    }

    let fetchPromise;

    if (startDate && endDate && searchEmail) {
      fetchPromise = getProductiveData(startDate, endDate, searchEmail);
    } else if (startDate && endDate) {
      fetchPromise = getProductiveData(startDate, endDate);
    } else if (searchEmail) {
      fetchPromise = getProductiveData(null, null, searchEmail);
    } else {
      toast.error("Please provide both start date and end date or a valid email");
      return;
    }

    fetchPromise
      .then((response) => {
        if (response.Status === "Success" && response.Response.length > 0) {
          let filteredData = response.Response;
          if (searchEmail) {
            filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === searchEmail.toLowerCase());
          }
          setProductiveData(filteredData);
        } else {
          if (searchEmail) {
            toast.error("No productive data found for the provided email");
          }
          if (startDate && endDate) {
            toast.error("No data recorded in the selected date range");
          }
          setProductiveData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching user data. Please try again later.");
      });
  };

  const handleEmailSearch2 = (email) => {
    if (!startDate && !endDate) {
      toast.error("Please select both start date and end date");
      return;
    }

    let fetchPromise;

    if (startDate && endDate && email) {
      fetchPromise = getProductiveData(startDate, endDate, email);
    } else {
      toast.error("Please provide both start date and end date or a valid email");
      return;
    }

    fetchPromise
      .then((response) => {
        if (response.Status === "Success" && response.Response.length > 0) {
          let filteredData = response.Response;
          if (email) {
            filteredData = filteredData.filter((user) => user.Userid.toLowerCase() === email.toLowerCase());
          }
          setProductiveData(filteredData);
        } else {
          if (email) {
            toast.error("No productive data found for the provided email");
          }
          if (startDate && endDate) {
            toast.error("No data recorded in the selected date range");
          }
          setProductiveData([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Error fetching user data. Please try again later.");
      });
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="admincon" style={{ width: "90%", height: "75%" }}>
        <div className="display back" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box style={{ fontWeight: "800", fontSize: "30px", marginLeft: "120px" }} className="nav">
            {data.RoleId === 1 ? "User Data" : "Time Logs"}
          </Box>
        </div>

        <div className="search-container" style={{ width: "100%", textAlign: "center" }}>
          {/* <div className="date" style={{ width: "100%", height: "50px"}}> */}
          <div className="date" style={{ width: "100%", height: "50px",  display: "flex", justifyContent: "center", alignItems: "center" }}>
             Start Date <span className="required">*</span>  :
            <input
              type="date"
              onChange={handleStartDateChange}
              style={{ width: "145px", height: "30px", paddingLeft: "10px",marginLeft:"10px"  }}
            />
          <p    style={{marginLeft:"10px"  }}> End Date </p> <span className="required">*</span> :  
            <input
              type="date"
              onChange={handleEndDateChange}
              style={{ width: "145px", height: "30px", paddingLeft: "10px",marginLeft:"10px"  }}
            />
            {data.RoleId === 1 ? (
              <>
                <input
                  type="text"
                  placeholder="Search by Email"
                  value={searchEmail}
                  onChange={handleEmailChange}
                  style={{ width: "200px", height: "30px", paddingLeft: "10px", marginLeft: "20px" }}
                />
                <button onClick={handleEmailSearch} className="search">
                  Search
                </button>
                <button
                  onClick={handleDownload}
                  className="download-button"
                  style={{ position: "relative", left: "10px", top: "8px",marginBottom:"15 px" }}
                >
                  <WiCloudDown size={25} />
                </button>
              </>
            ) : (
              <button onClick={() => { handleEmailSearch2(email) }} className="search">
                Search
              </button>
            )}

            {/* {data.RoleId === 1 && (
              <>
                <input
                  type="text"
                  placeholder="Search by Email"
                  value={searchEmail}
                  onChange={handleEmailChange}
                  style={{ width: "200px", height: "30px", paddingLeft: "10px", marginLeft: "20px" }}
                />
                <button onClick={handleEmailSearch} className="search">
                  Search
                </button>
                <button
                  onClick={handleDownload}
                  className="download-button"
                  style={{ position: "relative", left: "10px", top: "8px" }}
                >
                  <WiCloudDown size={25} />
                </button>
              </>
            )}
            {data.RoleId !== 1 && (
              <button onClick={() => { handleEmailSearch2(email) }} className="search">
                Search
              </button>
            )} */}
          </div>
          <div className="table-container" style={{paddingTop:"20px"}}>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>BreakIn/Out</th>
                  <th>Lunch In/Out</th>
                  <th>Time Out</th>
                  <th>Productive Hours</th>
                  <th>Non-Productive Hours</th>
                </tr>
              </thead>
              <tbody>
                {productiveData.length > 0 ? (
                  productiveData.map((user, index) => (
                    <tr key={index}>
                      <td>{user.Userid}</td>
                      <td>{user.Date}</td>
                      <td>{user.time_in}</td>
                      <td>{user.break_duration}</td>
                      <td>{user.lunch_duration}</td>
                      <td>{user.time_out}</td>
                      <td>{user.productive_hours}</td>
                      <td>{user.non_productive_hours}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="marquee">
          <marquee>
            Any violation will be treated as a security incident and referred to HR for appropriate disciplinary action
          </marquee>
        </div>
        <div className="containerback" style={{ textAlign: "center", marginTop: "20px" }}>
          <NavLink to="/main" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
              Back
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Datas;
