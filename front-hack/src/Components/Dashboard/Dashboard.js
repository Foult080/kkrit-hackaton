import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container, Tab, Menu, Image, Header } from "semantic-ui-react";
import Spinner from "../Layout/Spinner";
import Team from "./Team";
import Hack from "./Hack";

const Dashboard = ({ auth: { user, loading } }) => {
  let panes = [];
  if (user) {
    panes = [
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
        menuItem: { key: "team", icon: "users", content: "Моя команда" },
        render: () => <Team />,
      },
      {
        menuItem: { key: "hack", icon: "winner", content: "Текущий конкурс" },
        render: () => <Team />,
      },
      {
        menuItem: {
          key: "archive",
          icon: "archive",
          content: "Архив конкурсов",
        },
        render: () => <Hack />,
      },
      {
        menuItem: { key: "faq", icon: "question circle", content: "F.A.Q." },
        render: () => <Hack />,
      },
    ];
  }

  return (
    <Container style={{ height: "100vh", marginTop: "80px" }}>
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
