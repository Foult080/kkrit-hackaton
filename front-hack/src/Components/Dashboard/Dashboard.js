import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Tab, Menu, Image, Header } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import Team from "./Team";
import Hack from "./Hack";
import ArchiveHack from "./ArchiveHack";
import ListTeams from "./Admins/ListTeams";
import ListHack from "./Admins/ListHack";
import ListTasks from "./Admins/ListTasks";

const Dashboard = ({ auth: { user, loading } }) => {
  let panes = [];
  if (user) {
    user.role === "admin"
      ? (panes = [
          {
            menuItem: (
              <Menu.Item key="avatar" active={false}>
                <Image src={user.avatar} size="medium" circular />
                <Header textAlign="center" as="h3" content={user.name} />
              </Menu.Item>
            ),
            render: () => <ListHack />,
          },
          {
            menuItem: {
              key: "users",
              icon: "users",
              content: "Список команд",
            },
            render: () => <ListTeams />,
          },
          {
            menuItem: {
              key: "tasks",
              icon: "tasks",
              content: "Список задач",
            },
            render: () => <ListTasks />,
          },
          {
            menuItem: {
              key: "hackList",
              icon: "list alternate outline",
              content: "Текущий конкурс",
            },
            render: () => <ListHack />,
          },
          {
            menuItem: {
              key: "archive",
              icon: "archive",
              content: "Архив хакатонов",
            },
            render: () => <ArchiveHack />,
          },
        ])
      : (panes = [
          {
            menuItem: (
              <Menu.Item key="avatar" active={false}>
                <Image src={user.avatar} size="medium" circular />
                <Header textAlign="center" as="h3" content={user.name} />
              </Menu.Item>
            ),
            render: () => <Team />,
          },
          {
            menuItem: {
              key: "hack",
              icon: "winner",
              content: "Текущий конкурс",
            },
            render: () => <Hack />,
          },
          {
            menuItem: { key: "team", icon: "users", content: "Моя команда" },
            render: () => <Team />,
          },
          {
            menuItem: {
              key: "archive",
              icon: "archive",
              content: "Архив конкурсов",
            },
            render: () => <ArchiveHack />,
          },
          {
            menuItem: {
              key: "faq",
              icon: "question circle",
              content: "F.A.Q.",
            },
            render: () => <Hack />,
          },
        ]);
  }

  return (
    <Container style={{ minHeight: "100vh", marginTop: "80px" }}>
      {user && !loading ? (
        <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="left"
          panes={panes}
        />
      ) : (
        <Spinner />
      )}
    </Container>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  auth: state.auth,
});

export default connect(mapState)(Dashboard);
