import styled from 'styled-components';

export const TableContainer = styled.div`
  width: 100%;
  /* min-width: 850px; */
  height: fit-content;
  max-height: 100vh;
  overflow: auto;
  padding-bottom: 4rem;
`;

export const Theader = styled.th`
  width: 25%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  padding: 1.25rem;
`;

export const TCell = styled.td`
  width: 25%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.25);
  padding: 1.25rem;
`;

export const TRow = styled.tr`
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;

export const StatusWrapper = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color};
  border-radius: 16px;
  width: fit-content;
  padding: 0 4px;
`;
