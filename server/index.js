const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

app.use(cors());
app.use(bodyParser.json());

app.post("/api/sendYear", (req, res) => {
  const receiveYear = req.body.year;
  const data = new FormData();
  data.append("year", JSON.parse(receiveYear));

  const config = {
    method: "post",
    url: "https://www.paintscratch.com/content/widgets/color_search/color_search_functions.php",
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error occurred while fetching data");
    });
});

app.post("/api/sendModel", (req, res) => {
  const receiveVehicle = req.body.make;
  const receiveYear = req.body.year;
  var qs = require("qs");
  var data = qs.stringify({
    year: receiveYear,
    make: receiveVehicle,
  });

  const config = {
    method: "post",
    url: "https://www.paintscratch.com/content/widgets/color_search/color_search_functions.php",
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error occurred while fetching data");
    });
});

app.post("/api/selectColor", (req, res) => {
  const receiveModel = req.body.model;
  const receiveVehicle = req.body.make;
  const receiveYear = req.body.year;

  var axios = require("axios");
  var qs = require("qs");
  var data = qs.stringify({
    model: receiveModel,
    year: receiveYear,
    make: receiveVehicle,
  });
  var config = {
    method: "post",
    url: "https://www.paintscratch.com/cgi-bin/select-color.cgi",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error occurred while fetching data");
    });
});

app.get("/api/vehicle", (req, res) => {
  const data = new FormData();
  data.append("year", "2020");

  const config = {
    method: "post",
    url: "https://www.paintscratch.com/content/widgets/color_search/color_search_functions.php",
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error occurred while fetching data");
    });
});

app.get("/api/model", (req, res) => {
  const data = new FormData();
  data.append("year", "2020");
  data.append("make", "BMW-Motorcycles");

  const config = {
    method: "post",
    url: "https://www.paintscratch.com/content/widgets/color_search/color_search_functions.php",
    data: data,
  };

  axios(config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send("Error occurred while fetching data");
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
