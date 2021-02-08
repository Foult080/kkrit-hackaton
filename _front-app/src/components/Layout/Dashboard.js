import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "./spinner";
import { Tabs, Tab } from "react-bootstrap";
import NewsForm from "../News/NewsForm";
import UserProfile from "../Employers/UserProfile";
import FAQ from "./FAQ";
import ListEmployers from "../Employers/ListEmployers";
import EmpProfile from "../Employers/EmpProfile";
import ListStudents from "../Employers/ListStudents";
import Hack from "../Hakaton/Hack";
import AdminHacks from "../Hakaton/AdminHacks";
import AdminTeams from "../Hakaton/AdminTeams";

const Dashboard = ({ auth: { loading, user } }) => {
  return loading && user === null ? (
    <Spinner className="spinner" />
  ) : (
    <Fragment>
      <div className="header">
        <img
          className="rounded-circle img-avatar"
          alt="avatar"
          src={user && user.avatar}
        />
        <h3 className="header-text">{user && user.name}</h3>
      </div>
      {/* Container with accordion */}
      <section style={{ marginBottom: "2rem" }}>
        <div className="container">
          <h4 className="title">Информационные ресурсы:</h4>
          {user && user.role === "admin" ? (
            <Tabs defaultActiveKey="hack" id="uncontrolled-tab">
              <Tab eventKey="news" title="Добавить новость">
                <NewsForm />
              </Tab>
              <Tab eventKey="hack" title="ККРИТ Хакатоны">
                <AdminHacks />
              </Tab>
              <Tab eventKey="team" title="Команды Хакатона">
                <AdminTeams />
              </Tab>
            </Tabs>
          ) : user && user.role === "student" ? (
            <Tabs defaultActiveKey="faq" id="uncontrolled-tab-example">
              <Tab eventKey="faq" title="Часто задаваемые вопросы">
                <Fragment>
                  <FAQ />
                </Fragment>
              </Tab>
              <Tab eventKey="profile" title="Анкета Студента ККРИТ">
                <Fragment>
                  <UserProfile />
                </Fragment>
              </Tab>
              <Tab eventKey="employers" title="Список работодателей">
                <Fragment>
                  <ListEmployers />
                </Fragment>
              </Tab>
              <Tab eventKey="hack" title="ККРИТ Хакатон">
                <Fragment>
                  <Hack />
                </Fragment>
              </Tab>
            </Tabs>
          ) : (
            <Tabs defaultActiveKey="students" id="uncontrolled-tab-example">
              <Tab eventKey="faq" title="Часто задаваемые вопросы">
                <Fragment>
                  <FAQ />
                </Fragment>
              </Tab>
              <Tab eventKey="profile" title="Анкета работодателя">
                <Fragment>
                  <EmpProfile />
                </Fragment>
              </Tab>
              <Tab eventKey="students" title="Профили студентов">
                <Fragment>
                  <ListStudents />
                </Fragment>
              </Tab>
            </Tabs>
          )}
        </div>
      </section>
    </Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);
