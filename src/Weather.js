import { useState, useEffect } from "react";
import { CiSearch, CiCloudOn, CiCloudDrizzle } from "react-icons/ci";
import { MdOutlineLightMode, MdOutlineNightlight } from "react-icons/md";
import { PiArrowLineDown, PiArrowLineUp } from "react-icons/pi";
import styles from "./index.module.sass";

function Weather() {
  const [input, setInput] = useState("");
  const [word, setWord] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAPI(url) {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error("Fetch error");
        alert("The country is invalid");
      }
    }

    if (word) {
      fetchAPI(`https://api.openweathermap.org/data/2.5/weather?q=${word}&appid=${process.env.REACT_APP_API_KEY}`);
    }
  }, [word]);

  console.log(data);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function handleSearch() {
    setWord(input);
  }

  function getStatusIcon(temp) {
    if (temp > 30) {
      return <MdOutlineLightMode className={styles.statusIcon} />;
    } else if (temp < 10) {
      return <CiCloudDrizzle className={styles.statusIcon} />;
    } else {
      return <CiCloudOn className={styles.statusIcon} />;
    }
  }

  return (
    <div className={styles.weather}>
      <h2>Weather App</h2>

      <div className={styles.formGroup}>
        <input type="text" placeholder="Search" value={input} onChange={handleInputChange} />
        <CiSearch className={styles.searchIcon} onClick={handleSearch} />
      </div>

      {data && (
        <div className={styles.content}>
          <div className={styles.top}>
            {getStatusIcon(data.main.temp - 273.15)}
            {/* <MdOutlineLightMode className={styles.statusIcon} /> */}
            <span>
              <p>{data.weather[0].main}</p>
              <p>{data.name}</p>
            </span>
          </div>
          <div className={styles.mid}>
            <p>{(data.main.temp - 273.15).toFixed(1)}&deg;</p>
            <span>
              <p>
                <PiArrowLineDown className={styles.midIcon} />
                {(data.main.temp_min - 273.15).toFixed(1)}&deg;
              </p>
              <p>
                <PiArrowLineUp className={styles.midIcon} />
                {(data.main.temp_max - 273.15).toFixed(1)}&deg;
              </p>
            </span>
          </div>
          <div className={styles.bot}>
            <div>
              <span>Humidity</span>
              <span>{data.main.humidity}%</span>
            </div>
            <div>
              <span>Rainfall</span>
              <span>0 mm</span>
            </div>
            <div>
              <span>Gusture</span>
              <span>{data.wind.speed} km/h</span>
            </div>
          </div>

          <button type="button">Today Forecast</button>
        </div>
      )}
    </div>
  );
}

export default Weather;
