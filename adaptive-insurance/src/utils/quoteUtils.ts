import moment from 'moment';
import { IPolicyCoverageState } from '@/store/feature/policy-coverage';
import { IAddress } from '@/store/api/types';

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function currencyFormat(price: number) {
  return USDollar.format(price);
}

export function getCoverage(policy: IPolicyCoverageState) {
  return {
    coverageAmount: policy.amount,
    estimateId: policy.selectedEstimateId,
    effectiveDate: getCoverageDate(policy.effectiveDateUtc),
  };
}

export function getCoverageDate(selectedUtc?: string) {
  return moment
    .utc(
      !selectedUtc || selectedUtc === ''
        ? new Date().toISOString()
        : selectedUtc
    )
    .add(1, 'days')
    .format('MM/DD/YY');
}

export function getCompleteAddress(address: IAddress) {
  return `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`;
}
