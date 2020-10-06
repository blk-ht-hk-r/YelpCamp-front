import React from "react";

const LeftBar = (props) => {
   return (
      <div className="col-md-3">
         <div className="d-none d-md-block">
            <div className="lead text-center text-capitalize">
               {props.campground.title}
            </div>
            <div className="card shadow-sm mt-2">
               <div className="card-header">
                  <i className="far fa-calendar-alt"></i>
                  {` Booking Window`}
               </div>
               <ul className="list-group list-group-flush">
                  <li className="list-group-item text-capitalize">Feb-June</li>
               </ul>
            </div>
            <div className="card shadow-sm mt-3">
               <div className="card-header">
                  <i className="far fa-smile"></i>
                  {` Amenities`}
               </div>
               <ul className="list-group list-group-flush">
                  <li className="list-group-item text-capitalize">Hot</li>
               </ul>
            </div>
            <div className="card shadow-sm mt-3">
               <div className="card-header">
                  <i className="fas fa-phone"></i>
                  {` Contact`}
               </div>
               <ul className="list-group list-group-flush">
                  <li className="list-group-item">9568125761</li>
               </ul>
            </div>
         </div>
      </div>
   );
};

export default LeftBar;
