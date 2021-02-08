import React, { Fragment } from "react";
import { Accordion, Card, Button } from "react-bootstrap";
const FAQ = () => {
  return (
    <Fragment>
      <div className="container">
        <h4 className="title">Часто задаваемые вопросы</h4>
        <hr />
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Как изменить аватарку в личном кабинете?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-justify">
                Этот сайт использует API Gravatar для хранения аватара
                пользователя. Чтобы поставит свой, вам необходимо перейти на веб
                сайт:{" "}
                <a href="https://ru.gravatar.com/" target="_blanc">
                  Gravatar
                </a>{" "}
                и зарегистрироватсья там при помощи почты, которую вы указали
                при регистрации на данном ресурсе. После этого ваш аватар
                появится здесь в течении нескольких минут.
                <br />
                <br /> В случае проблем можете написать через форму обратной
                связи, где вам помогут в решении данного вопроса.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Могу ли я просмотреть профили других участников ресурса?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body className="text-justify">
                В данный момент нет.
                <br /> Политика ресурса, в данный момент, не предпологает данный
                функционал.
                <br />
                <br />
                Однако как будет ввдедена система рейтинга данное ограничение
                скорее всего будет убрано.
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="2">
                Когда будут доступны новые площадки?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body className="text-justify">
                Сложно ответить на данный вопрос. <br />
                <br /> Однако, с увереностью можно сказать, что это состоится в
                отсносительно недалёкий промежуток времени.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="3">
                Как я могу принять участие в разработке?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body className="text-justify">
                Внизу страницы вы можете увидеть сслыку на GitHub проекта.
                Перейдя по ней вы найдёте контакты, а также проект который вы
                можете развернуть у себя. Совсем скоро там появится документация
                по работе над данным проектом.
                <br />
                <br />
                Либо вы можете написать в форме обратной связи и вам вышлют
                материалы на электронную почту.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="4">
                Как добавить участника в команду?
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="4">
              <Card.Body className="text-justify">
                Для того, чтобы добавить участника в команду вам нужно кликнуть
                по зеленой кнопке в на странице команды. После чего указать
                email адрес участника.
                <br /> *ВАЖНО! Участник должен быть зарегистрирован на
                площадке.*
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    </Fragment>
  );
};

export default FAQ;
