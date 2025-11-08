import React from 'react';
import Footer from "../../components/Footer/Footer.tsx";
import Header from "../../components/Header";

interface Props{
  children: React.ReactNode;
}

export default function ({children}: Props){
  return <div>
    <Header />
    {children}
    <Footer />
  </div>
}