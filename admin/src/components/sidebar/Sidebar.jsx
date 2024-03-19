import { useContext } from 'react'
import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';
function Sidebar() {
  const { dispatch } = useContext(DarkModeContext)

  return (
    <div className='sidebar'>
      <div className="top">
        <Link to={'/'} style={{ textDecoration: "none" }}>
          <span className="logo">admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon' />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to={'/users'} style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlinedIcon className='icon' />
              <span>Users</span>
            </li>
          </Link>

          <Link to={'/hotels'} style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className='icon' />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to={'/rooms'} style={{ textDecoration: "none" }}>
          <li>
            <CreditCardOutlinedIcon className='icon' />
            <span>Rooms</span>
          </li>
          </Link>
          <li>
            <LocalShippingIcon className='icon' />
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <InsertChartIcon className='icon' />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsOutlinedIcon className='icon' />
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>

          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon' />
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon' />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='icon' />
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountCircleOutlinedIcon className='icon' />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className='icon' />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOption" onClick={()=>dispatch({type:"LIGHT"})}></div>
        <div className="colorOption" onClick={()=>dispatch({type:"DARK"})}></div>
      </div>

    </div>
  )
}

export default Sidebar