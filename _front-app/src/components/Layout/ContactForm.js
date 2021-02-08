import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { sendContact } from "../../actions/contact";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const ContactForm = ({ sendContact }) => {
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    form: "",
  });

  let history = useHistory();

  const { email, title, form } = formData;

  const OnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const OnSubmit = (e) => {
    e.preventDefault();
    sendContact({ email, title, form });
    history.push("/");
  };

  return (
    <Fragment>
      <section className="text-center">
        <div className="container" style={{ marginTop: "10%" }}>
          <h1 className="title">Форма обратной связи:</h1>
          <hr />
          <form onSubmit={OnSubmit}>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email адрес"
              autoFocus
              required
              name="email"
              value={email}
              onChange={OnChange}
            />
            <input
              type="text"
              id="title-from"
              className="form-control my-1"
              placeholder="Укажите заголовок"
              name="title"
              value={title}
              onChange={OnChange}
            />
            <textarea
              className="form-control my-1"
              id="exampleFormControlTextarea1"
              rows="4"
              required
              name="form"
              placeholder="Укажите суть обращения"
              value={form}
              onChange={OnChange}
            />
            <button className="btn btn-primary" type="submit">
              Отправить
            </button>
            <div>
              <small className="my-2">
                Нажимая на кнопку вы даёте согласие, на обработку персональных
                данных и соглашаетесь с{" "}
                <a href="/privacy">политикой конфиденциальности</a>
              </small>
            </div>
          </form>
        </div>
      </section>
    </Fragment>
  );
};

ContactForm.propTypes = {
  sendContact: PropTypes.func.isRequired,
};

export default connect(null, { sendContact })(ContactForm);
