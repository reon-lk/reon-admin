import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApproveVehiclesModel = ({ editdata }) => {
  const successmsg = () =>
    toast("vehicle approved!", {
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

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const reload = () => window.location.reload();

  const Approve = (e) => {
    axios
      .patch(
        "http://localhost:5000/api/admin/dashboard/pendingVehicle/approve/" +
          editdata.vId
      )

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
        <i className="bi bi-check-circle "></i> Approve
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
            <h5 className="modal-title fw-bold">Approve Vehicle</h5>
          </Modal.Title>
        </Modal.Header>

        <div className="modal-body">
          <p>
            Vehicle ID: <span>{editdata.vId}</span>
          </p>
          <p>
            Vehicle Name: <span>{editdata.vehicleName}</span>
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
          <button type="button" className="btn btn-success" onClick={Approve}>
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

export default ApproveVehiclesModel;
