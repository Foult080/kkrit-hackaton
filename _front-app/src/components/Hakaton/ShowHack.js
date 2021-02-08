import React, { Fragment } from "react";
import Moment from "react-moment";
import "moment/locale/ru";

const showHack = ({ hack: { date, name, cases } }) => {
  return (
    <Fragment>
      <h4 className="title">Ближайший хакатон:</h4>
      <hr />
      <div>
        <div className="card news-card">
          <h5 className="card-header">
          <Moment locale="ru" format='ll'>{date}</Moment>
          </h5>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <div className="card-text text-justify">
              <ul>
                {cases.map((el) => (
                  <li key={el._id}>
                    <p>
                      {el.name}: {el.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default showHack;
