import { useEffect, useState, type InputEventHandler } from "react";
import "./App.css";
import DateRangeGroup from "./components/DateRangeGroup";
import InputDateGroup from "./components/InputDateGroup";
import InputGroup from "./components/InputGroup";
import SelectRoom from "./components/Room/SelectRoom";
import Title from "./components/Title";
import type { ICustomer } from "./interfaces";


const initialCustomer: ICustomer = {
  name: '',
  tel: '',
  dateIn: '',
  dateOut: '',
  totalNight: 0,
  rooms: [
    {
      name: "",
      room: "",
      quantity: 1,
      night: 1,
      price: 0,
      afterPrice: 0
    }
  ],
  totalPrice: 0,
  totalDiscount: 0,
};
function App() {
  const [customer, setCustomer] = useState<ICustomer>(initialCustomer);
  useEffect(() => {
    console.log(customer)
  }, [customer])
  const handleData = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCustomer(prev => ({
      ...prev,
      [name]: value
    }))
  }
  const handleSetDate = (dataRange: { in: Date, out: Date, night: number }) => {
    const { in: dateIn, out, night } = dataRange
    setCustomer(prev => ({
      ...prev,
      "dateIn": dateIn.toString(),
      "dateOut": out.toString(),
      "totalNight": night
    }))
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="col-span-3 bg-blue-50 p-4">
          <Title text="Thông tin khách hàng" color="text-orange-500" />
          <InputGroup text="Họ tên" inputName="name" onBlur={(e) => handleData(e)} />
          <InputGroup text="Số điện thoại" inputName="tel" onBlur={(e) => handleData(e)} />
          {/* <InputDateGroup hidden text="Ngày IN" inputName="checkin" />
          <InputDateGroup hidden text="Ngày OUT" inputName="checkout" /> */}
          <DateRangeGroup text="Thời gian" inputName="date-range" setData={handleSetDate} />
          <SelectRoom customer={customer} setData={setCustomer} />
        </div>
        <div className=" col-span-3 bg-gray-50 p-4">
          <Title text="Xem trước Booking 🗿" color="text-gray-500" />
          <pre className="text-left whitespace-pre-wrap break-words">
            Họ & tên khách hàng: Chị Tố Uyên <br />
            Số điện thoại: 0332774898 <br />
            Ngày check in: 24/08/2025 <br />
            Ngày check out: 25/08/2025 <br />
            Loại phòng đặt: <br />
            + Loại Phòng  x1 phòng x1 đêm = 0( Ưu đãi còn 0) <br />
            + Loại Phòng  x1 phòng x1 đêm = 0( Ưu đãi còn 0) <br />
            Tổng thanh toán: 0 <br />
            💥 Ưu đãi còn: 0 <br /> 
            Khách hàng thanh toán dùm em: 0 (để áp dụng VOUCHER giảm giá ạ) <br />
            - Khải Ngọc Hotel nhận thanh toán qua 2 hình thức: <br />
            + Chuyển khoản ngân hàng <br />
            + Thanh toán qua thẻ tín dụng <br />
            <span className="text-2xl text-green-600">ĐÃ THANH TOÁN ĐỦ</span> <br />
          </pre>
        </div>
      </div>
    </>
  );
}

export default App;
