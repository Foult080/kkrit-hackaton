import React from "react";
import {
  Container,
  Grid,
  Header,
  List,
  Icon,
  Segment,
} from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment inverted vertical style={{ padding: "5em 0em" }}>
      <Container>
        <Grid divided inverted stackable centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Header inverted as="h4" content="О проекте" />
              <List link inverted>
                <List.Item as="a">О проекте</List.Item>
                <List.Item as="a">Обратная связь</List.Item>
                <List.Item as="a">Политика конфиденциальности</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <h4 as="h4" inverted>
                <Icon name="globe" />
                ККРИТ-Хакатон
                <Icon name="registered" />
              </h4>
              <List link inverted>
                <List.Item as="a">Creaated by @foult080</List.Item>
                <List.Item as="a">
                  <Icon name="github" />
                  Like on Github
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};

export default Footer;
