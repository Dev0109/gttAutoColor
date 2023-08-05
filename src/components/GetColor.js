import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import baseURL from "../config";

const GetColor = () => {
  const [vehicles, setVehicles] = useState([]);
  const [models, setModels] = useState([]);
  const [year, setYear] = useState("2020");
  const [vehicle, setVehicle] = useState("");
  const [model, setModel] = useState("[]");
  const [htmlData, setHtmlData] = useState([]);
  const [isShowSpinner, setIsShowSpinner] = useState(false);

  const SpinnerStyle = {
    visibility: isShowSpinner ? "visible" : "hidden",
  };

  const hideSpinner = () => {
    setTimeout(() => {
      setIsShowSpinner(false);
    }, 2000);
  }

  useEffect(() => {
    axios
      .get(`${baseURL}/api/vehicle`)
      .then((response) => {
        const tags = response.data.split("<option value = ").slice(1);
        const tagValues = tags.map((tag) =>
          tag.split(">")[1].split("<")[0].trim()
        );
        setVehicles(tagValues);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    axios
      .get(`${baseURL}/api/model`)
      .then((response) => {
        const tags = response.data.split("<option value = ").slice(1);
        const tagValues = tags.map((tag) =>
          tag.split(">")[1].split("<")[0].trim()
        );
        setModels(tagValues);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }, []);

  const handleYear = ({ target }) => {
    setIsShowSpinner(true);
    hideSpinner();
    setYear(target.value);
    fetch(`${baseURL}/api/sendYear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ year: target.value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        const tags = data.split("<option value = ").slice(1);
        const tagValues = tags.map((tag) =>
          tag.split(">")[1].split("<")[0].trim()
        );
        setVehicles(tagValues);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleVehicle = ({ target }) => {
    setIsShowSpinner(true);
    hideSpinner();
    setVehicle(target.value);
    fetch(`${baseURL}/api/sendModel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: year, make: target.value }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const tags = data.split("<option value = ").slice(1);
        const tagValues = tags.map((tag) =>
          tag.split(">")[1].split("<")[0].trim()
        );
        setModels(tagValues);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const handleModel = ({ target }) => {
    setModel(target.value);
  };

  const handleSelectColor = () => {
    setIsShowSpinner(true);
    hideSpinner();
    fetch(`${baseURL}/api/selectColor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ year: year, make: vehicle, model: model }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const modifiedData = data.replace(
          /onclick="highlightRow\(\d+\);"/g,
          ""
        );
        const parser = new DOMParser();
        const doc = parser.parseFromString(modifiedData, "text/html");
        const inputs = doc.querySelectorAll("input");
        inputs.forEach((input) => input.parentNode.removeChild(input));
        const hs = doc.querySelectorAll(".color-info[style='padding-bottom: 15px;']");
        hs.forEach((h) => h.parentNode.removeChild(h));
        const tableElement = doc.getElementById("color-display-table");
        setHtmlData(tableElement);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  return (
    <div className="getColor">
      <div>
        <div className="getcolor_header">
          {/* <img src="paintscratch-logo.jpg" alt="paintscratch" className="paintscratch"/> */}
          <h1 className="getcolor_header_text uppercase">
            Automotive touch up paint
          </h1>
        </div>
        <div className="getcolor_content">
          <div className="grid grid-cols-2 gap-4">
            <div className="...">
              <div className="text-2xl getcolor_text1_style">
                PaintScratch sells original factory touch up paint for your car,
                truck or SUV.
              </div>
              <p>
                Order the same touch up paint used by auto industry
                professionals in Spray Cans, Paint Pens, Brush Cap Bottles, and
                larger sizes.
              </p>
            </div>
            <img src="./paint-car.jpg" alt="paiotCar" className="..." />
          </div>
          <div className="text-center getColor_selectPart mt-4">
            <div className="getColor_start_text">Start Here</div>
            <div className="spinners" style={SpinnerStyle}>
              <div className="spinner-grow text-muted"></div>
              <div className="spinner-grow text-primary"></div>
              <div className="spinner-grow text-success"></div>
              <div className="spinner-grow text-info"></div>
              <div className="spinner-grow text-warning"></div>
              <div className="spinner-grow text-danger"></div>
              <div className="spinner-grow text-secondary"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <select
                className="form_control"
                name="year"
                id="year"
                onChange={handleYear}
                defaultValue="2020"
                disabled={isShowSpinner}
              >
                <option value="">Select vehicle year...</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
                <option value="1983">1983</option>
                <option value="1982">1982</option>
                <option value="1981">1981</option>
                <option value="1980">1980</option>
                <option value="1979">1979</option>
                <option value="1978">1978</option>
                <option value="1977">1977</option>
                <option value="1976">1976</option>
                <option value="1975">1975</option>
                <option value="1974">1974</option>
                <option value="1973">1973</option>
                <option value="1972">1972</option>
                <option value="1971">1971</option>
                <option value="1970">1970</option>
                <option value="1969">1969</option>
                <option value="1968">1968</option>
                <option value="1967">1967</option>
                <option value="1966">1966</option>
                <option value="1965">1965</option>
                <option value="1964">1964</option>
                <option value="1963">1963</option>
                <option value="1962">1962</option>
                <option value="1961">1961</option>
                <option value="1960">1960</option>
                <option value="1959">1959</option>
                <option value="1958">1958</option>
                <option value="1957">1957</option>
                <option value="1956">1956</option>
                <option value="1955">1955</option>
                <option value="1954">1954</option>
                <option value="1953">1953</option>
                <option value="1952">1952</option>
                <option value="1951">1951</option>
                <option value="1950">1950</option>
              </select>
              <select
                className="form_control"
                name="vehicle"
                id="vehicle"
                onChange={handleVehicle}
                disabled={isShowSpinner}
              >
                {vehicles.map((vehicle) => {
                  return (
                    <option value={vehicle} key={vehicle}>
                      {vehicle}
                    </option>
                  );
                })}
              </select>
              <select
                className="form_control"
                name="model"
                id="model"
                onChange={handleModel}
                disabled={isShowSpinner}
              >
                {models.map((model) => {
                  return (
                    <option value={model} key={model}>
                      {model}
                    </option>
                  );
                })}
              </select>
            </div>
            <Button className="findColorBtn" onClick={handleSelectColor}>
              Find Your Color
            </Button>
          </div>
          {htmlData ? (
            <div dangerouslySetInnerHTML={{ __html: htmlData.outerHTML }} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetColor;
