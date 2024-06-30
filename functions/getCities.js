const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "cities.json"),
      "utf8"
    );
    const cities = JSON.parse(jsonData);
    return {
      statusCode: 200,
      body: JSON.stringify(cities),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to read cities data" }),
    };
  }
};
