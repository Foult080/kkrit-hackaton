import React from "react";
import {
  Container,
  Grid,
  Header,
  List,
  Icon,
  Segment,
  Popup,
  Button,
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
                <List.Item as="a">
                  <Popup
                    content={
                      <>
                        Если вы нашли ошибку или вам есть что предложить, то
                        пожалуйста заполните форму на{" "}
                        <a
                          href="https://github.com/Foult080/kkrit-hackaton/issues"
                          target="_blank"
                        >
                          Github.
                        </a>
                      </>
                    }
                    on="click"
                    popper={{ id: "popper-container", style: { zIndex: 2000 } }}
                    trigger={<p>Обратная связь</p>}
                  />
                </List.Item>
                <List.Item as="a" href="/privacy">
                  Политика конфиденциальности
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <h4 as="h4">
                <Icon name="globe" />
                ККРИТ-Хакатон
                <Icon name="registered" />
              </h4>
              <List link inverted>
                <List.Item
                  as="a"
                  href="https://github.com/Foult080"
                  target="blanc"
                >
                  Creaated by @foult080
                </List.Item>
                <List.Item
                  as="a"
                  href="https://github.com/Foult080/kkrit-hackaton"
                >
                  <Icon name="github" />
                  Like project on Github
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
