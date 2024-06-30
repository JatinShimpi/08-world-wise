const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  try {
    const newCity = JSON.parse(event.body);
    const jsonData = fs.readFileSync(
      path.join(__dirname, "cities.json"),
      "utf8"
    );
    const cities = JSON.parse(jsonData);

    newCity.id = Math.max(...cities.map((city) => city.id)) + 1;
    cities.push(newCity);

    fs.writeFileSync(
      path.join(__dirname, "cities.json"),
      JSON.stringify(cities, null, 2)
    );

    return {
      statusCode: 201,
      body: JSON.stringify(newCity),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to create city" }),
    };
  }
};
