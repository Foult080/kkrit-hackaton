import React, { Fragment } from "react";
import Moment from "react-moment";
import "moment/locale/ru";

const HackItem = ({ hack: { name, cases, date } }) => {
  return (
    <Fragment>
      <div className="card my-2">
        <h5 className="card-header">
          {name} - <Moment locale="ru" format="ll">{date}</Moment>
        </h5>
        <div className="card-body">
          <h5 className="card-title">Кейсы хакатона:</h5>
          <div className="card-text text-justify">
            <ul>
              {cases.map((el) => (
                <li key={el._id}>
                  <p>
                    {el.name} : {el.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HackItem;
