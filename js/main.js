function getElement(id) {
  return document.getElementById(id);
}

//tạo 1 đối tượng list nhân viên chứa tất cả các nhân viên và phương thức của nhân viên
var dsnv = new DSNV();
var validation = new Validation();

getLocalStorage();

function getInfo() {
  var taiKhoan = getElement("tknv").value;
  var hoTen = getElement("name").value;
  var email = getElement("email").value;
  var matKhau = getElement("password").value;
  var ngayLam = getElement("datepicker").value;
  var luongCoBan = getElement("luongCB").value;
  var gioLamTrongThang = getElement("gioLam").value;
  var selectElement = getElement("chucvu");
  var selectedIndex = selectElement.selectedIndex;
  var chucVu = selectElement.options[selectedIndex].value;

  // tạo 1 dối tượng nhân viên mới
  // lưu ý: tạo đối tượng sau khi lấy để tránh trường hợp undefined
  var nhanVien = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLamTrongThang
  );

  return nhanVien;
}

function check() {
  var nhanVien = getInfo();
  var isValid = true;

  //Input tài khoản
  isValid &=
    validation.kiemTraRong(
      nhanVien.taiKhoan,
      "tbTKNV",
      "Tên tài khoản không được để trống!"
    ) &&
    validation.kiemTraDoDaiMatKhau(
      nhanVien.taiKhoan,
      "tbTKNV",
      "Tài khoản chỉ tối đa từ 4 -> 6 ký tự!",
      4,
      6
    );

  //Input họ và tên
  isValid &=
    validation.kiemTraRong(
      nhanVien.hoTen,
      "tbTen",
      "Tên nhân viên không được để trống!"
    ) &&
    validation.kiemTraTenNhanVien(
      nhanVien.hoTen,
      "tbTen",
      "Tên nhân viên không được chứa ký tự số!"
    );

  //Input Email
  isValid &=
    validation.kiemTraRong(
      nhanVien.email,
      "tbEmail",
      "Email không được để trống!"
    ) &&
    validation.kiemTraDinhDangEmail(
      nhanVien.email,
      "tbEmail",
      "Email không đúng định dạng!"
    );

  //Input mật khẩu
  isValid &=
    validation.kiemTraRong(
      nhanVien.matKhau,
      "tbMatKhau",
      "Mật khẩu không được để trống!"
    ) &&
    validation.kiemTraDoDaiMatKhau(
      nhanVien.matKhau,
      "tbMatKhau",
      "Mật khẩu phải từ 6 - 10 ký tự!",
      6,
      10
    ) &&
    validation.kiemTraMatKhau(
      nhanVien.matKhau,
      "tbMatKhau",
      "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt!"
    );

  //input lương
  isValid &=
    validation.kiemTraRong(
      nhanVien.luongCoBan,
      "tbLuongCB",
      "Lương cơ bản không được để trống!"
    ) &&
    validation.kiemTraLuong(
      nhanVien.luongCoBan,
      "tbLuongCB",
      "Lương cơ bản phải từ 1.000.000 -> 20.000.000",
      1000000,
      20000000
    ) &&
    validation.kiemTraSo(
      nhanVien.luongCoBan,
      "tbLuongCB",
      "Lương cơ bản chỉ có thể chứa các ký tự số!"
    );

  //input chức vụ
  isValid &= validation.kiemTraChucVu(
    nhanVien.chucVu,
    "tbChucVu",
    "Vui lòng chọn chức vụ!"
  );

  isValid &=
    validation.kiemTraRong(
      nhanVien.gioLamTrongThang,
      "tbGiolam",
      "Giờ làm trong tháng không được để trống!"
    ) &&
    validation.kiemTraGioLam(
      nhanVien.gioLamTrongThang,
      "tbGiolam",
      "Giờ làm việc trong tháng phải nằm khoảng 80 - 200 giờ",
      80,
      200
    ) &&
    validation.kiemTraSo(
      nhanVien.gioLamTrongThang,
      "tbGiolam",
      "Giờ làm trong tháng chỉ có thể chứa các ký tự số!"
    );

  return isValid;
}

function render() {
  var content = "";
  for (var i = 0; i < dsnv.listNV.length; i++) {
    var nhanVien = dsnv.listNV[i];
    content += `
    <tr>
      <td>${nhanVien.taiKhoan} </td>
      <td>${nhanVien.hoTen} </td>
      <td>${nhanVien.email} </td>
      <td>${nhanVien.ngayLam} </td>
      <td>${nhanVien.chucVu} </td>
      <td>${nhanVien.tongLuong.toLocaleString()} </td>
      <td>${nhanVien.xepLoai} </td>
      <td>
        <button type="button" class="btn btn-success mb-3" data-toggle="modal" data-target="#myModal" onClick="editNV('${
          nhanVien.taiKhoan
        }')">Sửa</button>
        <button type="button" class="btn btn-danger" onClick="xoaNV('${
          nhanVien.taiKhoan
        }')">Xóa</button>

      </td>
    </tr>
    `;
  }
  getElement("tableDanhSach").innerHTML = content;
}

getElement("btnThemNV").onclick = function () {
  var nhanVien = getInfo();
  var flag = check();
  var kq = dsnv.timTaiKhoanNhanVien(nhanVien.taiKhoan);

  if (kq) {
    alert("Tên tài khoản đã được sử dụng. Vui lòng chọn tên khác!");
  }

  if (flag && !kq) {
    dsnv.themNhanVien(nhanVien);
    setLocalStorage();
    render();
  }
};

function editNV(taiKhoan) {
  var index = dsnv.timViTriNhanVien(taiKhoan);

  getElement("tknv").value = dsnv.listNV[index].taiKhoan;
  getElement("name").value = dsnv.listNV[index].hoTen;
  getElement("email").value = dsnv.listNV[index].email;
  getElement("password").value = dsnv.listNV[index].matKhau;
  getElement("datepicker").value = dsnv.listNV[index].ngayLam;
  getElement("luongCB").value = dsnv.listNV[index].luongCoBan;
  getElement("gioLam").value = dsnv.listNV[index].gioLamTrongThang;
  getElement("chucvu").value = dsnv.listNV[index].chucVu;

  getElement("tknv").disabled = true;
  getElement("btnThemNV").style.display = "none";
  getElement("btnReset").style.display = "none";
  getElement("btnCapNhat").style.display = "inline-block";
}

function xoaNV(taiKhoan) {
  console.log("Button Xóa Clicked!");

  dsnv.xoaNhanVien(taiKhoan);

  render();

  setLocalStorage();
}

getElement("btnThem").onclick = function () {
  getElement("tknv").disabled = false;
  getElement("btnCapNhat").style.display = "none";
  getElement("btnReset").style.display = "inline-block";
  getElement("btnReset").onclick = function () {
    getElement("btnThemNV").style.display = "inline-block";
    document.getElementById("formInfo").reset();
    getElement("tknv").disabled = false;
  };
};

// reset form
getElement("btnReset").onclick = function () {
  getElement("formInfo").reset();
};

getElement("btnCapNhat").onclick = function () {
  // lấy ra tên để đi kiếm trong mảng listNV
  var taikhoan = getElement("tknv").value;
  var index = dsnv.timViTriNhanVien(taikhoan);

  var newNhanVien = getInfo();
  console.log(newNhanVien);
  var flag = check();
  if (flag) {
    if (index !== -1) {
      dsnv.listNV[index] = newNhanVien;
      render();
      setLocalStorage();
    }
  }
};

function capNhatNhanVien(taiKhoan) {
  var index = dsnv.timViTriNhanVien(taiKhoan);
  console.log(index);
  if (index !== -1) {
    dsnv.listNV[index] = newNhanVien;
    render();
    setLocalStorage();
  }
}

// lưu data ở localstorage
function setLocalStorage() {
  //b1: chuyển data về dạng string
  var dtString = JSON.stringify(dsnv.listNV);

  //b2: Lưu vào storage
  localStorage.setItem("dsnv", dtString);
}

// getLocalStorage();
function getLocalStorage() {
  // b1: lấy data dưới local storage
  var data = localStorage.getItem("dsnv");
  // b2: parse data về dữ liệu ban đầu
  if (data !== null) {
    var dataParse = JSON.parse(data);
    // hiển thị danh sánh nhân viên đã lưu ra UI
    dsnv.listNV = dataParse;
    render();
  }
}

getElement("btnTimNV").onclick = function () {
  var selectElement = getElement("xepLoai");
  var selectedIndex = selectElement.selectedIndex;
  var xepLoai = selectElement.options[selectedIndex].value;

  getElement("hienThiDanhSachNhanVien").style.display = "inline-block";
  var content = "";
  for (var i = 0; i < dsnv.listNV.length; i++) {
    if (dsnv.listNV[i].xepLoai === xepLoai) {
      content += `
      <tr>
        <td>${dsnv.listNV[i].taiKhoan} </td>
        <td>${dsnv.listNV[i].hoTen} </td>
        <td>${dsnv.listNV[i].email} </td>
        <td>${dsnv.listNV[i].ngayLam} </td>
        <td>${dsnv.listNV[i].chucVu} </td>
        <td>${dsnv.listNV[i].tongLuong.toLocaleString()} </td>
        <td>${dsnv.listNV[i].xepLoai} </td>
        <td>
          <button type="button" class="btn btn-success mb-3" data-toggle="modal" data-target="#myModal" onClick="editNV('${
            dsnv.listNV[i].taiKhoan
          }')">Sửa</button>
          <button type="button" class="btn btn-danger" onClick="xoaNV('${
            dsnv.listNV[i].taiKhoan
          }')">Xóa</button>
  
        </td>
      </tr>
      `;
    }
  }
  getElement("tableDanhSach").innerHTML = content;
};

getElement("hienThiDanhSachNhanVien").onclick = function () {
  render();
  getElement("hienThiDanhSachNhanVien").style.display = "none";
};
