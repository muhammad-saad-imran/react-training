import React from 'react';
import { IQuoteEstimate } from '@/store/api/types';
import { currencyFormat } from '@/utils/quoteUtils';
import { PaymentContainer } from '@/components/quotes/style';
import Button from '@/elements/buttons/Button';

type Props = {
  selectedEstimate: IQuoteEstimate | undefined;
  programUrl: string;
};

const PaymentDetails = ({ selectedEstimate, programUrl }: Props) => {
  return (
    <PaymentContainer>
      <p className="text-lg md:text-xl">Pay in-Full</p>
      <div>
        <div className="flex justify-between text-slate-500">
          <p>Gross Premium</p>
          <p>{currencyFormat(selectedEstimate?.premiumAmount as number)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-slate-500">Total</p>
          <p className="text-base md:text-lg">
            {currencyFormat(selectedEstimate?.premiumAmount as number)}
          </p>
        </div>
      </div>
      <Button onClick={() => window.open(programUrl, '_blank')}>Pay</Button>
    </PaymentContainer>
  );
};

export default PaymentDetails;
