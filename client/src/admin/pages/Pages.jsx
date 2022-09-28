import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/Footer";
import AdminMain from "../components/AdminMain";

const Pages = () => {
  const [Loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/page")
      .then((res) => {
        setPages(res.data);
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
          <h1 className="theme-text2">Pages</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">Pages</li>
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
                      <th scope="col">Page Id</th>
                      <th scope="col">Page Name</th>
                      <th scope="col">Created Date</th>
                      <th scope="col">User Id</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
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
                    {Loading && pages.length === 0 && (
                      <tbody>
                        <tr>
                          <th colSpan="12">No Data </th>
                        </tr>
                      </tbody>
                    )}
                    {pages.length > 0 &&
                      pages.map((item, index) => (
                        <tr>
                          <td key={index}>{index + 1}</td>
                          <td>{item.pId}</td>
                          <td>{item.pageName}</td>
                          <td>{String(item.createdAt).substring(0, 10)}</td>
                          <td>{item.uId}</td>
                          <td>{item.phone}</td>
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
                          <td className="d-flex align-items-center justify-content-between">
                            <Link to={`/admin/pageDetails/${item.pId}`}>
                              <button type="button" className="btn btn-success">
                                Details <i className="bi bi-front"></i>
                              </button>
                            </Link>
                            {/* <button
                              type="button"
                              className="btn btn-warning theme-bg-orange"
                              data-bs-toggle="modal"
                              data-bs-target="#maEditPage3043"
                            >
                              Edit <i className="bi bi-pencil-square"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-toggle="modal"
                              data-bs-target="#maDeletePage3043"
                            >
                              Delete <i className="bi bi-trash"></i>
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

      {/* <!-- Edit Page Popup --> */}
      <div
        className="modal fade"
        id="maEditPage3043"
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
            <div className="modal-body">
              {/* <!-- Edit Page Form --> */}
              <form className="row g-3 needs-validation" noValidate>
                <div className="col-md-6">
                  <label for="maEdit-user-firstName-2434" className="form-label">
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
                  <div className="invalid-feedback">Please provide First Name.</div>
                </div>
                <div className="col-md-12">
                  <label for="maEdit-page-conform-pwd-3043" className="form-label">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="maEdit-page-conform-pwd-3043"
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
              {/* <!-- End Edit Page Form --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Edit Page Popup--> */}

      {/* <!-- Delete Page Popup --> */}
      <div
        className="modal fade"
        id="maDeletePage3043"
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
              </div>
              {/* <!-- Delete Page Form --> */}
              <form className="row mt-2 g-3 needs-validation" noValidate>
                <div className="col-md-12">
                  <label for="maDelete-page-conform-043" className="form-label">
                    Conform Message
                  </label>
                  <textarea
                    rows="5"
                    className="form-control"
                    id="maDelete-page-conform-043"
                    required
                  ></textarea>
                  <div className="invalid-feedback">
                    Please provide conform message.
                  </div>
                </div>
                <div className="col-md-12">
                  <label for="maDelete-page-conform-pwd-043" className="form-label">
                    Your Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="maDelete-page-conform-pwd-043"
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
              {/* <!-- End Delete Page Form --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Delete Page Popup--> */}
      <Footer />
    </>
  );
};

export default Pages;
