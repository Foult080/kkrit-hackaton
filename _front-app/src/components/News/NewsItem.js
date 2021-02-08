import React from "react";
import ReactHtmlParser from "react-html-parser";
import Moment from "react-moment";
import "moment/locale/ru";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const NewsItem = ({ post: { _id, title, desc, date } }) => {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <Card.Header as="h5">
        <Moment locale="ru" format="ll">
          {date}
        </Moment>
      </Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="card-text text-justify">
          {ReactHtmlParser(desc.slice(0, 200) + "...")}
        </div>
        <Link to={`/news/${_id}`}>
          <Button variant="primary">Подбробнее</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NewsItem;