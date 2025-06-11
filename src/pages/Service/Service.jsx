import { theme } from 'antd';

import  Header  from '~components/header/Header';


import Footer from '~components/footer/Footer';
import { Layout } from 'antd';
import CardService from '~components/card/cardservice/CardService';

function Service() {
  const { token } = theme.useToken();
  return (
    <Layout>
        <Header />
        <div style={{ marginTop: 64 
, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
        
          <h1 style={{ fontWeight:'700',fontFamily: token.fontFamily, fontSize: 36, color: '#111827'}}>Dịch Vụ Điều Trị</h1>
          <p style={{color:'#4B5563'}}>Demo</p>
          <CardService />
          <CardService />
          <CardService />
        </div>
        
        <Footer/>
    </Layout>
    

  );
}

export default Service;
