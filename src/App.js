import Footer from "./components/Footer";
import MainBrandLogo from "./components/MainBrandLogo";
import RomanizeTool from "./components/RomanizeTool";

const App = () => {
  return (
    <>
      <MainBrandLogo
        logoSrc="/soft-logo.webp"
        mainDomain="soft.io.vn"
        dismissible={false}
        altText="Logo Soft"
      />
      <RomanizeTool />
      <Footer />
    </>
  );
};

export default App;
