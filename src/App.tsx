import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

function App() {
  const [zipCode, setZipCode] = useState("");
  const [codes, setCodes] = useState([]);
  const validateZipCode = (): void => {
    const regex = /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/;
    if (regex.test(zipCode)) {
      toast.success("Valid Zip Code", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.error("Zip Code is invalid", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/klasikcorp30/US-Zip-Codes-JSON/master/USCities.json"
    )
      .then((res) => res.json())
      .then((data) => {
        let zipCodes = data.filter((item: any) => item?.zip_code > 9999);
        //Only get the zip_code key from the object
        zipCodes = zipCodes.map((item: any) => item.zip_code.toString());

        setCodes(zipCodes);
      });
  }, []);

  const handleZipCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setZipCode(e.target.value.replace(/\D/g, ""));
  };

  return (
    <div className="App">
      <input
        value={zipCode}
        onChange={handleZipCodeChange}
        type="text"
        maxLength={5}
        list="zip-codes"
        className="zip-input"
        placeholder="Zip Code"
      />
      <datalist id="zip-codes">
        {codes
          .filter((el: string) => el.includes(zipCode))
          .map((code: string) => (
            <option key={code} value={code} />
          ))}
      </datalist>
      <button onClick={validateZipCode} className="zip-button">
        Get Zip Info
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
