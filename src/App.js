import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Navbarme from "./components/Navbar/Navbarme";
import Campgrounds from "./components/Home/AllCamps/Campgrounds";
import Campground from "./components/IndividualCamp/Campground";
import NewCampground from "./components/FormsCampground/NewCampground";
import Home from "./components/Landing/Landing";
import EditCampground from "./components/FormsCampground/EditCampground";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/Footer/Footer,";

const App = () => {
   const location = useLocation();

   return (
      <div>
         <Navbarme />
         <Switch>
            <PrivateRoute exact path="/campgrounds/new">
               <NewCampground />
            </PrivateRoute>
            <Route exact path="/campgrounds">
               <Campgrounds />
            </Route>
            <PrivateRoute path="/campgrounds/:id/edit">
               <EditCampground />
            </PrivateRoute>
            <Route path="/campgrounds/:id">
               <Campground />
            </Route>
            <Route exact path="/login">
               <Login />
            </Route>
            <Route exact path="/register">
               <Register />
            </Route>
            <Route exact path="/">
               <Home />
            </Route>
         </Switch>
         {location.pathname !== "/" ? <Footer /> : null}
         <ToastContainer hideProgressBar={true} autoClose={1000}/>
      </div>
   );
};

export default App;
