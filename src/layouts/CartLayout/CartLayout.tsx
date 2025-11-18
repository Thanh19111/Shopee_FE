import React from "react";
import Footer from "../../components/Footer/Footer.tsx";
import CartHeader from "../../components/CartHeader";

interface Props{
  children: React.ReactNode;
}

export default function ({children}: Props){
  return <div>
    <CartHeader />
    {children}
    <Footer />
  </div>
}