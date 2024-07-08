import React from "react";
import BusinessInfoFormLayout from "@/Layouts/business-info/BusinessInfoFormLayout";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
      <BusinessInfoFormLayout>
        {children}
      </BusinessInfoFormLayout>
  );
};

export default Layout;
