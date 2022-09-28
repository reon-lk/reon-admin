import React from "react";
import { Link,createSearchParams, useNavigate } from 'react-router-dom'

const AdminAside = () => {
  const navigate = useNavigate();
  const car = { vehicleType: 'car' };

  const cars = () => {
    

    navigate({
      pathname: '/admin/hires-bus',
      search: `?${createSearchParams(car)}`,
    });
  }

  return (
    <>
      {/* <!-- ======= Sidebar ======= --> */}
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link to="/admin" className="nav-link collapsed">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </Link>
            {/* <a className="nav-link sk" href="/Admin">
              <i className="bi bi-grid"></i>
              <span>Dashboard</span>
            </a> */}
          </li>
          {/* <!-- End Dashboard Nav --> */}

          <li className="nav-item">
          <Link to="/admin/users" className="nav-link collapsed">
              <i className="bi bi-people"></i>
              <span>Users</span>
            </Link>
            {/* <a className="nav-link collapsed" href="Users">
              <i className="bi bi-people"></i>
              <span>Users</span>
            </a> */}
          </li>
          {/* <!-- End Users Nav --> */}

          <li className="nav-item">
          <Link to="/admin/pages" className="nav-link collapsed">
              <i className="bi bi-files"></i>
              <span>Pages</span>
            </Link>
            {/* <a className="nav-link collapsed" href="Pages">
              <i className="bi bi-files"></i>
              <span>Pages</span>
            </a> */}
          </li>
          {/*<!-- End Pages Nav --> */}

          {/* <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#vehicles-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i className="bi bi-car-front"></i>
              <span>Vehicles</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="vehicles-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
              <Link to="/admin/vehicles/car" className="nav-link collapsed">
               
                  <i className="bi bi-circle"></i>
                  <span>Car</span>
                </Link>
              </li>
              <li>
                <a href="VehiclesBus">
                  <i className="bi bi-circle"></i>
                  <span>Bus</span>
                </a>
              </li>
            </ul>
          </li> */}
          <li className="nav-item">
          <Link to="/admin/vehicles" className="nav-link collapsed">
              <i className="bi bi-car-front"></i>
              <span>Vehicles</span>
            </Link>
            {/* <a className="nav-link collapsed" href="Pages">
              <i className="bi bi-files"></i>
              <span>Pages</span>
            </a> */}
          </li>
          {/* <!-- End Vehicles Nav --> */}

          <li className="nav-item">
          <Link to="/admin/hires" className="nav-link collapsed">
              <i className="bi bi-geo"></i>
              <span>Hires</span>
            </Link>
              {/* <a
              className="nav-link collapsed"
              data-bs-target="#hires-nav"
              data-bs-toggle="collapse"
              href="/"
            >
              <i className="bi bi-geo"></i>
              <span>Hires</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="hires-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <a href="HiresCar">
                  <i className="bi bi-circle"></i>
                  <span>Car</span>
                </a>
              </li> */}
              {/* <li className="nav-item">
             
              <a  onClick={cars}>
                  <i className="bi bi-circle"></i>
                  <span>Car</span>
                </a>
                
              </li >
            </ul> */}
          </li>
          {/* <!-- End Hires Nav --> */}

          <li className="nav-heading">Settings</li>

          <li className="nav-item">
            <a className="nav-link collapsed" href="Profile">
              <i className="bi bi-person"></i>
              <span>Profile</span>
            </a>
          </li>
          {/* <!-- End Profile Page Nav --> */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="PageSetting">
              <i className="bi bi-gear"></i>
              <span>Page Settings</span>
            </a>
          </li>
          {/* <!-- End Settings Page Nav --> */}
        </ul>
      </aside>
      {/* <!-- End Sidebar--> */}
    </>
  );
};

export default AdminAside;
