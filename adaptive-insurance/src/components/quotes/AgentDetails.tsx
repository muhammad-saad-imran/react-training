import React from 'react';
import { IAgent } from '@/store/api/types';
import { DetailsContainer } from '@/components/quotes/style';

type Props = {
  agent: IAgent | undefined;
};

const AgentDetails = ({ agent }: Props) => {
  return (
    <DetailsContainer>
      <div>
        <p className="text-slate-500">Agent Id </p>
        <p className="text-base md:text-lg">{agent?.id}</p>
      </div>
      <div>
        <p className="text-slate-500">Agent Name </p>
        <p className="text-base md:text-lg">{`${agent?.firstName} ${agent?.lastName}`}</p>
      </div>
      <div>
        <p className="text-slate-500">Agency </p>
        <p className="text-base md:text-lg">{agent?.agencyName}</p>
      </div>
      <div>
        <p className="text-slate-500">Role </p>
        <p className="text-base md:text-lg">{agent?.role}</p>
      </div>
      <div>
        <p className="text-slate-500">Email</p>
        <p className="text-base md:text-lg">{agent?.email}</p>
      </div>
      <div>
        <p className="text-slate-500">Phone</p>
        <p className="text-base md:text-lg">{agent?.phone}</p>
      </div>
      <div>
        <p className="text-slate-500">Status</p>
        <p className="text-base md:text-lg">{agent?.status}</p>
      </div>
    </DetailsContainer>
  );
};

export default AgentDetails;
