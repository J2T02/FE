import LoginModel from "./components/LoginModel";
import { theme, Layout } from "antd";
import Header from "~components/header/Header";
import Footer from "~components/footer/Footer";
function LoginDoctor() {
  return (
    <Layout>
      {/* <Header /> */}
      <LoginModel />
      <Footer />
    </Layout>
  );
}

export default LoginDoctor;
