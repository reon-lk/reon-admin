import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* <!-- ======= Footer ======= --> */}
      <footer id="footer" className="footer">
        <div className="copyright">
          &copy; Copyright <strong><span>RE<span>O</span>N</span></strong>. All Rights Reserved
        </div>
      </footer>
      {/* <!-- End Footer --> */}

      <Link to="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></Link>
    </>
  )
}

export default Footer