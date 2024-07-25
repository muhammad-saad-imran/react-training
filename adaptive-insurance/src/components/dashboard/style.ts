import styled from 'styled-components';
import { NavbarWrapper } from '@/components/common/style';

export const SidebarWrapper = styled.div<{ $isOpen: boolean }>`
  width: 20%;
  box-shadow: 3px 0px 10px 0px rgb(0 0 0 / 0.2);
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  padding: 1rem;
  padding-top: 3rem;
  z-index: 70;
  transition: all ease-in-out 0.5s;

  /* for sm size screens */
  @media (max-width: 767px) {
    width: 200px;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0px' : '-500px')};
  }
`;

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  transition: all ease-in-out 0.5s;
  /* for sm size screens */
  @media (max-width: 767px) {
    display: block;
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: ${({ $isOpen }) => ($isOpen ? '0px' : '-1000px')};
    z-index: 60;
    background-color: rgb(0 0 0 / 0.5);
  }
`;

export const SidebarOpts = styled.div<{ $selected: boolean }>`
  padding: 1rem;
  width: 100%;
  border-radius: 15px;
  color: ${({ $selected }) => ($selected ? 'white' : 'black')};
  text-align: center;
  background-color: ${({ $selected }) => ($selected ? 'black' : 'white')};
  cursor: pointer;

  &:hover {
    background-color: ${({ $selected }) =>
      $selected ? 'black' : 'rgb(0 0 0 / 0.15)'};
  }
`;

export const TopbarWrapper = styled(NavbarWrapper).attrs({
  className: 'md:hidden pl-3',
})``;

export const DashboardLayoutWrapper = styled.div.attrs({
  className: 'h-full w-full overflow-auto bg-anti-white md:w-4/5',
})``;
