import React from "react";

const Detail = (props) => (
  <div className="OrderPage-Content-Order-Details-Row">
    <p className="OrderPage-Content-Order-Details-Detail">{props.name}</p>
    <div className="OrderPage-Content-Order-Details-Separator" />
    <p className="OrderPage-Content-Order-Details-Value">
      {typeof props.value === "object" ? (
        <>
          <span>
            {props.value.city}
            {props.value.city && props.value.address ? "," : ""}
          </span>
          <span>{props.value.address}</span>
        </>
      ) : (
        props.value
      )}
    </p>
  </div>
);

export default Detail;
