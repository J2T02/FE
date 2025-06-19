import { Checkbox, Form } from "antd";
import { useDoctor } from "../context/DoctorContext";

const CertificateSelector = ({
  name = "certificateIds",
  label = "Certificates",
}) => {
  const { certificates } = useDoctor();
  return (
    <Form.Item name={name} label={label}>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        {certificates.map((cert) => (
          <Checkbox key={cert.cerId} value={cert.cerId}>
            {cert.cerName}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Form.Item>
  );
};

export default CertificateSelector;
