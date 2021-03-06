import React, { Fragment } from "react";
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Icon,
  Segment,
  GridColumn,
} from "semantic-ui-react";
import team from "./imgs/team.svg";
import signin from "./imgs/sign_in.svg";
import winner from "./imgs/winner.svg";
import { Link } from "react-router-dom";

const Landing = () => (
  <Fragment>
    <Segment
      inverted
      textAlign="center"
      color="green"
      style={{ minHeight: 500, padding: "1em 0em" }}
      vertical
    >
      <Container text>
        <Header
          as="h1"
          content="#KKRIT-Хакатон"
          inverted
          style={{
            fontSize: "4em",
            fontWeight: "bold",
            marginBottom: 0,
            marginTop: "2em",
          }}
        />
        <Header
          as="h3"
          content="Конкурс профессионального мастерства с возможностью начала крупного стартапа. Собери свою команду и получи доступ к кейсовым заданиям."
          inverted
          style={{
            fontSize: "1.3em",
            fontWeight: "normal",
          }}
        />
        <Button inverted size="huge">
          Подробнее
          <Icon name="right arrow" />
        </Button>
      </Container>
    </Segment>

    <Grid centered stackable verticalAlign="middle">
      <Grid.Row>
        <GridColumn width={5} style={{ marginTop: "1em" }}>
          <Image src={signin} size="large" />
        </GridColumn>
        <GridColumn width={4}>
          <Header as="h2" style={{ fontSize: "2.5em" }}>
            Зарегистрируйся
          </Header>
          <p style={{ fontSize: "1.5em" }}>
            Заполни простую форму регистрации и получи доступ к конкурсам
            профессионального мастерства.
          </p>
        </GridColumn>
      </Grid.Row>
      <Grid.Row>
        <GridColumn width={4}>
          <Header as="h2" style={{ fontSize: "2.5em" }}>
            Создай команду
          </Header>
          <p style={{ fontSize: "1.5em" }}>
            Собери свою команду из студентов и получи доступ к заданиям.
          </p>
        </GridColumn>
        <GridColumn width={4} style={{ marginTop: "1em" }}>
          <Image src={team} size="medium" />
        </GridColumn>
      </Grid.Row>
    </Grid>

    <Container
      textAlign="center"
      style={{ marginTop: "2em", marginBottom: "2em" }}
    >
      <Image src={winner} size="big" centered />
      <Header
        as="h1"
        content="УЧАВСТВУЙ И ПОБЕЖДАЙ"
        inverted
        style={{
          color: "black",
          fontSize: "4em",
          fontWeight: "bold",
        }}
      />
      <Link to="/signin">
      <Button animated="fade" color="green" size="huge">
        <Button.Content visible>
          <Icon name="user circle" />
          Зарегистрироваться
        </Button.Content>
        <Button.Content hidden>
          <Icon name="user plus" size="large" />
        </Button.Content>
      </Button>
      </Link>
    </Container>
  </Fragment>
);

export default Landing;
