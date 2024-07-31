
import { Navbar } from "../Navbar/Navbar"
import { Footer } from "../Footer/Footer";
import './Layout.css'

const Layout = ({ children, bgImage = "", navStyle = "" }) => {
  const backgroundImage = typeof bgImage === "string" ? bgImage : "";

  return (
    bgImage ?
      <div
        className="layout"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          width: "100%",
          minHeight: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {
          navStyle == "home" ? <Navbar isHome={'s'} /> : ''
        }
        <div className="content">
          {children}
        </div>

      </div>

      :

      <div>
        <Navbar isHome='n'/>
        <div className="content">
          {children}
        </div>
        <Footer />
      </div>
  );
};

export { Layout };
