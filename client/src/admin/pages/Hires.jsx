import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import AdminMain from "../components/AdminMain";

const HireCar = () => {
  const [Loading, setLoading] = useState(false);
  const [hires, setHires] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/hires")
      .then((res) => {
        setHires(res.data);
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
          <h1 className="theme-text2">Hires</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item">Hires</li>
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
                      <th scope="col">Hire Id</th>
                      <th scope="col">From</th>
                      <th scope="col">To</th>
                      <th scope="col">Hire Date</th>
                      <th scope="col">Booked Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Vehicle Id</th>
                      <th scope="col">Page Id</th>
                      <th scope="col">Status</th>
                      {/* <th scope="col">Action</th> */}
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
                    {Loading && hires.length === 0 && (
                      <tbody>
                        <tr>
                          <th colSpan="12">No Data </th>
                        </tr>
                      </tbody>
                    )}
                    {hires &&
                      hires.length > 0 &&
                      hires.map((item, index) => (
                        <tr>
                          <td key={index}>{index + 1}</td>
                          <td>{item.hId}</td>
                          <td>{item.pickupLocation}</td>
                          <td>{item.dropoffLocation}</td>
                          <td>{item.pickupDropoffTime?.from}</td>
                          <td>{item.pickupDropoffTime?.to}</td>
                          <td>{item.vId}</td>
                          <td>{item.acceptAmount}</td>
                          <td>{item.pId}</td>
                          <td>
                            {item.isConfirm === "1" &&
                            item.isAccept === "1" &&
                            item.isFinished === "1" ? (
                              <span className="badge bg-secondary">
                                Finished
                              </span>
                            ) : item.isConfirm === "1" &&
                              item.isAccept === "1" ? (
                              <span className="badge bg-sucess">Paid</span>
                            ) : item.isAccept === "1" ? (
                              <span className="badge bg-primary">Accepted</span>
                            ) : item.isAccept === "0" ? (
                              <span className="badge bg-warning">Pending</span>
                            ) : (
                              ""
                            )}
                          </td>
                          {/* <td className="d-flex align-items-center justify-content-between">
                            <Link to="/admin/hires">
                              <button
                                type="button"
                                className="btn btn-primary theme-bg-blue"
                              >
                                Details <i className="bi bi-receipt-cutoff"></i>
                              </button>
                            </Link>
                          </td> */}
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

      {/* <!-- End Delete Page Popup--> */}
    </>
  );
};

export default HireCar;
