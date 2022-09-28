import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../user/components/Footer'
import AdminMain from '../components/AdminMain'

const HireDetails = () => {
  return (
    <>
      <AdminMain/>

    <main id="main1" className="main1">

<div className="pagetitle">
  <h1 className="theme-text2">Hire Details</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
      <li className="breadcrumb-item"><Link to="HiresCar">Hires</Link></li>
      <li className="breadcrumb-item active">Hire Details</li>
    </ol>
  </nav>
</div>
{/* <!-- End Page Title --> */}

<section className="section user-details">
  <div className="row">

    <div className="card">
      <div className="card-body">
        {/* <!-- User Details --> */}
        <table className="table mt-3 table-bordered">
          <tbody>
            <tr>
              <th colSpan="2" className="text-center">Hire Details</th>
              <td></td>
              <th colSpan="2" className="text-center">Vehicle Details</th>
            </tr>
            <tr>
              <th scope="row" className="col-sm-2">Hire ID</th>
              <th>#10983</th>
              <td></td>
              <th scope="row" className="col-sm-2">Vehicle ID</th>
              <th><Link to="/" target="_blank">#0127</Link></th>
            </tr>
            <tr>
              <th scope="row" className="col-sm-2">Status</th>
              <td><span className="badge bg-warning">Pending</span></td>
              <td></td>
              <th scope="row" className="col-sm-2">Vehicle Type</th>
              <td>Car</td>
            </tr>
            <tr>
              <th scope="row" className="col-sm-2">Vehicle ID</th>
              <td>#0127</td>
              <td></td>
              <th scope="row" className="col-sm-2">Vehicle Name</th>
              <td>Maruti Suzuki Alto 800</td>
            </tr>
            <tr>
              <th scope="row" className="col-sm-2">Vehicle Type</th>
              <td>Car</td>
              <td></td>
            </tr>
            <tr>
              <th scope="row" className="col-sm-2">Vehicle ID</th>
              <td>#0127</td>
              <td></td>
            </tr>

          </tbody>
        </table>
        {/* <!-- End User Details --> */}
      </div>

      <div className="card-footer">
        <Link to="HiresCar"><button type="button" className="mx-2 btn btn-secondary"><i className="bi bi-chevron-double-left"></i> Back</button></Link>
      </div>
    </div>

  </div>
</section>

</main>
<Footer/>
{/* <!-- End #main --> */}
    </>
  )
}

export default HireDetails