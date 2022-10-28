import React from "react";

export default function ProtectedLayout({ body }: { body: React.ReactNode }) {
  const pageName = window.location.pathname.split("/")[1];
  const pages = [
    "signin",
    "2fa"
];
if (pages.includes(pageName)) 
    return <>
    </>;
  else 
    return <>
    {body}
    </>

}
