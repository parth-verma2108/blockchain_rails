import React from "react";
import withGlobalProviders from "../../general/withGlobalProvider";
import BorrowerRegistration from "./new/BorrowerRegistration";
import BrokerRegistration from "./new/BrokerRegistration";
import LenderRegistration from "./new/LenderRegistration";

function New({ userType }) {
  switch (userType) {
    case "lender":
      return <LenderRegistration />
    case "borrower":
      return <BorrowerRegistration />
    case "broker":
      return <BrokerRegistration />
    default:
      break;
  }
}

export default withGlobalProviders(New);
