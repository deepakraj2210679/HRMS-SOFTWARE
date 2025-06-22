
import { Link,NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import Admin_dashboard from '../assets/Admin_dashboard.svg';
import './AdminLayout.css';
const AdminSidebar = () => {

  return (
    <>
  <div className="admin_menu">
  <div className="admin_menu_head">
    <div className="admin_menu_head-img">
      <img src={logo} alt="Logo" />
    </div>
    <h5>NoQu HRMS</h5>
  </div>

  <ul className="admin_menu_list">
    <li>
      <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Dashboard
      </NavLink>
    </li>
    <li>
      <NavLink to="/interview" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Interview
      </NavLink>
    </li>
    <li>
      <NavLink to="/onboarding" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Onboard
      </NavLink>
    </li>
     <li>
      <NavLink to="/employees" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Employee
      </NavLink>
    </li>
    <li>
      <NavLink to="/documents" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Documents
      </NavLink>
    </li>
   <li>
      <NavLink to="/asset" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>
        <img src={Admin_dashboard} width={15} style={{ marginRight: 8 }} />
        Assets
      </NavLink>
    </li>
  </ul>
</div>

    </>
  );
};

export default AdminSidebar;
