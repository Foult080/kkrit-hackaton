import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNews } from "../../actions/news";
import NewsItem from "./NewsItem";
import Spinner from "../Layout/spinner";
import { Link } from "react-router-dom";

const styles = {
  buttons: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    textAlign: "center",
    marginTop: "2rem",
  },
};

const News = ({ getNews, news: { posts, loading } }) => {
  useEffect(() => {
    getNews();
  }, [getNews]);

  return loading || posts === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container">
        <h1 style={styles.title}>Новости площадки</h1>
        <hr />
        <div className="posts">
          {posts.map((post) => (
            <NewsItem key={post._id} post={post} />
          ))}
        </div>
        <div style={styles.buttons} className="buttons">
          <Link to="/" className="btn btn-success px-4">
            К главной странице
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

News.propTypes = {
  getNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  news: state.news,
});

export default connect(mapStateToProps, { getNews })(News);
