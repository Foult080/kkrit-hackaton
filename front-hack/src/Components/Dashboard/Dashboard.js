import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Tab, Menu, Image, Header } from "semantic-ui-react";
import Team from "./Team";
import Hack from "./Hack";

const Dashboard = ({ user }) => {

  const panes = [
    {
      menuItem: (
        <Menu.Item key="avatar" active={false}>
          <Image
            src={user.avatar}
            size="medium"
            circular
          />
          <Header textAlign="center" as="h3" content={user.name} />
        </Menu.Item>
      ),
      render: () => <Team />,
    },
    {
      menuItem: { key: "team", icon: "users", content: "Моя команда" },
      render: () => <Team />,
    },
    {
      menuItem: { key: "hack", icon: "winner", content: "Текущий конкурс" },
      render: () => <Team />,
    },
    {
      menuItem: { key: "archive", icon: "archive", content: "Архив конкурсов" },
      render: () => <Hack />,
    },
    {
      menuItem: { key: "faq", icon: "question circle", content: "F.A.Q." },
      render: () => <Hack />,
    },
  ];

  return (
    <Container style={{ height: "100vh", marginTop: "80px" }}>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition="left"
        panes={panes}
      />
    </Container>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapState = (state) => ({
  user: state.auth.user,
});

export default connect(mapState, null)(Dashboard);
