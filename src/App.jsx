import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { CitiesProvider } from "./contexts/Cities.context";
import { AuthProvider } from "./contexts/FakeAuth.context";
import ProtectedRoutes from "./Pages/ProtectedRoutes";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { lazy, Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Homepage from "./Pages/Homepage";
// import Login from "./Pages/Login";
// import PageNotFound from "./Pages/PageNotFound";
// import AppLayout from "./Pages/AppLayout";

const Homepage = lazy(()=>import('./pages/Homepage'))
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout= lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-4fe7c673.css   29.96 kB │ gzip:   5.02 kB
// dist/assets/index-4a35703d.js   508.08 kB │ gzip: 148.38 kB

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage/>}>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/product" element={<Product />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
