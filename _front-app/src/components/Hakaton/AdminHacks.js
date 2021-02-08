import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Layout/spinner";
import { getHackatons, addHackaton } from "../../actions/hack";
import HackItem from "./HackItem";
import { Button } from "react-bootstrap";
import AddHack from "./AddHack";

const Admin = ({ getHackatons, addHackaton, hack: { hackatons, loading } }) => {
  useEffect(() => {
    getHackatons();
  }, [getHackatons]);

  const [modalShow, setModalShow] = useState(false);

  return loading || hackatons == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <AddHack
        show={modalShow}
        onHide={() => setModalShow(false)}
        addHackaton={addHackaton}
      />
      <div className="container">
        <div className="add hack text-center my-4">
          <Button
            size="lg"
            varinat="primary"
            onClick={() => setModalShow(true)}
          >
            {" "}
            Добавить Хакатон
          </Button>
        </div>
        <div className="list-hacks">
          <h4 className="title">Список хакатонов:</h4>
          <hr />
          <div className="hackatons">
            {hackatons.map((el) => (
              <HackItem key={el._id} hack={el} />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Admin.propTypes = {
  getHackatons: PropTypes.func.isRequired,
  hack: PropTypes.object.isRequired,
  addHackaton: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  hack: state.hack,
});

export default connect(mapStateToProps, { getHackatons, addHackaton })(Admin);
