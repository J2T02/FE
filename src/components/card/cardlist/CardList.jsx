import React from 'react';
import { Card, Typography, List } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const treatmentSteps = [
  'Initial consultation and assessment',
  'Ovulation monitoring with ultrasounds',
  'Sperm preparation in the laboratory',
  'Insemination procedure (5-10 minutes)',
  'Post-treatment monitoring',
];

const goodCandidates = [
  'Unexplained infertility',
  'Cervical factor infertility',
  'Mild male factor infertility',
  'Ovulation disorders',
];


function CardList() {
    return (
    
        
        <div>
        <Card bordered style={{ borderColor: '#f0dede', borderRadius: 8 }}>
          <Title level={4} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#1f1f1f' }}>
            <CheckCircleOutlined style={{ color: 'green' }} />
            Treatment Process
          </Title>
          <List
            dataSource={treatmentSteps}
            renderItem={(item, index) => (
              <List.Item style={{ paddingLeft: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: '#cce4ff',
                      color: '#1d39c4',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {index + 1}
                  </span>
                  <Text>{item}</Text>
                </div>
              </List.Item>
            )}
          />
        </Card>
        </div>
       
        );

        
        
    
        
}

export default CardList;