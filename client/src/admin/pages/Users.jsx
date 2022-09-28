import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/Footer";
import AdminMain from "../components/AdminMain";

const Users = () => {
  const [Loading, setLoading] = useState(false);
  const [users, setusers] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/user")
      .then((res) => {
        setusers(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  return (
    <>
      <AdminMain />

      <main id="main1" className="main1">
        <div className="pagetitle">
          <h1 className="theme-text2">Users</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">Users</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section manage-users">
          {/* <button
            className="mb-4 btn btn-primary shadow-sm text-white fw-bold theme-bg-blue"
            data-bs-toggle="modal"
            data-bs-target="#addNewUser"
          >
            Add New User <i className="bi bi-person-plus"></i>
          </button> */}

          <div className="row">
            <div className="card pt-3 manage-user overflow-auto">
              <div className="card-body">
                <table className="table table-striped table-borderless datatable">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">User Id</th>
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Email</th>

                      <th scope="col">Created Date</th>
                      <th scope="col">Is Page</th>

                      {/* <th scope="col">Hires</th> */}
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
                    {Loading && users.length === 0 && (
                      <tbody>
                        <tr>
                          <th colSpan="12">No Data </th>
                        </tr>
                      </tbody>
                    )}
                    {users.length > 0 &&
                      users.map((item, index) => (
                        <tr>
                          <td key={index}>{index + 1}</td>
                          <td>{item.uId}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.email}</td>
                          <td>{String(item.createdAt).substring(0, 10)}</td>
                          <td>
                            {item.isPage === "1" ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge theme-bg-orange">No</span>
                            )}
                          </td>
                          {/* <td>28</td> */}
                          <td>
                            {item.status === "1" ? (
                              <span className="badge bg-success">Active</span>
                            ) : (
                              <span className="badge bg-danger">Blocked</span>
                            )}
                          </td>
                          <td className="d-flex justify-content-evenly">
                            <Link to={`/admin/userDetails/${item.uId}`}>
                              <button type="button" className="btn btn-success">
                                Details <i className="bi bi-file-person"></i>
                              </button>
                            </Link>
                            {/* <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#maEditUser2434">Edit <i className="bi bi-pencil-square"></i></button> */}
                            {/* <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#maDeleteUser2434"
                            >
                              Block <i className="bi bi-slash-circle"></i>
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

      <Link
        to="/"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </Link>

      {/* <!-- Add New User Popup --> */}
      <div
        className="modal fade"
        id="addNewUser"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Add New User</h5>
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
              {/* <!-- Add New User Form --> */}
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-6">
                  <label for="add-user-firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-user-firstName"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide First Name.
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="add-user-lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-user-lastName"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide Last Name.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="add-user-email" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="add-user-email"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a Email (Gmail / Yahoomail).
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="add-user-pwd" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="add-user-pwd"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a password.
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="add-user-repwd" className="form-label">
                    Retype Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="add-user-repwd"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a password.
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-warning theme-bg-orange theme-bg-blue"
                  >
                    Save
                  </button>
                </div>
              </form>
              {/* <!-- End Add New User Form --> */}
            </div>
          </div>
        </div>
      </div>
      {/* /<!-- End Add New User Popup--> */}

      {/* <!-- Edit User Popup --> */}
      <div
        className="modal fade"
        id="maEditUser2434"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Edit User #2434</h5>
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
              {/* <!-- Edit User Form --> */}
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-6">
                  <label
                    for="maEdit-user-firstName-2434"
                    className="form-label"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    value="First Name 1"
                    className="form-control"
                    id="maEdit-user-firstName-2434"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide First Name.
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="maEdit-user-lastName-2434" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value="Last Name 1"
                    className="form-control"
                    id="maEdit-user-lastName-2434"
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide Last Name.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="maEdit-user-email-2434" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    value="user1@email.com"
                    className="form-control"
                    id="maEdit-user-email-2434"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a Email (Gmail / Yahoomail).
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="maEdit-user-profile-2434" className="form-label">
                    Profile
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="maEdit-user-profile-2434"
                  />
                </div>
                <div className="col-md-12">
                  <label
                    for="maEdit-user-conform-pwd-2434"
                    className="form-label"
                  >
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="maEdit-user-conform-pwd-2434"
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
                  <button
                    type="submit"
                    className="btn btn-warning theme-bg-orange"
                  >
                    Save
                  </button>
                </div>
              </form>
              {/* <!-- End Edit User Form --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Edit User Popup--> */}

      {/* <!-- Delete User Popup --> */}
      {users && (
        <div
          className="modal fade"
          id="maDeleteUser2434"
          tabIndex="-1"
          data-bs-backdrop="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header theme-bg-orange text-white">
                <h5 className="modal-title fw-bold text-center">
                  Block User {users.uId}{" "}
                </h5>
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
                <div className="fw-bold fs-5 text-center conform-dialog">
                  Are You Sure Block This User
                </div>
                {/* <!-- Delete User Form --> */}
                {/* <form className="row mt-2 g-3 needs-validation" noValidate> */}

                {/* <div className="col-md-12">
            <label for="maDelete-user-conform-2434" className="form-label">Conform Message</label>
            <textarea rows="5" className="form-control" id="maDelete-user-conform-2434" required></textarea>
            <div className="invalid-feedback">Please provide conform message.</div>
          </div>
          <div className="col-md-12">
            <label for="maDelete-user-conform-pwd-2434" className="form-label">Your Password</label>
            <input type="password" className="form-control" id="maDelete-user-conform-pwd-2434" required/>
            <div className="invalid-feedback">Please input password.</div>
          </div> */}

                <div className="px-5">
                  <div className="mx-5 d-flex align-items-center justify-content-between">
                    <button
                      type="submit"
                      className="btn btn-warning theme-bg-orange"
                    >
                      Yes <i className="bi bi-check-circle"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No <i className="bi bi-x-circle"></i>
                    </button>
                  </div>
                </div>

                {/* </form> */}
                {/* <!-- End Delete User Form --> */}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <!-- End Delete User Popup--> */}
      {/* <!-- End #main --> */}
      <Footer />
    </>
  );
};

export default Users;
