import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewBody.css";
import { getCars } from "../../api/carsApi";

const ViewBody = () => {
  const { id } = useParams();
  const [carsDataApi, setCarsDataApi] = useState([]);
  useEffect(() => {
    getCars()
      .then((res) => {
        setCarsDataApi(res.data.cars);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="view__container">
      <div className="image__container">
        <img
          className="img__width"
          src="https://images.garipoint.com/images/vehicle_notavailable.jpg"
          alt="not__found"
        />
      </div>
      <div className="cars__detail-container">
        {carsDataApi
          .filter((item, key) => item.id == id)
          .map((item, key) => {
            return (
              <div>
                <h1 className="price__title">{item.price}</h1>

                <span className="car__name">{item.car}</span>

                <div className="flex__description">
                  <p style={{ fontWeight: "bold" }}>Car Model : </p> <hr />
                  <p>{item.car_model}</p>
                </div>
                <div className="flex__description">
                  <p style={{ fontWeight: "bold" }}>Car Color : </p> <hr />
                  <p>{item.car_color}</p>
                </div>
                <div className="flex__description">
                  <p style={{ fontWeight: "bold" }}>Model Year : </p> <hr />
                  <p>{item.car_model_year}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ViewBody;
