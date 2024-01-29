function NhanVien(
  taiKhoan,
  hoTen,
  email,
  matKhau,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLamTrongThang
) {
  this.taiKhoan = taiKhoan;
  this.hoTen = hoTen;
  this.email = email;
  this.matKhau = matKhau;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLamTrongThang = gioLamTrongThang;

  this.tongLuong = 0;
  this.xepLoai = "";
  this.tinhTongLuong = function () {
    var kq = 0;
    var luongCBInt = parseFloat(this.luongCoBan);
    if (this.chucVu === "Sếp") {
      kq = luongCBInt * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      kq = luongCBInt * 2;
    } else if (this.chucVu === "Nhân viên") {
      kq = luongCBInt * 1.5;
    } else {
      kq = "Không tính được!";
    }
    return kq;
  };

  this.tongLuong = this.tinhTongLuong();

  this.xepLoaiNhanVien = function () {
    var kq = "";
    var gioLamTrongThangInt = parseInt(this.gioLamTrongThang);
    if (this.chucVu === "Nhân viên") {
      if (gioLamTrongThangInt >= 192) {
        kq = "Nhân viên xuất sắc";
      } else if (gioLamTrongThangInt >= 176) {
        kq = "Nhân viên giỏi";
      } else if (gioLamTrongThangInt >= 160) {
        kq = "Nhân viên khá";
      } else {
        kq = "Nhân viên trung bình";
      }
    } else {
      kq = "Chỉ áp dụng xếp loại cho nhân viên";
    }
    return kq;
  };

  this.xepLoai = this.xepLoaiNhanVien();
}
