import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Footer from "../components/Footer";
import AdminMain from "../components/AdminMain";

const Profile = () => {
  const [Loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const { uId } = useParams();
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/profile")
      .then((res) => {
        setUser(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, [uId]);

  const navigate = useNavigate();

  return (
    <>
      <AdminMain />

      <main id="main1" className="main1">
        <div className="pagetitle">
          {user.firstName}
          <h1 className="theme-text2">Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    src={user.profile ? user.profile.secure_url : ""}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h2>{user.firstName}</h2>
                </div>
              </div>
            </div>

            <div className="col-xl-6">
              <div className="card">
                <div className="card-body pt-3">
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview">
                      <h5 className="card-title">Profile Details</h5>
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
                      {Loading && user.length === 0 && (
                        <tbody>
                          <tr>
                            <th colSpan="12">No Data </th>
                          </tr>
                        </tbody>
                      )}
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {user.firstName} {user.lastName}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">UserID</div>
                        <div className="col-lg-9 col-md-8">{user.uId}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">{user.email}</div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Role</div>
                        <div className="col-lg-9 col-md-8">
                          {user.role === "1" ? (
                            <span>Admin</span>
                          ) : (
                            <span>User</span>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Status</div>
                        <div className="col-lg-9 col-md-8">
                          {user.status === "1" ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Blocked</span>
                          )}
                        </div>
                      </div>

                      {/* <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Page Available
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {user.isPage === "1" ? (
                            <span className="badge bg-success">Yes</span>
                          ) : (
                            <span className="badge theme-bg-orange">No</span>
                          )}
                        </div>
                      </div> */}

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Created Date
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {String(user.createdAt).substring(0, 10)}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Updated Date
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {String(user.updatedAt).substring(0, 10)}
                        </div>
                      </div>

                      <div className="card-footer">
                        <Link to="/admin/vehicle">
                          <button
                            type="button"
                            className="mx-2 btn btn-secondary"
                            onClick={() => navigate(-1)}
                          >
                            <i className="bi bi-chevron-double-left"></i> Back
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* <!-- End #main --> */}
      <Footer />
    </>
  );
};

export default Profile;
