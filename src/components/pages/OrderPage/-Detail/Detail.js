import React from 'react'

const Detail = (props) => {
  return (
    <div className="OrderPage-Content-Order-Details-Row">
      <p className="OrderPage-Content-Order-Details-Detail">{props.name}</p>
      <div className="OrderPage-Content-Order-Details-Separator"></div>
      <p className="OrderPage-Content-Order-Details-Value">{props.value}</p>
    </div>
  );
};

export default Detail