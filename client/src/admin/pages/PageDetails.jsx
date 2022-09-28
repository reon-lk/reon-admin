import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/Footer";
import AdminMain from "../components/AdminMain";
import PageBlockModel from "../components/models/pageBlockModel";
import PageUnblockModel from "../components/models/pageUnblockModel";

const PageDetails = () => {
  const [Loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const { pId } = useParams();
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/page/" + pId)
      .then((res) => {
        setPages(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, [pId]);

  const [vehicleCount, setVehicleCount] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/vehicleCount/" + pId)
      .then((res) => {
        setVehicleCount(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, [pId]);

  const navigate = useNavigate();

  return (
    <>
      <AdminMain />

      <main id="main1" className="main1">
        <div className="pagetitle">
          <h1 className="theme-text2">Page Details</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="Pages">Pages</Link>
              </li>
              <li className="breadcrumb-item active">Page Details</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section user-details">
          <div className="row">
            <div className="card">
              <div className="card-body">
                {/* <!-- Page Details --> */}
                <table className="table mt-3">
                  <tbody>
                    {!Loading && (
                      
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
                      
                    )}
                    {Loading && pages.length === 0 && (
                      <tbody>
                        <tr>
                          <th colSpan="12">No Data </th>
                        </tr>
                      </tbody>
                    )}
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Page ID
                      </th>
                      <th className="col-sm-8">{pId}</th>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Status
                      </th>
                      <td>
                        {pages.status === "1" ? (
                          <span className="badge bg-success">Active</span>
                        ) : pages.status === "2" ? (
                          <span className="badge bg-danger">Blocked</span>
                        ) : pages.status === "3" ? (
                          <span className="badge bg-warning">Update</span>
                        ) : pages.status === "4" ? (
                          <span className="badge bg-danger">Deleted</span>
                        ) : (
                          <span className="badge bg-warning">Pending</span>
                        )}
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Page Name
                      </th>
                      <td>{pages.pageName}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Page Logo
                      </th>
                      <td>
                        <img
                          src={pages.profile ? pages.profile.secure_url : ""}
                          alt="Profile"
                          className="rounded-circle  page-logo"
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Page Banner
                      </th>
                      <td>
                        <img
                          className=" img-fluid img-thumbnail page-banner rounded-4"
                          src={pages.banner ? pages.banner.secure_url : ""}
                          alt="Profile"
                        />
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Description
                      </th>
                      <td>{pages.pageDescription}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Address
                      </th>
                      <td>{pages.address}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Created Date
                      </th>
                      <td>{String(pages.createdAt).substring(0, 10)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        Last Update
                      </th>
                      <td>{String(pages.updatedAt).substring(0, 10)}</td>
                      <td></td>
                    </tr>
                    {/* <tr>
                          <th scope="row" className="col-sm-2">Last Update</th>
                          <td>#2434</td>
                          <td></td>
                        </tr> */}
                    <tr>
                      <th scope="row" className="col-sm-2">
                        User Id
                      </th>
                      <td>{pages.uId}</td>
                      <td className="col-sm-8">
                        <Link to={`/admin/userDetails/${pages.uId}`}>
                          <button
                            type="button"
                            className="btn btn-primary theme-bg-blue"
                          >
                            User Details{" "}
                            <i className="ri-external-link-fill"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        No of Vehicles
                      </th>
                      <td>{vehicleCount.counts}</td>
                      <td className="col-sm-8">
                        <Link to={`/admin/userVehicles/${pages.pId}`}>
                          <button
                            type="button"
                            className="btn btn-warning theme-bg-orange"
                          >
                            Vehicle Details
                            <i className="ri-external-link-fill"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" className="col-sm-2">
                        No of Hires
                      </th>
                      <td>27</td>
                      <td className="col-sm-8">
                        <Link to="hire-details.html?pid=3043" target="_blank">
                          <button
                            type="button"
                            className="btn btn-primary theme-bg-blue"
                          >
                            Hire Details{" "}
                            <i className="ri-external-link-fill"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* <!-- End Page Details --> */}
              </div>

              <div className="card-footer">
                <Link to="/admin/pages">
                  <button
                    type="button"
                    className="mx-2 btn btn-secondary"
                    onClick={() => navigate(-1)}
                  >
                    <i className="bi bi-chevron-double-left"></i> Back
                  </button>
                </Link>
                {/* <button
                  type="button"
                  className="mx-2 btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editPage3043"
                >
                  Edit <i className="bi bi-pencil-square"></i>
                </button> */}
                {pages.status === "1" ? (
                  <PageBlockModel editdata={pages} />
                ) : pages.status === "2" ? (
                  <PageUnblockModel editdata={pages} />
                ) : (
                  ""
                )}

                {/* <button
                  type="button"
                  className="mx-2 btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#deletePage3043"
                >
                  Delete <i className="bi bi-trash"></i>
                </button> */}
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- End #main --> */}

      {/* <!-- Edit Page Popup --> */}
      {/* <div
        className="modal fade"
        id="editPage3043"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Edit Page #3043</h5>
              <button
                type="button"
                className="btn bg-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg theme-text-blue"></i>
              </button>
            </div>
            <div className="modal-body"> */}
      {/* <!-- Edit Page Form --> */}
      {/* <form className="row g-3 needs-validation" novalidate>
                <div className="col-md-12">
                  <label for="edit-page-name-3043" className="form-label">
                    Page Name
                  </label>
                  <input
                    type="text"
                    value="Page Name 1"
                    className="form-control"
                    id="edit-page-name-3043"
                    required
                  />
                  <div className="valid-feedback">Looks good!</div>
                  <div className="invalid-feedback">
                    Please provide a Page Name.
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="edit-page-logo-3043" className="form-label">
                    Page Logo
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="edit-page-logo-3043"
                  />
                </div>
                <div className="col-md-6">
                  <label for="edit-page-banner-3043" className="form-label">
                    Page Banner
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="edit-page-banner-3043"
                  />
                </div>
                <div className="col-md-12">
                  <label for="edit-page-desc-3043" className="form-label">
                    Page Description
                  </label>
                  <textarea
                    rows="6"
                    className="form-control"
                    id="edit-page-desc-2434"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Laborum quia voluptatem facere similique, minima a officia
                    accusantium. Sed, tempora exercitationem dolor similique,
                    dicta possimus ex recusandae aspernatur ut, neque beatae?
                  </textarea>
                </div>
                <div className="col-md-12">
                  <label for="edit-page-conform-pwd-3043" className="form-label">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="edit-page-conform-pwd-3043"
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
              </form> */}
      {/* <!-- End Edit User Form --> */}
      {/* </div>
          </div>
        </div>
      </div> */}
      {/* <!-- End Edit User Popup--> */}

      {/* <!-- Block Page Popup --> */}
      {/* <div
        className="modal fade"
        id="blockPage3043"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Block Page #3043</h5>
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
                Are You Sure Block This Page
              </div> */}
      {/* <!-- Block Page Form --> */}
      {/* <form className="row mt-2 g-3 needs-validation" novalidate>
                <div className="col-md-12">
                  <label for="block-user-conform-2434" className="form-label">
                    Conform Message
                  </label>
                  <textarea
                    rows="5"
                    className="form-control"
                    id="block-user-conform-2434"
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    Please provide conform message.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="block-user-conform-pwd-2434" className="form-label">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="block-user-conform-pwd-2434"
                    required
                  />
                  <div className="invalid-feedback">Please input password.</div>
                </div>

                <div className="px-5">
                  <div className="mx-5 d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No <i className="bi bi-x-circle"></i>
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Yes <i className="bi bi-check-circle"></i>
                    </button>
                  </div>
                </div>
              </form>
              {/* <!-- End Block Page Form --> */}
      {/* </div>
          </div>
        </div> */}
      {/* </div>  */}
      {/* <!-- End Block Page Popup--> */}

      {/* <!-- Delete Page Popup --> */}
      {/* <div
        className="modal fade"
        id="deletePage3043"
        tabIndex="-1"
        data-bs-backdrop="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header theme-bg-orange text-white">
              <h5 className="modal-title fw-bold">Delete Page #3043</h5>
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
                Are You Sure Delete This Page
              </div> */}
      {/* <!-- Delete Page Form --> */}
      {/* <form className="row mt-2 g-3 needs-validation" novalidate>
                <div className="col-md-12">
                  <label for="delete-page-conform-3043" className="form-label">
                    Conform Message
                  </label>
                  <textarea
                    rows="5"
                    className="form-control"
                    id="delete-page-conform-3043"
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    Please provide conform message.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="delete-page-conform-pwd-3043" className="form-label">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="delete-page-conform-pwd-3043"
                    required
                  />
                  <div className="invalid-feedback">Please input password.</div>
                </div>

                <div className="px-5">
                  <div className="mx-5 d-flex align-items-center justify-content-between">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      No <i className="bi bi-x-circle"></i>
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Yes <i className="bi bi-check-circle"></i>
                    </button>
                  </div>
                </div>
              </form> */}
      {/* <!-- End Delete Page Form --> */}
      {/* </div>
          </div>
        </div>
      </div> */}
      {/* <!-- End Delete Page Popup--> */}
      <Footer />
    </>
  );
};

export default PageDetails;
