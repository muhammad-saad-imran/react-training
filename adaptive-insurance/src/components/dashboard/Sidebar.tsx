'use client';
import { SidebarOpts, SidebarOverlay, SidebarWrapper } from '@/components/dashboard/style';
import { HorizontalLine } from '@/components/policy-coverage/style';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = {
  isOpen: boolean;
};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <SidebarWrapper $isOpen={props.isOpen}>
      <Image src="/logo.svg" alt="" width={75} height={75} />
      <HorizontalLine />
      <div className="flex w-full flex-col gap-2">
        <SidebarOpts
          $selected={pathname === '/dashboard/quotes'}
          onClick={() => router.push('/dashboard/quotes')}
        >
          Quotes
        </SidebarOpts>
        <SidebarOpts
          $selected={pathname === '/dashboard/policies'}
          onClick={() => router.push('/dashboard/policies')}
        >
          Policies
        </SidebarOpts>
        <SidebarOpts
          $selected={pathname === '/dashboard/raters'}
          onClick={() => router.push('/dashboard/raters')}
        >
          Raters
        </SidebarOpts>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
