import React from "react";
import './Title.css'

const Title = () => {
   return (
      <section className="banner img-fluid">
         <h3>YELPCAMP</h3>
         <p>
            View CampgrounDs from all over the worlD. <br />{" "}
         </p>
         <i className="fas fa-map-signs" id="theLargestLogo"></i>
      </section>
   );
};

export default Title;
