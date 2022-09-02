import React from "react";

// function ProtectedLayout( {{ body }: { Component: React.ReactNode }}) {
//   const pageName = window.location.pathname.split("/")[1];
//   const pages = [
//     "signin"
//   //   "privacy-policy",
// 	// "maintenance",
//   //   "terms-and-conditions",
//   //   "new-password",
//   //   "how-to-stream",
//   //   "streamChat"
//   ];
//   if (pages.includes(pageName)) 
//     return "";
//   else 
//     return <Component/>

// }

// export default ProtectedLayout;
 
export default function ProtectedLayout({ body }: { body: React.ReactNode }) {
  const pageName = window.location.pathname.split("/")[1];
  const pages = [
    "signin",
    
    ,
];
if (pages.includes(pageName)) 
    return <>
    </>;
  else 
    return <>
    {body}
    </>

}

// export default function App() {
//   return <ExampleComponent body={<h3> Hello World! </h3>} />;
// }