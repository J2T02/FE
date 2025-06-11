import React from 'react';
import { Card, Typography, Button, Tag, Space } from 'antd';
import {
  EnvironmentOutlined,
  ManOutlined,
  NumberOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;


function SeriveBanner() {
    return ( 
        <Card
      hoverable
      cover={
        <img
          alt="Doctor and patient consulting"
          src="https://storage.googleapis.com/a1aa/image/bd3fc7b9-8e9b-40ff-7e1a-1fd1fa09548b.jpg"
          style={{ objectFit: 'cover', height: 400 }}
        />
      }
      style={{ maxWidth: '100%', border: '1px solid #1890ff' }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Title level={4} style={{ color: '#1d3b73', margin: 0 }}>
          IUI
        </Title>

        <Space wrap size={[20, 8]}>
          <Text type="secondary">
            <ManOutlined /> Nam
          </Text>
          <Text type="secondary">
            <NumberOutlined /> 18 - 100 tuổi
          </Text>
          <Text type="secondary">
            <EnvironmentOutlined /> Hà Nội
          </Text>
        </Space>

        <Space size="middle" align="center">
          <Text strong style={{ color: 'red', fontSize: 20 }}>
            2.970.000 đ
          </Text>
          <Text delete type="secondary">
            3.300.000 đ
          </Text>
          <Tag color="red">-10.0%</Tag>
        </Space>

        <Button type="primary" size="large" block>
          Đặt lịch ngay
        </Button>
      </div>
    </Card>
     );
}

export default SeriveBanner;