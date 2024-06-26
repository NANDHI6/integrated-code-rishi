// inde// index.js

const { calculateProductiveHours } = require('./timeCalculations');

const data = [
  {
    Userid: "Rishichandar@devpozent.com",
    Date: "2024-06-01",
    activity_type: "Time In",
    time: "10:15:14"
  },
  {
    Userid: "Rishichandar@devpozent.com",
    Date: "2024-06-01",
    activity_type: "Time Out",
    time: "16:23:01"
  },
  {
    Userid: "Rishichandar@devpozent.com",
    Date: "2024-06-01",
    activity_type: "lunchin",
    time: "14:48:09"
  },
  {
    Userid: "Rishichandar@devpozent.com",
    Date: "2024-06-01",
    activity_type: "lunchout",
    time: "14:48:12"
  },
  // Add more user data here
];

const results = calculateProductiveHours(data);
console.log(results);
