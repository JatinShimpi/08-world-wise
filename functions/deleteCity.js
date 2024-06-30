const fs = require("fs");
const path = require("path");

exports.handler = async function (event, context) {
  const { id } = event.queryStringParameters;
  try {
    const jsonData = fs.readFileSync(
      path.join(__dirname, "cities.json"),
      "utf8"
    );
    let cities = JSON.parse(jsonData);

    cities = cities.filter((city) => city.id !== parseInt(id));

    fs.writeFileSync(
      path.join(__dirname, "cities.json"),
      JSON.stringify(cities, null, 2)
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "City deleted successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to delete city" }),
    };
  }
};
