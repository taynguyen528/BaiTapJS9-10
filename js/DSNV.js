function DSNV() {
  this.listNV = [];

  this.themNhanVien = function (NhanVien) {
    this.listNV.push(NhanVien);
  };

  this.timViTriNhanVien = function (taiKhoan) {
    var index = -1;
    for (var i = 0; i < this.listNV.length; i++) {
      if (taiKhoan === this.listNV[i].taiKhoan) {
        index = i;
        break;
      }
    }
    return index;
  };

  this.timTaiKhoanNhanVien = function (tk) {
    for (var i = 0; i < dsnv.listNV.length; i++) {
      if (this.listNV[i].taiKhoan === tk) {
        return true;
      }
    }
    return false;
  };

  this.xoaNhanVien = function (taiKhoan) {
    var index = this.timViTriNhanVien(taiKhoan);

    if (index !== -1) {
      this.listNV.splice(index, 1);
    }
  };
}
