import React from 'react'
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
function Sidebar() {
  return (
    <div className='sidebar'>
      <div className="top">
        <span className="logo">admin</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className='icon'/>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>

          <li>
            <PersonOutlineOutlinedIcon className='icon'/>
            <span>Users</span>
          </li>
          <li>
            <StoreIcon className='icon'/>
            <span>Products</span>
          </li>
          <li>
            <CreditCardOutlinedIcon className='icon'/>
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className='icon'/>
            <span>Delivery</span>
          </li>
          <p className="title">USEFUL</p>

          <li>
            <InsertChartIcon className='icon'/>
            <span>Stats</span>
          </li>
          <li>
            <NotificationsOutlinedIcon className='icon'/>
            <span>Notifications</span>
          </li>

          <p className="title">SERVICE</p>

          <li>
            <SettingsSystemDaydreamOutlinedIcon className='icon'/>
            <span>System Health</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className='icon'/>
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className='icon'/>
            <span>Settings</span>
          </li>
          <p className="title">USER</p>

          <li>
            <AccountCircleOutlinedIcon className='icon'/>
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className='icon'/>
            <span>Log Out</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
      <div className="colorOption"></div>
      <div className="colorOption"></div>
      </div>
      
    </div>
  )
}

export default Sidebar