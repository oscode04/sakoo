// checkup/presenter/CheckupPresenter.js

import CheckupModel from "./CheckupModel";
import Swal from "sweetalert2";

const CheckupPresenter = (formData, setFormData) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    if (CheckupModel.pengeluaranFields.includes(name)) {
      updatedData.pengeluaran =
        CheckupModel.calculateTotalPengeluaran(updatedData);
    }

    setFormData(updatedData);
  };

  const handleNumericBlur = (name, inputValue) => {
    const numericValue = inputValue.replace(/\D/g, "");
    const updatedFormData = {
      ...formData,
      [name]: numericValue,
    };

    if (CheckupModel.pengeluaranFields.includes(name)) {
      updatedFormData.pengeluaran =
        CheckupModel.calculateTotalPengeluaran(updatedFormData);
    }

    setFormData(updatedFormData);
    return numericValue;
  };

  return { handleChange, handleNumericBlur };
};

export default CheckupPresenter;
