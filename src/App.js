import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=dec6c62f7997d009ebb552a4948adb0c`;

  const searchLoc = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((res) => {
        setData(res.data);
      });
      setLocation("");
    }
  };

  const date = new Date();

  return (
    <main className="w-full h-screen p-5 bg-center bg-cover absolute top-0 left-0 main">
      <input
        type="text"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLoc}
        className="bg-gray-800 text-white w-64 h-9 px-3 mx-auto block rounded-2xl outline-none border-[1px] md:w-80"
        placeholder="Enter city"
      />
      <div className="max-w-xl h-4/5 mt-16 mx-auto px-3 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl text-slate-300">{data.name}</h3>
            {data.main ? (
              <h1 className="text-6xl text-slate-200 font-bold">
                {(data.main.temp - 273.15).toFixed()}°C
              </h1>
            ) : (
              ""
            )}
            {data.main !== undefined ? (
              <h3 className="text-slate-300">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </h3>
            ) : (
              ""
            )}
          </div>
          {data.weather ? (
            <h3 className="text-xl text-slate-300">{data.weather[0].main}</h3>
          ) : (
            ""
          )}
        </div>
        {data.main !== undefined && (
          <div className="w-80 h-20 mx-auto pt-3 text-slate-300 rounded-xl flex justify-around md:w-96 bottom">
            <div>
              {data.main ? (
                <p className="text-center font-bold">
                  {(data.main.feels_like - 273.15).toFixed()}°C
                </p>
              ) : (
                ""
              )}

              <p>Feels Like</p>
            </div>
            <div>
              {data.main ? (
                <p className="text-center font-bold">
                  {data.main.humidity.toFixed()}%
                </p>
              ) : (
                ""
              )}
              <p>Humidity</p>
            </div>
            <div>
              {data.wind ? (
                <p className="text-center font-bold">
                  {data.wind.speed.toFixed()} MPH
                </p>
              ) : (
                ""
              )}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
