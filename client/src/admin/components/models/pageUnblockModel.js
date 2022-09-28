import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PageUnblockModel = ({ editdata }) => {
  const successmsg = () =>
    toast("page Unblocked!", {
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

  const Unblock = (e) => {
    axios
      .patch("http://localhost:5000/api/admin/page/unblock/" + editdata.pId)

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
      <Button className="mx-2 btn btn-success" onClick={handleShow}>
        <i className="bi bi-info-circle"></i> Unblock
      </Button>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
        show={show}
        onHide={handleClose}
        onExiting={reload}
      >
        <Modal.Header className="bg-warning" closeButton>
          <Modal.Title>
            <h5 className="modal-title fw-bold">Unblock Page</h5>
          </Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <p>
            Page ID: <span>{editdata.pId}</span>
          </p>
          <p>
            Page Name: <span>{editdata.pageName}</span>
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
          <button type="button" className="btn btn-success" onClick={Unblock}>
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

export default PageUnblockModel;
