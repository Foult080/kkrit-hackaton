import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNewsEl } from "../../actions/news";
import Spinner from "../Layout/spinner";
import Moment from "react-moment";
import "moment/locale/ru";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

const NewsEl = ({ match, getNewsEl, news: { post, loading } }) => {
  useEffect(() => {
    getNewsEl(match.params.id);
  }, [getNewsEl, match.params.id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container col-lg-8 col-md-6 col-sm-6">
        <h5 className="news-title">{post.title}</h5>
        <hr />
        <div className="news-content text-justify">
          {ReactHtmlParser(post.desc)}
        </div>
        <div className="news-date">
          <p>
            <Moment locale="ru" format="ll">
              {post.date}
            </Moment>
          </p>
        </div>
        <div className="text-center">
          <Link to="/" className="btn btn-primary mr-1">
            К главной странице
          </Link>
          <Link to="/news" className="btn btn-success">
            Назад к новостям
          </Link>
        </div>
        <div className="someDiv" />
      </div>
    </Fragment>
  );
};

NewsEl.propTypes = {
  getNewsEl: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, { getNewsEl })(NewsEl);
