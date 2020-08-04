import React from "react";

const Detail = (props) => (
  <div className="OrderDetails-Row">
    <p className="OrderDetails-Detail">{props.name}</p>
    <div className="OrderDetails-Separator" />
    <p className="OrderDetails-Value">
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
