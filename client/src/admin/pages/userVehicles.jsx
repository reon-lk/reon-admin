import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import AdminMain from "../components/AdminMain";

const VehiclesCar = () => {
  // const [searchParams] = useSearchParams();

  const [Loading, setLoading] = useState(false);
  const [userVehicles, setUserVehicles] = useState([]);
  const { pId } = useParams();
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/page/vehicle/" + pId)
      .then((res) => {
        setUserVehicles(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, [pId]);

  return (
    <>
      <AdminMain />

      <main id="main1" className="main1">
        <div className="pagetitle">
          <h1 className="theme-text2">Tour Vehicles</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/VehiclesCar">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">Vehicles-Car</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section manage-users">
          <div className="row">
            <div className="card pt-3 manage-pages overflow-auto">
              <div className="card-body">
                <table className="table table-striped table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">VehiceID</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Vehicle No</th>
                      <th scope="col">PageID</th>
                      <th scope="col">Category</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">Status</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {!Loading && (
                      <tbody>
                        <tr>
                          <th colSpan="12">
                            <div className="d-flex align-item-center justify-content-center">
                              <Button variant="warning" disabled>
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Loading...
                              </Button>
                            </div>
                          </th>
                        </tr>
                      </tbody>
                    )}
                    {Loading && userVehicles.length === 0 && (
                      <tbody>
                        <tr>
                          <th colSpan="12">No Data </th>
                        </tr>
                      </tbody>
                    )}
                    {userVehicles &&
                      userVehicles.length > 0 &&
                      userVehicles.map((item, index) => (
                        <tr>
                          <td key={index}>{index + 1}</td>
                          <td>{item.vId}</td>
                          <td>{item.vehicleName}</td>
                          <td>{item.vehicleNo}</td>
                          <td>{item.pId}</td>
                          <td>
                            {item.category === "tour" ? (
                              <span>Tour</span>
                            ) : item.category === "farming" ? (
                              <span>Farming</span>
                            ) : item.category === "construction" ? (
                              <span>Construction</span>
                            ) : item.category === "transportaion" ? (
                              <span>Construction</span>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{String(item.createdAt).substring(0, 10)}</td>
                          <td>
                            {item.status === "1" ? (
                              <span className="badge bg-success">Active</span>
                            ) : item.status === "2" ? (
                              <span className="badge bg-danger">Wait</span>
                            ) : item.status === "3" ? (
                              <span className="badge bg-warning">Update</span>
                            ) : item.status === "4" ? (
                              <span className="badge bg-danger">Deleted</span>
                            ) : (
                              <span className="badge bg-warning">Pending</span>
                            )}
                          </td>
                          <td className="d-flex justify-content-evenly">
                            <Link to={`/admin/vehicleDetails/${item.vId}`}>
                              <button type="button" className="btn btn-success">
                                Details <i className="bi bi-front"></i>
                              </button>
                            </Link>
                            {/* <button
                              type="button"
                              className="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#maEditVehicle0123"
                            >
                              Edit <i className="bi bi-pencil-square"></i>
                            </button> */}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- End #main --> */}

      <Link
        to="/"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </Link>

      {/* <!-- Edit Vehicle Popup --> */}
      <div
        className="modal fade"
        id="maEditVehicle0123"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Edit Vehicle #0123</h5>
              <button
                type="button"
                className="btn bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg theme-text-blue"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-md-8">
                <table className="table table-striped table-borderless">
                  <tr>
                    <th>Vehicle No</th>
                    <th>NP Car 0127</th>
                  </tr>
                </table>
              </div>
              {/* <!-- Edit Vehicle Form --> */}
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-12">
                  <label for="maEdit-vehicle-name-0123" className="form-label">
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    value="Maruti Suzuki Alto 800"
                    className="form-control"
                    id="maEdit-vehicle-name-0123"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide Vehicle Name.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="maEdit-vehicle-desc-0123" className="form-label">
                    Vehicle Description
                  </label>
                  <textarea
                    rows="8"
                    className="form-control"
                    id="maEdit-vehicle-desc-0123"
                    required
                  >
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Dolorum deserunt veniam vel ipsum. Dicta, ut nisi amet
                    deleniti quo at sed iure labore excepturi odit natus sint
                    tempore, animi id.
                  </textarea>
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide Vehicle Description.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="maEdit-vehicle-fuel-0123" className="form-label">
                    Fuel Type
                  </label>
                  <select
                    aria-label="Default select example"
                    className="form-control"
                    id="maEdit-vehicle-fuel-0123"
                    required
                  >
                    <option disabled selected value>
                      Select Fuel Type
                    </option>
                    <option value="Petrol">Petrol</option>
                    <option value="Super Petrol">Super Petrol</option>
                  </select>
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please select fuel type.
                  </div>
                </div>
                <div className="col-md-12 my-4">
                  <div className="form-check">
                    <input
                      className="form-check-input custom-color-input"
                      type="radio"
                      name="acType"
                      id="acType1"
                      value="option1"
                    />
                    <label className="form-check-label" for="acType1">
                      AC
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input custom-color-input"
                      type="radio"
                      name="acType"
                      id="acType2"
                      value="option2"
                      checked
                    />
                    <label className="form-check-label" for="acType2">
                      Non AC
                    </label>
                  </div>
                </div>
                <div className="col-md-12">
                  <label
                    for="maEdit-vehicle-conform-pwd-0123"
                    className="form-label"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="maEdit-vehicle-conform-pwd-0123"
                    required
                  />
                  <div className="invalid-feedback">Please input password.</div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
              {/* <!-- End Edit Vehicle Form --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Edit Vehicle Popup--> */}
    </>
  );
};

export default VehiclesCar;
