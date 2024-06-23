import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Homepage from "./Pages/Homepage";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City"
import Form from "./components/Form"

const BASE_URl = "http://localhost:9000";

function App() {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URl}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={<Navigate replace to="cities"/>}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isloading={isloading} />}
          />

          <Route path='cities/:id' element={<City/>}/>
           
          <Route
            path="countries"
            element={<CountryList cities={cities} isloading={isloading} />}
          />
          <Route path="form" element={<Form/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
