"use client";
import React from "react";
import QuoteCard from "@/components/policy-coverage/QuoteCard";
import { QuoteCardWrapper } from "@/components/policy-coverage/style";
import { BusinessFormWrapper, BusinessInfoPageWrapper } from "@/components/business-info/style";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="pb-24">
      <BusinessInfoPageWrapper>
        <BusinessFormWrapper>{children}</BusinessFormWrapper>
        <QuoteCardWrapper>
          <div className="fixed right-10">
            <QuoteCard />
          </div>
        </QuoteCardWrapper>
      </BusinessInfoPageWrapper>
    </div>
  );
};

export default Layout;
