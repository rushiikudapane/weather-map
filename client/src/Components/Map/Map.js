import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import "./Map.css";
import "../Pagination/Pagination.css";

const Map = () => {
  const [currentPage, setCurrentPage] = useState(0); //state to keep record of page change
  const [data, setData] = useState([]); //state to store the paginated data from API

  //condition is given to execute the getData() function initially when there is no state change of currentPage and avoid re-rendering again and again. otherwise getData() will not get execute until state gets changed
  if (currentPage === 0) {
    setCurrentPage(1);
  }

  //function to request the server for data
  const getData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/show?page=${currentPage}` //current page is passed as query because data is paginated at the server
      );
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]); //when currentPage state gets change, getData function is called and request of that page is made to the backend;

  const defaultPosition = [18.5196, 73.8553]; //default positon for map to be centered
  return (
    <div>
      <div className="map">
        <MapContainer center={defaultPosition} zoom={3}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {data.map((city, id) => {
            return (
              <Marker
                key={id}
                position={[city.coord.lat, city.coord.lon]}
                icon={
                  new Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                  })
                }
              >
                <Popup>
                  <p>
                    <b>City</b> {city.name} <br />
                    <b>Weather:</b> {city.weather[0].description}
                    <br />
                    <b>Avg Temp:</b> {city.main.temp}°C
                    <br />
                    <b>Min Temp:</b> {city.main.temp_min}°C
                    <br />
                    <b>Max Temp:</b> {city.main.temp_max}°C
                    <br />
                    <b>Humidity:</b> {city.main.humidity}
                    <br />
                  </p>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      <div className="page-div">
        <Pagination setCurrentPage={setCurrentPage} />{" "}
        {/*setCurrentPage is passed as a prop to get number of current page */}
      </div>
    </div>
  );
};

export default Map;
