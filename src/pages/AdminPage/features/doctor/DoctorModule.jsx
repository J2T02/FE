import { DoctorProvider } from "./context/DoctorContext";
import DoctorManagement from "./DoctorManagement";

const DoctorModule = () => {
  return (
    <DoctorProvider>
      <DoctorManagement />
    </DoctorProvider>
  );
};

export default DoctorModule;
