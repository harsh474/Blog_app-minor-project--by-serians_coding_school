import React from 'react';
import axios from 'axios'; // Import Axios

function Dashboard() {
  function submit(e) {
    e.preventDefault();
    axios.get("http://localhost:4000/api/user/dashboard")
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data:', error);
      });
  }

  return (
    <button onClick={submit}>click me</button>
  );
}

export default Dashboard;
