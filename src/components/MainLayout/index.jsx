import React from 'react';
import Overview from '../Overview'
import VlaioHeader from '../VlaioHeader'
import VlaioFooter from '../VlaioFooter'

const MainLayout = () => (
  <div className="mainLayout">
      <VlaioHeader />
      <Overview />  
      <VlaioFooter />
      
  </div>
);

export default MainLayout;
