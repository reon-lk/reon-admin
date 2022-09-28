import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserBlockModel = ({ editdata }) => {
  const successmsg = () =>
    toast("user Blocked!", {
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      Type: "success",
    });
  const errsmsg = () =>
    toast.error("something went wrong!", {
      autoClose: 1000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      Type: "error",
    });

  const [Loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const reload = () => window.location.reload();

  const Block = (e) => {
    axios
      .patch("http://localhost:5000/api/admin/user/block/" + editdata.uId)

      .then((result) => {
        handleClose();
        successmsg();
        setLoading(false);
      })
      .catch((error) => {
        errsmsg();
        setLoading(false);
      });
  };

  return (
    <>
      <Button className="mx-2 btn btn-warning" onClick={handleShow}>
        <i className="bi bi-info-circle"></i> Block
      </Button>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={show}
        onHide={handleClose}
        onExiting={reload}
      >
        <Modal.Header className="theme-bg-orange" closeButton>
          <Modal.Title>
            <h5 className="modal-title fw-bold">Block User</h5>
          </Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <p>
            User ID: <span>{editdata.uId}</span>
          </p>
          <p>
            User Name: <span>{editdata.firstName}</span>
          </p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-warning"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            No
          </button>
          <button type="button" className="btn btn-success" onClick={Block}>
            {Loading ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Yes"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default UserBlockModel;
