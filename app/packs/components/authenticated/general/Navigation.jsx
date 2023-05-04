import React from "react";
import { useSelector } from "react-redux";
import BorrowerNavigation from "../borrower/general/Navigation";
import LenderNavigation from "../lender/general/Navigation";
import AdminNavigation from "../admin/general/Navigation";

import withGlobalProviders from "../../general/withGlobalProvider";
import BasicNavigation from "../../general/BasicNavigation";

function Navigation() {
  const user = useSelector((state) => state.session.currentUser);

  if (user) {
    const { userType } = user.attributes;
  
    if (userType === "borrower") {
      return <BorrowerNavigation />
    } else if (userType === "lender") {
      return <LenderNavigation />;
    } else if (userType === "admin") {
      return <AdminNavigation />
    }
  } else {
    return <BasicNavigation />
  }
}

export default withGlobalProviders(Navigation);
