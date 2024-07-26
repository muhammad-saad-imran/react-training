'use client';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  DashboardPageWrapper,
  SidebarOverlay,
  TopbarWrapper,
} from '@/components/dashboard/style';
import Sidebar from '@/components/dashboard/Sidebar';
import MenuIcon from '@/elements/icons/MenuIcon';

type Props = { children: React.ReactNode };

const DashboardLayout = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-full">
      <TopbarWrapper>
        <div onClick={toggleSidebar}>
          <MenuIcon />
        </div>
      </TopbarWrapper>
      <Sidebar isOpen={isOpen} />
      <SidebarOverlay onClick={toggleSidebar} $isOpen={isOpen} />
      <DashboardPageWrapper>
        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{ className: 'w-96' }}
        />
        <div className="h-full pt-20 md:pt-0">{props.children}</div>
      </DashboardPageWrapper>
    </div>
  );
};

export default DashboardLayout;
