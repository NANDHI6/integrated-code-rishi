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















// -----------------------------------------------------------------------------

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { sendPermissionRequest } from "../../HTTPHandler/api";
import { useNavigate } from "react-router-dom";
import './permission.css'; // Ensure correct file extension

export const Permission = () => {
  const [currentDate, setCurrentDate] = useState("");
  const [startTimeHour, setStartTimeHour] = useState("00");
  const [startTimeMinute, setStartTimeMinute] = useState("00");
  const [startTimeAmPm, setStartTimeAmPm] = useState("AM");
  const [endTimeHour, setEndTimeHour] = useState("00");
  const [endTimeMinute, setEndTimeMinute] = useState("00");
  const [endTimeAmPm, setEndTimeAmPm] = useState("AM");
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userEmail = useSelector((state) => state.auth.user?.Email);

  // Format date to DD/MM/YYYY
  const formatDateToDisplay = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  // Format date to YYYY-MM-DD for input
  const formatDateToInputValue = (date) => {
    const [day, month, year] = date.split('/');
    return `${year}-${month}-${day}`;
  };

  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDateFromInputValue = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const today = formatDateToDisplay(new Date());
    setCurrentDate(today);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currentDate || !startTimeHour || !startTimeMinute || !startTimeAmPm || !endTimeHour || !endTimeMinute || !endTimeAmPm || !reason) {
        setError("All fields are required");
        toast.error("All fields are required");
        return;
      }

      // Convert selected time to 24-hour format for API consistency
      const formattedStartTime = convertTo24HourFormat(startTimeHour, startTimeMinute, startTimeAmPm);
      const formattedEndTime = convertTo24HourFormat(endTimeHour, endTimeMinute, endTimeAmPm);

      // Check if end time is after start time
      if (formattedEndTime <= formattedStartTime) {
        setError("End time must be after start time");
        toast.error("End time must be after start time");
        return;
      }

      setIsLoading(true);
      if (!userEmail) {
        throw new Error("User email not found");
      }

      const formattedDateForSubmission = formatDateToInputValue(currentDate);

      const response = await sendPermissionRequest(userEmail, formattedDateForSubmission, formattedStartTime, formattedEndTime, reason);
      console.log(response);
      toast.success("Permission request sent successfully!");

      // Clear form data after successful submission
      setCurrentDate(formatDateToDisplay(new Date()));
      setStartTimeHour("00");
      setStartTimeMinute("00");
      setStartTimeAmPm("AM");
      setEndTimeHour("00");
      setEndTimeMinute("00");
      setEndTimeAmPm("AM");
      setReason("");
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    const formattedDate = formatDateFromInputValue(date);
    setCurrentDate(formattedDate);
  };

  const handleStartTimeHourChange = (e) => {
    setStartTimeHour(e.target.value);
  };

  const handleStartTimeMinuteChange = (e) => {
    setStartTimeMinute(e.target.value);
  };

  const handleStartTimeAmPmChange = (e) => {
    setStartTimeAmPm(e.target.value);
  };

  const handleEndTimeHourChange = (e) => {
    setEndTimeHour(e.target.value);
  };

  const handleEndTimeMinuteChange = (e) => {
    setEndTimeMinute(e.target.value);
  };

  const handleEndTimeAmPmChange = (e) => {
    setEndTimeAmPm(e.target.value);
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value);
  };

  // Function to convert selected time to 24-hour format
  const convertTo24HourFormat = (hour, minute, amPm) => {
    let hh = parseInt(hour, 10);
    const mm = parseInt(minute, 10);
    if (amPm === "PM" && hh < 12) hh += 12;
    if (amPm === "AM" && hh === 12) hh = 0;
    const formattedHour = String(hh).padStart(2, '0');
    const formattedMinute = String(mm).padStart(2, '0');
    return `${formattedHour}:${formattedMinute}`;
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
            value={formatDateToInputValue(currentDate)}
            min={formatDateToInputValue(formatDateToDisplay(new Date()))}
            onChange={handleDateChange}
          />
        </div>
        <div className="form-group time-group">
          <label>Start Time:</label>
          <div className="time-select-group">
            <select value={startTimeHour} onChange={handleStartTimeHourChange} className="time-select">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                <option key={`start-hour-${hour}`} value={String(hour).padStart(2, '0')}>{String(hour).padStart(2, '0')}</option>
              ))}
            </select>
            :
            <select value={startTimeMinute} onChange={handleStartTimeMinuteChange} className="time-select">
              {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                <option key={`start-minute-${minute}`} value={String(minute).padStart(2, '0')}>{String(minute).padStart(2, '0')}</option>
              ))}
            </select>
            <select value={startTimeAmPm} onChange={handleStartTimeAmPmChange} className="time-select">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="form-group time-group">
          <label>End Time:</label>
          <div className="time-select-group">
            <select value={endTimeHour} onChange={handleEndTimeHourChange} className="time-select">
              {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                <option key={`end-hour-${hour}`} value={String(hour).padStart(2, '0')}>{String(hour).padStart(2, '0')}</option>
              ))}
            </select>
            :
            <select value={endTimeMinute} onChange={handleEndTimeMinuteChange} className="time-select">
              {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                <option key={`end-minute-${minute}`} value={String(minute).padStart(2, '0')}>{String(minute).padStart(2, '0')}</option>
              ))}
            </select>
            <select value={endTimeAmPm} onChange={handleEndTimeAmPmChange} className="time-select">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason:</label>
          <textarea
            id="reason"
            value={reason}
            onChange={handleReasonChange}
            rows={4}
            cols={50}
            maxLength={300} // Limit to 300 characters
          />
          <div className="length">{reason.length}/300</div> {/* Character counter */}
        </div>
        {error && <div className="error-message">Error: {error}</div>}
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send for Approval"}
        </button>
      </form>
    </div>
  );
};

export default Permission;




