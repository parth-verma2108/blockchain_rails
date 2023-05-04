import React from "react";
import { Toaster } from "react-hot-toast";

import Navigation from "./Navigation";
import Footer from "./Footer";

function PageBody({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navigation />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{
          marginTop: 60
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 3000,
        }}
      />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
}

export default PageBody;
