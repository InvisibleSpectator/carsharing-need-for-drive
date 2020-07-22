import React, { Fragment } from "react";

const Detail = (props) => {
  return (
    <div className="OrderPage-Content-Order-Details-Row">
      <p className="OrderPage-Content-Order-Details-Detail">{props.name}</p>
      <div className="OrderPage-Content-Order-Details-Separator"></div>
      <p className="OrderPage-Content-Order-Details-Value">
        {typeof props.value === "object" ? (
          <Fragment>
            <span>
              {props.value.city}
              {props.value.city && props.value.address ? "," : ""}
            </span>
            <span>{props.value.address}</span>
          </Fragment>
        ) : (
          props.value
        )}
      </p>
    </div>
  );
};

export default Detail;
