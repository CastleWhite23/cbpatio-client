
import { Navbar } from "../Navbar/Navbar"
import './Layout.css'

const Layout = ({ children, bgImage = "", navStyle = "" }) => {
  const backgroundImage = typeof bgImage === "string" ? bgImage : "";

  return (
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
        navStyle == "home" ? <Navbar /> : <Navbar bgColor={'#22243F'} />
      }
      <div className="content">
        {children}
      </div>

    </div>
  );
};

export { Layout };