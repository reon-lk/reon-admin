import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminMain from "../components/AdminMain";
import Footer from "../components/Footer";
import ApprovePagesModel from "../components/models/approvePagesModel";
import ApproveVehiclesModel from "../components/models/approveVehiclesModel";

import Img1 from "../../assets/img/vehicle-01.png"
import Img2 from "../../assets/img/news-3.jpg"

// import ApexCharts from 'apexcharts'

const Dashboard = () => {
  const [Loading, setLoading] = useState(false);
  const [userCounts, setUserCount] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/userCount")
      .then((res) => {
        setUserCount(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  const [ownerCounts, setOwnerCount] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/ownerCount")
      .then((res) => {
        setOwnerCount(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  const [vehicleCounts, setVehicleCount] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/vehicleCount")
      .then((res) => {
        setVehicleCount(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  const [hireCounts, setHireCount] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/hireCount")
      .then((res) => {
        setHireCount(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  const [pendingPages, setPendingPages] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/pendingPage")
      .then((res) => {
        setPendingPages(res.data);
        console.log("working", res.data);
        setLoading(true);
      })
      .catch((error) => {
        setLoading(true);
        console.log("eroror", error.message);
      });
  }, []);

  const [pendingVehicles, setPendingVehicles] = useState([]);
  useEffect(() => {
    // setLoading(true);
    console.log("==========;========");

    axios
      .get("http://localhost:5000/api/admin/dashboard/pendingVehicle")
      .then((res) => {
        setPendingVehicles(res.data);
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
          <h1 className="theme-text2">Dashboard</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">
                  <i className="bi bi-house-door"></i>
                </Link>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
          </nav>
        </div>
        {/* <!-- End Page Title --> */}

        <section className="section dashboard">
          <div className="row">
            {/* <!-- Users Card --> */}
            <div className="col-xxl-3 col-xl-12">
              <div className="card info-card users-card">
                {/* <!-- <div className="filter">
              <a className="icon" href="/" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter</h6>
                </li>

                <li><a className="dropdown-item" href="/">Today</Link></li>
                <li><a className="dropdown-item" href="/">This Month</Link></li>
                <li><a className="dropdown-item" href="/">This Year</Link></li>
              </ul>
            </div> --> */}

                <div className="card-body">
                  <h5 className="card-title">Users</h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-people"></i>
                    </div>
                    {userCounts && (
                      <div className="ps-3">
                        <h6>{userCounts.userCount} Users</h6>
                        {/* <span className="text-danger small pt-1 fw-bold">
                        <i className="bi bi-caret-down-fill"></i>12%
                      </span>
                      <span className="text-muted small pt-2 ps-1 info-card-text">
                        Last 48 Hours
                      </span> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Users Card --> */}

            {/* <!-- Owners Card --> */}
            <div className="col-xxl-3 col-xl-12">
              <div className="card info-card owners-card">
                <div className="card-body">
                  <h5 className="card-title">Owners</h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-person"></i>
                    </div>
                    {ownerCounts && (
                      <div className="ps-3">
                        <h6>{ownerCounts.ownersCount} Owners</h6>
                        {/* <span className="text-success small pt-1 fw-bold">
                        <i className="bi bi-caret-up-fill"></i>2%
                      </span>
                      <span className="text-muted small pt-2 ps-1 info-card-text">
                        Last 48 Hours
                      </span> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Owners Card --> */}

            {/* <!-- Vehicles Card --> */}
            <div className="col-xxl-3 col-xl-12">
              <div className="card info-card vehicles-card">
                <div className="card-body">
                  <h5 className="card-title">Vehicles</h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-car-front"></i>
                    </div>
                    {vehicleCounts && (
                      <div className="ps-3">
                        <h6>{vehicleCounts.vehiclesCount} Vehicles</h6>
                        {/* <span className="text-danger small pt-1 fw-bold">
                        <i className="bi bi-caret-down-fill"></i>1%
                      </span>
                      <span className="text-muted small pt-2 ps-1 info-card-text">
                        Last 48 Hours
                      </span> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Vehicles Card --> */}

            {/* <!-- Hires Card --> */}
            <div className="col-xxl-3 col-md-6">
              <div className="card info-card hires-card">
                <div className="card-body">
                  <h5 className="card-title">Hires</h5>

                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      <i className="bi bi-geo"></i>
                    </div>
                    {hireCounts && (
                      <div className="ps-3">
                        <h6 className="mb-2">{hireCounts.hiresCount} Hires</h6>
                        {/* <span className="text-success small pt-1 fw-bold">
                        <i className="bi bi-caret-up-fill"></i>12%
                      </span>
                      <span className="text-muted small pt-2 ps-1 info-card-text">
                        Last 48 Hours
                      </span> */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- End Hires Card --> */}

            {/* <!-- Left side columns --> */}
            <div className="col-lg-8">
              <div className="row">
                {/* <!-- Recent Page Requests --> */}
                <div className="col-12">
                  <div className="card recent-requests overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">Recent Page Requests</h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">UID</th>
                            <th scope="col">PID</th>
                            <th scope="col">Page</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingPages &&
                            pendingPages.length > 0 &&
                            pendingPages.map((item, index) => (
                              <tr>
                                <td key={index}>{index + 1}</td>
                                <th scope="row">{item.uId}
                                </th>

                                <th scope="row">{item.pId}</th>
                                <td>{item.pageName}</td>

                                <td className="d-flex justify-content-evenly">
                                  <Link to={`/admin/pageDetails/${item.pId}`}>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                    >
                                      Details <i className="bi bi-front"></i>
                                    </button>
                                  </Link>

                                  <ApprovePagesModel editdata={item} />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- End Recent Page Requests --> */}

                {/* <!-- Recent Vehicle Requests --> */}
                <div className="col-12">
                  <div className="card recent-requests overflow-auto">
                    <div className="card-body">
                      <h5 className="card-title">Recent Vehicle Requests</h5>

                      <table className="table table-borderless datatable">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">PID</th>
                            <th scope="col">VID</th>
                            <th scope="col">Vehicle Type</th>
                            <th scope="col">Vehicle</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingVehicles &&
                            pendingVehicles.length > 0 &&
                            pendingVehicles.map((item, index) => (
                              <tr>
                                <td key={index}>{index + 1}</td>
                                <th scope="row">{item.pId}</th>

                                <th scope="row">{item.vId}</th>
                                <td>{item.vehicleType}</td>
                                <td>{item.vehicleName}</td>

                                <td className="d-flex justify-content-evenly">
                                  <Link to={`pageDetails`}>
                                    <button
                                      type="button"
                                      className="btn btn-success"
                                    >
                                      Details <i className="bi bi-front"></i>
                                    </button>
                                  </Link>

                                  <ApproveVehiclesModel editdata={item} />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- End Recent Vehicle Requests --> */}

                {/* <!-- Reports --> */}
                {/* <div className="col-12">
                  <div className="card">
                    <div className="filter">
                      <Link className="icon" to="/" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots"></i>
                      </Link>
                      <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                          <h6>Filter</h6>
                        </li>

                        <li>
                          <Link className="dropdown-item" to="/">
                            Today
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            This Month
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            This Year
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <h5 className="card-title">
                        Reports <span>/ Last 12 Houres</span>
                      </h5> */}

                      {/* <!-- Line Chart --> */}
                      {/* <div id="reportsChart"></div> */}

                      {/* <script>
                document.addEventListener("DOMContentLoaded", () = {
                  new ApexCharts(document.querySelector("#reportsChart"), {
                    series: [{
                      name: 'Hires',
                      data: [31, 40, 2, 51, 42, 82, 56, 28, 51, 42, 82, 56, 0],
                    }, {
                      name: 'Revenue (in $)',
                      data: [11, 32, 45, 32, 34, 52, 41, 32, 45, 32, 34, 52, 0]
                    }],
                    chart: {
                      height: 350,
                      type: 'area',
                      toolbar: {
                        show: false
                      },
                    },
                    markers: {
                      size: 4
                    },
                    colors: ['#099bdf', '#ffbc03fd'],
                    fill: {
                      type: "gradient",
                      gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.3,
                        opacityTo: 0.4,
                        stops: [0, 90, 100]
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    stroke: {
                      curve: 'smooth',
                      width: 2
                    },
                    xaxis: {
                      type: 'datetime',
                      categories: ["2022-07-19T00:30:00.000Z", "2022-07-19T01:30:00.000Z", "2022-07-19T02:30:00.000Z", "2022-07-19T03:30:00.000Z", "2022-07-19T04:30:00.000Z", "2022-07-19T05:30:00.000Z", "2022-07-19T06:30:00.000Z", "2022-07-19T07:30:00.000Z", "2022-07-19T08:30:00.000Z", "2022-07-19T09:30:00.000Z", "2022-07-19T10:30:00.000Z", "2022-07-19T11:30:00.000Z", "2022-07-19T12:30:00.000Z"]
                    },
                    tooltip: {
                      x: {
                        format: 'dd/MM/yyyy HH:mm'
                      },
                    }
                  }).render()
                });
              </script> */}
                      {/* <!-- End Line Chart --> */}
                    {/* </div>
                  </div>
                </div> */}
                {/* <!-- End Reports --> */}
              </div>
            </div>
            {/* <!-- End Left side columns --> */}

            {/* <!-- Right side columns --> */}
            <div className="col-lg-4">
              {/* <!-- Recent Hire --> */}
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">
                    Recent Hires <span>| Last 7 Hires</span>
                  </h5>

                  <div className="activity">
                    <div className="activity-item d-flex">
                      <div className="activite-label">46 min</div>
                      <i className="bi bi-circle-fill activity-badge align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum{" "}
                        <Link to="/" className="fw-bold text-dark">
                          explicabo officiis
                        </Link>{" "}
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">1 hour</div>
                      <i className="bi bi-circle-fill activity-badge align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum{" "}
                        <Link to="/" className="fw-bold text-dark">
                          explicabo officiis
                        </Link>{" "}
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">13 hour</div>
                      <i className="bi bi-circle-fill activity-badge align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum{" "}
                        <Link to="/" className="fw-bold text-dark">
                          explicabo officiis
                        </Link>{" "}
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">1 day</div>
                      <i className="bi bi-circle-fill activity-badge align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum{" "}
                        <Link to="/" className="fw-bold text-dark">
                          explicabo officiis
                        </Link>{" "}
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}

                    <div className="activity-item d-flex">
                      <div className="activite-label">1 day</div>
                      <i className="bi bi-circle-fill activity-badge align-self-start"></i>
                      <div className="activity-content">
                        Quia quae rerum{" "}
                        <Link to="/" className="fw-bold text-dark">
                          explicabo officiis
                        </Link>{" "}
                        beatae
                      </div>
                    </div>
                    {/* <!-- End activity item--> */}
                  </div>
                </div>
              </div>
              {/* <!-- End Hire --> */}

              {/* <!-- Top Hiring --> */}
              <div className="card top-hiring overflow-auto">
                <div className="card-body pb-0">
                  <h5 className="card-title">Top Hiring</h5>

                  <table className="table table-borderless datatable">
                    <thead>
                      <tr>
                        <th scope="col">VID</th>
                        <th scope="col">Preview</th>
                        <th scope="col">Page</th>
                        <th scope="col">Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">124</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">41</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">98</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">74</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">74</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Link to="/" className="fw-bold vid">
                            #5
                          </Link>
                        </th>
                        <th scope="row">
                          <Link to="/">
                            <img src={Img1} alt="/" />
                          </Link>
                        </th>
                        <td>
                          <Link to="/" className="fw-bold page">
                            Page Name 1
                          </Link>
                        </td>
                        <td className="fw-bold">74</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <!-- End Top Hiring --> */}

              {/* <!-- Blog posts --> */}
              <div className="card pt-2 pb-4">
                <div className="card-body pb-0">
                  <h5 className="card-title">Blog Posts</h5>

                  <div className="blog-post">
                    <div className="post-item clearfix">
                      <img src={Img2} alt="/" />
                      <h4>
                        <Link to="/" target="_blank">
                          Id quia et et ut maxime similique occaecati ut
                        </Link>
                      </h4>
                      <p>
                        Fugiat voluptas vero eaque accusantium eos. Consequuntur
                        sed ipsam et totam...
                      </p>
                    </div>

                    <div className="post-item clearfix">
                      <img src={Img2} alt="/" />
                      <h4>
                        <Link to="/" target="_blank">
                          Laborum corporis quo dara net para
                        </Link>
                      </h4>
                      <p>
                        Qui enim quia optio. Eligendi aut asperiores enim
                        repellendusvel rerum cuder...
                      </p>
                    </div>

                    <div className="post-item clearfix">
                      <img src={Img2} alt="/" />
                      <h4>
                        <Link to="/" target="_blank">
                          Et dolores corrupti quae illo quod dolor
                        </Link>
                      </h4>
                      <p>
                        Odit ut eveniet modi reiciendis. Atque cupiditate libero
                        beatae dignissimos eius...
                      </p>
                    </div>
                  </div>
                  {/* <!-- End sidebar Blog posts--> */}
                </div>
              </div>
              {/* <!-- End News & Updates --> */}
            </div>
            {/* <!-- End Right side columns --> */}
          </div>
        </section>
      </main>
      {/* <!-- End #main --> */}
      <Footer />
    </>
  );
};

export default Dashboard;
