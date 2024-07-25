var DSSV = [];

var data = localStorage.getItem("DSSV_JSON");

var svArr = JSON.parse(data);
console.log("before ", DSSV);
console.log("before ", svArr);

for (var i = 0; i < svArr.length; i++) {
  var data = svArr[i];
  var sv = new SinhVien(
    data.ma,
    data.ten,
    data.email,
    data.matKhau,
    data.diemToan,
    data.diemLy,
    data.diemHoa
  );
  DSSV.push(sv);
}
console.log("after", DSSV);

renderDSSV();
function renderDSSV() {

  var contentHTML = "";
  for (var index = 0; index < DSSV.length; index++) {
    var sv = DSSV[index];
    var trString = `<tr>
                          <td>${sv.ma}</td>
                          <td>${DSSV[index].ten}</td>
                          <td>${sv.email}</td>
                          <td>${sv.tinhDTB()}</td>
                          <td>
                                <button
                                onclick="xoaSv('${sv.ma}')"
                                class="btn btn-danger">Xoá</button>
                                <button
                                onclick="suaSv('${sv.ma}')"
                                class="btn btn-warning">Sửa</button>
                          </td>
                      </tr>`;
    contentHTML = contentHTML + trString;
  }
  document.getElementById("tbodySinhVien").innerHTML = contentHTML;
}

function themSv() {
  var sv = layThongTinTuForm();
  
  var isValid =
    kiemTraRong(sv.ma, "spanMaSV") &
    kiemTraEmail(sv.email) &
    kiemTraTrung(sv.ma, DSSV);

  if (isValid) {
    DSSV.push(sv);
    // convert array to string
    var jsonDSSV = JSON.stringify(DSSV);
    console.log("🚀[index.js:34]: DSSV: ", DSSV);
    // lưu vào local storage
    localStorage.setItem("DSSV_JSON", jsonDSSV);
    renderDSSV();
  }
}

// tìm vị trí => findIndex
// splice(vị trí, số lượng phần tử cần xóa)
function xoaSv(maSv) {

  var viTri = -1;
  for (i = 0; i < DSSV.length; i++) {
    if (DSSV[i].ma == maSv) {
      viTri = i;
    }
  }
  if (viTri != -1) {
    // tìm thấy sinh viên cần xóa
    DSSV.splice(viTri, 1);
    // lưu data sau khi xóa vào local storage
    
    //  cập nhật lại giao diện
    renderDSSV();
  }
}

function suaSv(maSv) {
  var viTri = DSSV.findIndex(function (item) {
    return item.ma == maSv;
  });
  if (viTri != -1) {
    var sv = DSSV[viTri];
    document.getElementById("txtMaSV").value = sv.ma;
    document.getElementById("txtTenSV").value = sv.ten;
    document.getElementById("txtEmail").value = sv.email;
    document.getElementById("txtPass").value = sv.matKhau;
    document.getElementById("txtDiemToan").value = sv.diemToan;
    document.getElementById("txtDiemLy").value = sv.diemLy;
    document.getElementById("txtDiemHoa").value = sv.diemHoa;
    document.getElementById("txtMaSV").setAttribute("readonly", true);
  }
}
function capNhatSv() {
  var sv = layThongTinTuForm();
  var viTri = DSSV.findIndex(function (item) {
    return item.ma == sv.ma;
  });
  DSSV[viTri] = sv;
  renderDSSV();
}

var colors = ["red", "blue", "green"];

var value = "dark blue";

colors[1] = value;