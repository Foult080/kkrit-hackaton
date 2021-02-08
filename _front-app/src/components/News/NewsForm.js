import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { sendNews } from "../../actions/news";
import { connect } from "react-redux";

const NewsForm = ({ sendNews }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });

  const { title, desc } = formData;

  const OnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    sendNews({ title, desc });
    setFormData({ title: "", desc: "" });
  };

  return (
    <Fragment>
      <div className="ml-auto mx-auto col-lg-12 col-md-10 col-sm-8">
        <form className="ml-auto mx-auto" onSubmit={(e) => OnSubmit(e)}>
          <h4>Добавить новость:</h4>
          <input
            type="text"
            id="title-from"
            className="form-control"
            placeholder="Укажите заголовок"
            name="title"
            value={title}
            onChange={(e) => OnChange(e)}
          />
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="4"
            required
            name="desc"
            placeholder="Укажите новость"
            value={desc}
            onChange={(e) => OnChange(e)}
          />
          <button className="btn btn-primary contact-butt" type="submit">
            Добавить новость
          </button>
        </form>
        <div className="someDiv" />
      </div>
    </Fragment>
  );
};

NewsForm.propTypes = {
  sendNews: PropTypes.func.isRequired,
};

export default connect(null, { sendNews })(NewsForm);
