import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import AdminMain from '../components/AdminMain'

const PageSetting = () => {
  return (
    <>
    <AdminMain/>

    <main id="main1" className="main1">

<div className="pagetitle">
  <h1 className="theme-text2">Profile</h1>
  <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/"><i className="bi bi-house-door"></i></Link></li>
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

          <img src="assets/img/super-admin-1.jpg" alt="Profile" className="rounded-circle"/>
          <h2>Super Admin</h2>
          <h3>Super Admin</h3>
          <div className="social-links mt-2">
            <Link to="/" className="twitter"><i className="bi bi-twitter"></i></Link>
            <Link to="/" className="facebook"><i className="bi bi-facebook"></i></Link>
            <Link to="/" className="instagram"><i className="bi bi-instagram"></i></Link>
            <Link to="/" className="linkedin"><i className="bi bi-linkedin"></i></Link>
          </div>
        </div>
      </div>

    </div>

    <div className="col-xl-8">

      <div className="card">
        <div className="card-body pt-3">
          {/* <!-- Bordered Tabs --> */}
          <ul className="nav nav-tabs nav-tabs-bordered">

            <li className="nav-item">
              <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
            </li>

            <li className="nav-item">
              <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-setting">Setting</button>
            </li>

          </ul>
          <div className="tab-content pt-2">

            <div className="tab-pane fade show active profile-overview" id="profile-overview">
              <h5 className="card-title">About</h5>
              <p className="small fst-italic">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo pariatur consequatur quae numquam, deserunt modi itaque ipsum, beatae autem aperiam eligendi rerum quos culpa, similique amet nesciunt officiis odio nisi!</p>

              <h5 className="card-title">Profile Details</h5>

              <div className="row">
                <div className="col-lg-3 col-md-4 label ">Full Name</div>
                <div className="col-lg-9 col-md-8">Super Admin</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Level</div>
                <div className="col-lg-9 col-md-8">Super Admin</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">District</div>
                <div className="col-lg-9 col-md-8">Jaffna</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Address</div>
                <div className="col-lg-9 col-md-8">R0127, REON Street, Reon</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Phone</div>
                <div className="col-lg-9 col-md-8">0123456789</div>
              </div>

              <div className="row">
                <div className="col-lg-3 col-md-4 label">Email</div>
                <div className="col-lg-9 col-md-8">superadmin@reon</div>
              </div>

            </div>

            <div className="tab-pane fade profile-edit pt-3" id="profile-edit">

              {/* <!-- Profile Edit Form --> */}
              <form>
                <div className="row mb-3">
                  <label for="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                  <div className="col-md-8 col-lg-9">
                    <img src="assets/img/super-admin-1.jpg" alt="Profile"/>
                    <div className="pt-2">
                      <Link to="/" className="btn btn-primary btn-sm" title="Upload new profile image"><i className="bi bi-upload"></i></Link>
                      <Link to="/" className="btn btn-danger btn-sm" title="Remove my profile image"><i className="bi bi-trash"></i></Link>
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="fullName" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="fullName" type="text" className="form-control" id="fullName" value="Super Admin"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                  <div className="col-md-8 col-lg-9">
                    <textarea name="about" className="form-control" id="about" style={{height: "100px"}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores est assumenda inventore, distinctio accusamus veritatis alias quo nihil sint eveniet ducimus dolore natus aliquam saepe ipsa explicabo reprehenderit modi magnam.</textarea>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="level" className="col-md-4 col-lg-3 col-form-label">Level</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="level" type="text" className="form-control" id="level" value="Super Admin"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="district" className="col-md-4 col-lg-3 col-form-label">District</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="district" type="text" className="form-control" id="district" value="Jaffna"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Address" className="col-md-4 col-lg-3 col-form-label">Address</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="address" type="text" className="form-control" id="Address" value="R0127, REON Street, Reon"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Phone" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="phone" type="text" className="form-control" id="Phone" value="0123456789"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="email" type="email" className="form-control" id="Email" value="superadmin@reon"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Twitter" className="col-md-4 col-lg-3 col-form-label">Twitter Profile</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="twitter" type="text" className="form-control" id="Twitter" value="https://twitter.com/#"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Facebook" className="col-md-4 col-lg-3 col-form-label">Facebook Profile</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="facebook" type="text" className="form-control" id="Facebook" value="https://facebook.com/#"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Instagram" className="col-md-4 col-lg-3 col-form-label">Instagram Profile</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="instagram" type="text" className="form-control" id="Instagram" value="https://instagram.com/#"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="Linkedin" className="col-md-4 col-lg-3 col-form-label">Linkedin Profile</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="linkedin" type="text" className="form-control" id="Linkedin" value="https://linkedin.com/#"/>
                  </div>
                </div>

                <div className="text-center">
                  <button type="reset" className="btn btn-primary theme-bg-blue">Reset Changes</button>
                  <button type="submit" className="btn btn-warning theme-bg-orange">Save Changes</button>
                </div>
              </form>
              {/* <!-- End Profile Edit Form --> */}

            </div>

            <div className="tab-pane fade pt-3" id="profile-change-password">
              {/* <!-- Change Password Form --> */}
              <form>

                <div className="row mb-3">
                  <label for="currentPassword" className="col-md-4 col-lg-3 col-form-label">Current Password</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="password" type="password" className="form-control" id="currentPassword"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="newpassword" type="password" className="form-control" id="newPassword"/>
                  </div>
                </div>

                <div className="row mb-3">
                  <label for="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
                  <div className="col-md-8 col-lg-9">
                    <input name="renewpassword" type="password" className="form-control" id="renewPassword"/>
                  </div>
                </div>

                <div className="text-center">
                  <button type="reset" className="btn btn-primary theme-bg-blue">Reset Changes</button>
                  <button type="submit" className="btn btn-warning theme-bg-orange">Change Password</button>
                </div>
              </form>
              {/* <!-- End Change Password Form --> */}

            </div>

            <div className="tab-pane fade pt-3" id="profile-setting">
              {/* <!-- Change Password Form --> */}
              <form>

                <div className="row mb-3">
                  <label for="themeSetting" className="col-md-4 col-lg-3 col-form-label">Theme</label>
                  <div className="col-md-8 col-lg-9">
                    <select aria-label="Default select example" className="form-control"  id="themeSetting">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>

                <div className="text-center">
                  <button type="reset" className="btn btn-primary theme-bg-blue">Reset Changes</button>
                  <button type="submit" className="btn btn-warning theme-bg-orange">Save Changes</button>
                </div>
              </form>
              {/* <!-- End Change Password Form --> */}

            </div>

          </div>
          {/* <!-- End Bordered Tabs --> */}

        </div>
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

export default PageSetting