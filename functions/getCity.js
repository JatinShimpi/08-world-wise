const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  const { id } = event.queryStringParameters;
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "cities.json"),
      "utf8"
    );
    const cities = JSON.parse(jsonData);
    const city = cities.find((city) => city.id === parseInt(id));
    if (city) {
      return {
        statusCode: 200,
        body: JSON.stringify(city),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "City not found" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to read city data" }),
    };
  }
};
