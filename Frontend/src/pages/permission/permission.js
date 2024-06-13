// import React, { useState } from "react";
// import { sendPermissionRequest } from "../../HTTPHandler/api";




// export const Permission = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [reason, setReason] = useState("");

//   const handleSubmit = async () => {
//     try {
//       // Call the function to send permission request
//       const response = await sendPermissionRequest(currentDate, startTime, endTime, reason);
//       console.log(response); // Log the response from the backend
//       // Optionally, show a success message to the user
//     } catch (error) {
//       console.error(error); // Log any errors
//       // Optionally, show an error message to the user
//     }
//   };

//   const handleDateChange = (e) => {
//     setCurrentDate(e.target.value);
//   };

//   const handleStartTimeChange = (e) => {
//     setStartTime(e.target.value);
//   };

//   const handleEndTimeChange = (e) => {
//     setEndTime(e.target.value);
//   };

//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };

//   return (
//     <>
//       <div className="center-content">
//         <div>
//           <label htmlFor="currentDate">Current Date:</label>
//           <input
//             type="date"
//             id="currentDate"
//             value={currentDate}
//             onChange={handleDateChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="startTime">Start Time:</label>
//           <input
//             type="time"
//             id="startTime"
//             value={startTime}
//             onChange={handleStartTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="endTime">End Time:</label>
//           <input
//             type="time"
//             id="endTime"
//             value={endTime}
//             onChange={handleEndTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="reason">Reason:</label>
//           <textarea
//             id="reason"
//             value={reason}
//             onChange={handleReasonChange}
//             rows={4}
//             cols={50}
//           />
//         </div>
//         <button onClick={handleSubmit}>Send for Approval</button>
//       </div>
//     </>
//   );
// };


// import React, { useState } from "react";
// import { sendPermissionRequest } from "./api";

// export const Permission = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [reason, setReason] = useState("");

//   const handleSubmit = async () => {
//     try {
//       // Get user's email from authentication token or session data
//       const userEmail = getUserEmail(); // Implement this function to get user's email
      
//       // Call the function to send permission request with user's email
//       const response = await sendPermissionRequest(userEmail, currentDate, startTime, endTime, reason);
//       console.log(response); // Log the response from the backend
//       // Optionally, show a success message to the user
//     } catch (error) {
//       console.error(error); // Log any errors
//       // Optionally, show an error message to the user
//     }
//   };

//   // Function to handle change in the "Current Date" input field
//   const handleDateChange = (e) => {
//     setCurrentDate(e.target.value);
//   };

//   // Function to handle change in the "Start Time" input field
//   const handleStartTimeChange = (e) => {
//     setStartTime(e.target.value);
//   };

//   // Function to handle change in the "End Time" input field
//   const handleEndTimeChange = (e) => {
//     setEndTime(e.target.value);
//   };

//   // Function to handle change in the "Reason" textarea
//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };

//   return (
//     <>
//       <div className="center-content">
//         <div>
//           <label htmlFor="currentDate">Current Date:</label>
//           <input
//             type="date"
//             id="currentDate"
//             value={currentDate}
//             onChange={handleDateChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="startTime">Start Time:</label>
//           <input
//             type="time"
//             id="startTime"
//             value={startTime}
//             onChange={handleStartTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="endTime">End Time:</label>
//           <input
//             type="time"
//             id="endTime"
//             value={endTime}
//             onChange={handleEndTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="reason">Reason:</label>
//           <textarea
//             id="reason"
//             value={reason}
//             onChange={handleReasonChange}
//             rows={4}
//             cols={50}
//           />
//         </div>
//         <button onClick={handleSubmit}>Send for Approval</button>
//       </div>
//     </>
//   );
// };import React, { useState } from "react";
// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { sendPermissionRequest } from "../../HTTPHandler/api";

// export const Permission = () => {
//   const [currentDate, setCurrentDate] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [reason, setReason] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
  
//   // Accessing user's email from Redux store
//   // const userEmail = useSelector((state) => state.auth.userEmail);
//   const userEmail = useSelector((state) => state.auth.user?.Email);


//   const handleSubmit = async () => {
//     try {
//       setIsLoading(true);
//       if (!userEmail) {
//         throw new Error("User email not found");
//       }
//       const response = await sendPermissionRequest(userEmail,currentDate, startTime, endTime, reason);
//       console.log(response);
//       // Optionally, handle success response
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDateChange = (e) => {
//     setCurrentDate(e.target.value);
//   };

//   const handleStartTimeChange = (e) => {
//     setStartTime(e.target.value);
//   };

//   const handleEndTimeChange = (e) => {
//     setEndTime(e.target.value);
//   };

//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };

//   return (
//     <>
//       <div className="center-content">
//         <div>
//           <label htmlFor="currentDate">Current Date:</label>
//           <input
//             type="date"
//             id="currentDate"
//             value={currentDate}
//             onChange={handleDateChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="startTime">Start Time:</label>
//           <input
//             type="time"
//             id="startTime"
//             value={startTime}
//             onChange={handleStartTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="endTime">End Time:</label>
//           <input
//             type="time"
//             id="endTime"
//             value={endTime}
//             onChange={handleEndTimeChange}
//           />
//         </div>
//         <div>
//           <label htmlFor="reason">Reason:</label>
//           <textarea
//             id="reason"
//             value={reason}
//             onChange={handleReasonChange}
//             rows={4}
//             cols={50}
//           />
//         </div>
//         {/* {error && <div>Error: {error}</div>} */}
//         <button onClick={handleSubmit} disabled={isLoading}>
//           {isLoading ? "Sending..." : "Send for Approval"}
//         </button>

//         <p>  view Approval</p>
//       </div>

//     </>
//   );
// };
import React, { useState , useEffect } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { sendPermissionRequest } from "../../HTTPHandler/api";
import { Link, useNavigate } from "react-router-dom";
import './permission.js'

export const Permission = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  // Accessing user's email from Redux store
  const userEmail = useSelector((state) => state.auth.user?.Email);

  // Set today's date as the default value and minimum selectable date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setCurrentDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (!currentDate || !startTime || !endTime || !reason) {
        setError("All fields are required");
        toast.error("All fields are required");
        return;
      }

      setIsLoading(true);
      if (!userEmail) {
        throw new Error("User email not found");
      }
      const response = await sendPermissionRequest(userEmail, currentDate, startTime, endTime, reason);
      console.log(response);
      toast.success("Permission request sent successfully!");
      // Optionally, handle success response
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  return (
    <div className="center-content">
      <form className="bord" onSubmit={handleSubmit}>
        <h2>Permission Request Form</h2>
        <div className="form-group">
          <label htmlFor="currentDate">Current Date:</label>
          <input
            type="date"
            id="currentDate"
            value={currentDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            rows={4}
            cols={50}
          />
        </div>
        {error && <div className="error-message">Error: {error}</div>}
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send for Approval"}
        </button>
        {/* <div className="view-permission-link">
          <Link to="/viewpermission">View Permission</Link>
        </div> */}
      </form>
    </div>
  );
};

export default Permission;