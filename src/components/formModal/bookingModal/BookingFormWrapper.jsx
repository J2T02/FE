import { Form, Button, Steps, message } from "antd";
import { useState } from "react";
import BookingContent from "./BookingContent";
import PersonInfo from "./PersonInfo";

const BookingFormWrapper = ({ services, doctors, schedules, doctor }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingForm] = Form.useForm();
  const [personForm] = Form.useForm();
  const [bookingData, setBookingData] = useState({});

  const handleNext = async () => {
    try {
      const values = await bookingForm.validateFields();
      setBookingData(values);
      setCurrentStep(1);
    } catch (err) {
      console.log("Form 1 invalid", err);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(0);
  };

  const handleSubmit = async () => {
    try {
      const personalValues = await personForm.validateFields();
      const finalData = {
        ...bookingData,
        ...personalValues,
      };
      console.log("📦 Dữ liệu gửi đi:", finalData);

      // TODO: Gửi API tại đây
      message.success("Đặt hẹn thành công!");
      bookingForm.resetFields();
      personForm.resetFields();
      setCurrentStep(0);
      onClose();
    } catch (err) {
      console.log("Form 2 invalid", err);
    }
  };

  return (
    <div>
      <Steps current={currentStep} size="small" className="mb-4">
        <Steps.Step title="Chọn dịch vụ & thời gian" />
        <Steps.Step title="Thông tin cá nhân" />
      </Steps>

      {currentStep === 0 && (
        <>
          <BookingContent
            form={bookingForm}
            services={services}
            doctors={doctors}
            schedules={schedules}
            doctor={doctor}
          />
          <div className="mt-4 flex justify-end">
            <Button type="primary" onClick={handleNext}>
              Tiếp tục
            </Button>
          </div>
        </>
      )}

      {currentStep === 1 && (
        <PersonInfo
          form={personForm}
          onPrevious={handlePrevious}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default BookingFormWrapper;
