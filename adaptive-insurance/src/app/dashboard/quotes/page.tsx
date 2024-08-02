'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { faker } from '@faker-js/faker';
import { forEach, map } from 'lodash';
import moment from 'moment';
import { currencyFormat } from '@/utils/quoteUtils';
import {
  StatusWrapper,
  TableContainer,
  TCell,
  Theader,
  TRow,
} from '@/components/quotes/style';

type Props = {};

const statusArray = ['Active', 'Payment due', 'Incomplete', 'Need Action'];

let tableData = [];

for (let i = 0; i < 50; i++)
  tableData.push({
    key: i,
    customer: faker.company.name(),
    status: faker.helpers.arrayElement(statusArray),
    premium: faker.finance.amount({ min: 5000, max: 50000 }),
    date: faker.date.future(),
  });

function getColor(status: string) {
  if (status === 'Active') return 'green';
  else if (status === 'Incomplete') return '#A9A9A9';
  else if (status === 'Payment due') return '#FFA500';
  return '#991B1B';
}

const QuotesPage = (props: Props) => {
  const router = useRouter();
  const quoteId = 'ec2bee2c-a6c9-4886-9b65-8f235d036de5';

  let pieChartData = [
    {
      name: 'Active',
      value: 0,
    },
    {
      name: 'Payment due',
      value: 0,
    },
    {
      name: 'Incomplete',
      value: 0,
    },
    {
      name: 'Need Action',
      value: 0,
    },
  ];
  forEach(tableData, (item) => {
    pieChartData[statusArray.indexOf(item.status)].value += 1;
  });

  return (
    <div className="h-full w-full p-5">
      {/* <p className="mb-4 text-4xl">Quotes</p> */}
      <ResponsiveContainer
        className="flex items-center justify-center"
        height={300}
        width="100%"
      >
        <PieChart>
          <Tooltip />
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            label={({ name, value }) => (value === 0 ? '' : name)}
            labelLine={false}
            elevation={2}
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={50}
            fill="#004D40"
          />
        </PieChart>
      </ResponsiveContainer>

      <TableContainer>
        <table className="mt-8 w-full text-center">
          <tbody>
            <tr className="sticky top-0 bg-anti-white">
              <Theader>Customer</Theader>
              <Theader>Status</Theader>
              <Theader>Gross Premium</Theader>
              <Theader>Effective Date</Theader>
            </tr>
            {map(tableData, (data) => (
              <TRow
                key={data.key}
                onClick={() => router.push(`quotes/${quoteId}`)}
              >
                <TCell>{data.customer}</TCell>
                <TCell>
                  <div className="flex w-full justify-center">
                    <StatusWrapper $color={getColor(data.status)}>
                      {data.status}
                    </StatusWrapper>
                  </div>
                </TCell>
                <TCell>{currencyFormat(Number(data.premium))}</TCell>
                <TCell>{moment(data.date).format('MM/DD/YYYY')}</TCell>
              </TRow>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </div>
  );
};

export default QuotesPage;
