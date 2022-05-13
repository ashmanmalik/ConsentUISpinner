import React, { useState, useCallback } from "react";
import axios from "axios";
import "./index.css";
import qs from "qs";

//const qs = require('qs');

const accessToken =
  "NzM4NDE4YjktNDdlYy00OGI2LTg5ODEtNjg0OGI3NzU2ZDczOjgyNzQ2NmEyLTcyZjgtNGFmMC1iZDQxLTRkMTViNTVjNDQxOQ==";
const apiUrl = "https://au-api.basiq.io/token";

async function getNewServerToken() {
  const { data } = await axios.post('https://au-api.basiq.io/token', qs.stringify({ scope: 'SERVER_ACCESS' }), {
    headers: {
      Authorization: `Basic ${accessToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'basiq-version': '2.0',
    },
  });
  return data.access_token;
}



// axios.interceptors.request.use(
//   (config) => {
//     config.headers.authorization = `Bearer ${accessToken}`;
//     //config.headers["basiq-version"] = `3.0`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

function App() {
  const [users, setUsers] = useState([]);
  const [requestError, setRequestError] = useState();

  const fetchData = useCallback(async () => {
    try {
      // fetch and set users
      const result = await getNewServerToken();
      setUsers(result.data);
    } catch (err) {
      // set request error message
      setRequestError(err.message);
    }
  });

  return (
    <div className="App">
      <button onClick={() => fetchData()}>Get Users</button>
      {users.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}

      {requestError && <p className="error">{requestError}</p>}
    </div>
  );
}

export default App;
