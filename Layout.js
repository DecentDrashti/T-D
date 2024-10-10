import { Link, Outlet, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Layout() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to navigate away from this page?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, navigate',
      cancelButtonText: 'No, stay here'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path);
      }
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'whitesmoke' }}>
        <div className="container-fluid">
          <a className="navbar-brand" style={{ color: 'blueviolet' }}>MyTo-Do_App<i className="bi bi-check2-square"></i></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleNavigation('/')}>My_Todo_list</a>
              </li>
              <li className="nav-item col-12">
                <a className="nav-link" onClick={() => handleNavigation('/addtodo')}>Add To_do</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;




 {/* <form className="d-flex col-9" role="search">
              <input className="form-control me-2" type="search" placeholder="Search your To-Do list here" aria-label="Search" />
              <button className="btn btn-outline-success col-3" type="submit">
                <Link to="/search">Search</Link>
              </button>
            </form> */}