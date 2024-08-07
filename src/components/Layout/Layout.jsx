
import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer";
import './Layout.css'

const Layout = ({ children, bgImage = "", navStyle = "" }) => {
  const backgroundImage = typeof bgImage === "string" ? bgImage : "";

  return (
    navStyle == 'home' ?
      <div
        className="layout"
      >

        <Navbar isHome={'s'}/>

        <div className="content">
          {children}
        </div>

        <Footer />
      </div>

      :

      <div>
        <Navbar isHome='n' />
        <div className="content">
          {children}
        </div>
        <Footer />
      </div>
  );
};

export { Layout };
