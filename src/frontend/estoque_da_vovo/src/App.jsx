
import React, { useState } from 'react';
import { Container} from 'react-bootstrap';

import { Outlet } from "react-router-dom";

import SideBar from './components/SideBar/SideBar.jsx'
import Header from './components/Header/Header.jsx';

import './App.css'

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  return (
    <div className="main-layout d-flex">
      <SideBar expanded={sidebarExpanded} toggleSidebar={toggleSidebar} />
      <div className="content-area flex-grow-1">
        <Header expanded={sidebarExpanded} toggleSidebar={toggleSidebar} />
        <Container fluid className="main-content p-3">
        <Outlet />
        </Container>
      </div>
    </div>
  );
}
