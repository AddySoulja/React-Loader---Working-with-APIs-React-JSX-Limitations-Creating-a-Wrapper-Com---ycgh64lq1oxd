import React from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const App = () => {
  const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    webiste: "",
  });
  const fetchData = () => {
    fetch(`${BASE_URL}/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data));
  };
  const handleOnClick = () => {
    setIsLoading(LoadingStatus.IN_PROGRESS);
    fetchData();
    setTimeout(() => {
      setIsLoading(LoadingStatus.SUCCESS);
    }, 2000);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 100</label>
      <input
        type="number"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>
      <div id="data">
        {isLoading === LoadingStatus.NOT_STARTED ? (
          <h1>Click on the button to get the user</h1>
        ) : isLoading === LoadingStatus.IN_PROGRESS ? (
          <Loader />
        ) : isLoading === LoadingStatus.SUCCESS ? (
          <>
            <h4 id="id">{userData.id}</h4>
            <h4 id="email">{userData.email}</h4>
            <h4 id="name">{userData.name}</h4>
            <h4 id="phone">{userData.phone}</h4>
            <h4 id="website">{userData.website}</h4>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default App;
