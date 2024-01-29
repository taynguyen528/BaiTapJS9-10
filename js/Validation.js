function Validation() {
  this.kiemTraRong = function (value, elementErrorID, messageError) {
    if (value === "") {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraTenNhanVien = function (value, elementErrorID, messageError) {
    var regex = /^[a-zA-ZÀ-Ỹà-ỹ\s']+$/u;


    if (!regex.test(value)) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraDinhDangEmail = function (value, elementErrorID, messageError) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(value)) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraMatKhau = function (value, elementErrorID, messageError) {
    var regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;
    if (!regex.test(value)) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraDoDaiMatKhau = function (
    value,
    elementErrorID,
    messageError,
    min,
    max
  ) {
    if (value.length < min || value.length > max) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraLuong = function (value, elementErrorID, messageError, min, max) {
    var val = value.toString();
    if (val < min || val > max) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraSo = function (value, elementErrorID, messageError) {
    var regex = /^\d+$/;

    if (!regex.test(value)) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraChucVu = function (value, elementErrorID, messageError) {
    if (value === "Chọn chức vụ") {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };

  this.kiemTraGioLam = function (
    value,
    elementErrorID,
    messageError,
    min,
    max
  ) {
    var val = value.toString();
    if (val < min || val > max) {
      getElement(elementErrorID).innerHTML = messageError;
      return false;
    }
    getElement(elementErrorID).innerHTML = "";
    return true;
  };
}
