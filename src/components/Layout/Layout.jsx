
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
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="content">
        {
          navStyle == "home" ? <Navbar /> : <Navbar bgColor={'#22243F'} />
        }

        {children}
      </div>

    </div>
  );
};

export { Layout };