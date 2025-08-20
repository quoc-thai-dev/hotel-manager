import "./App.css";
import DateRangeGroup from "./components/DateRangeGroup";
import InputDateGroup from "./components/InputDateGroup";
import InputGroup from "./components/InputGroup";
import SelectRoom from "./components/Room/SelectRoom";
import Title from "./components/Title";
function App() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" bg-blue-50 p-4">
          <Title text="Thông tin khách hàng" color="text-orange-500" />
          <InputGroup text="Họ tên" inputName="customer-name" />
          <InputGroup text="Số điện thoại" inputName="tel" />
          <InputDateGroup hidden text="Ngày IN" inputName="checkin"/>
          <InputDateGroup hidden text="Ngày OUT" inputName="checkout"/>
          <DateRangeGroup text="Thời gian" inputName="date-range"/>
          <SelectRoom/>
        </div>
        <div className=" bg-gray-50 p-4">
                    <Title text="Xem trước Booking 🗿" color="text-gray-500" />
        </div>
      </div>
    </>
  );
}

export default App;
