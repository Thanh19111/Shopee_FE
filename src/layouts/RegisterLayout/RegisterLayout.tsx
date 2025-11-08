import RegisterHeader from "../../components/RegisterHeader";
import Footer from "../../components/Footer/Footer.tsx";

interface Props{
  children: React.ReactNode;
}

export default function ({children}: Props){
  return <div>
    <RegisterHeader />
    {children}
    <Footer />
  </div>
}