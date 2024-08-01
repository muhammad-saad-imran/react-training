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

export const PageWrapper = styled.div.attrs({
  className:
    'flex h-full flex-col items-center gap-10 overflow-auto p-10 md:pt-16',
})``;

export const QuoteDetailsContainer = styled.div.attrs({
  className:
    'flex w-full max-w-6xl h-fit flex-col gap-8 rounded-xl bg-white p-8 shadow-md',
})``;

export const DetailsContainer = styled.div.attrs({
  className:
    'flex w-full flex-col gap-9 text-sm md:text-base',
})``;

export const PaymentContainer = styled.div.attrs({
  className: 'flex w-full flex-col gap-6 md:min-w-56 lg:min-w-80',
})``;

export const Title = styled.div.attrs({
  className: 'text-center text-4xl text-black',
})``;
