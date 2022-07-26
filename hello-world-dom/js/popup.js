function titleCase(str) {
  var str = str.toString();
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

chrome.tabs.query({ active: true }, function (tabs) {
  var tab = tabs[0];

  // Hiện thị họ tên
  chrome.tabs.executeScript(tab.id, {
    code: 'document.getElementById("vision-full-name").innerHTML'
  }, function (results) {
    document.getElementById("HoTen").value = titleCase(results);
  });

  // Hiện thị CMND
  chrome.tabs.executeScript(tab.id, {
    code: 'document.getElementById("vision-id").innerHTML'
  }, function (results) {
    document.getElementById("CMND").value = results;
  });

  // Ngày sinh
  chrome.tabs.executeScript(tab.id, {
    code: 'document.getElementById("vision-birthday").innerHTML'
  }, function (results) {
    results = results.toString();
    document.getElementById("NgaySinh").value = results.split("/").reverse().join("-");
  });

  // Địa chỉ
  chrome.tabs.executeScript(tab.id, {
    code: 'document.getElementById("vision-address").innerHTML'
  }, function (results) {
    var results = results.toString();
    var data = results.split(",");
    document.getElementById("DiaChi").value = titleCase(data[data.length - 1]);
  });

  // Thêm sư kiện cho button
  document.getElementById("luuThongTin").addEventListener("click", function () {
    var data = {
      "HoTen": document.getElementById("HoTen").value,
      "CMND": document.getElementById("CMND").value,
      "NgaySinh": document.getElementById("NgaySinh").value,
      "HoTen": document.getElementById("HoTen").value,
      "GioiTinh": document.getElementById("Nam").checked == true ? "Nam" : "Nữ",
      "DiaChi": document.getElementById("DiaChi").value,
      "MSSV": document.getElementById("MSSV").value,
      "HocPhi": document.getElementById("TrungTam").checked == true ? 250000 : 500000,
      "MaBienLai": document.getElementById("MaBienLai").value
    }
    // Lưu thông tin
    chrome.storage.sync.get(["storageCI"], function (items) {
      var CMND = document.getElementById("CMND").value;
      var tmpArray = [];
      if (items["storageCI"]) {
        tmpArray = JSON.parse(items["storageCI"]);
      }

      for (i = 0; i < tmpArray.length; i++) {
        if (tmpArray[i].CMND == CMND) {
          document.getElementById("ThongBao").style.color = "red";
          document.getElementById("ThongBao").innerHTML = "Thông tin học viên đã tồn tại.";
          return;
        }
      }

      tmpArray.push(data);

      // Lưu thông tin mới
      chrome.storage.sync.set({ "storageCI": JSON.stringify(tmpArray) }, function () {
        document.getElementById("ThongBao").style.color = "blue";
        document.getElementById("ThongBao").innerHTML = "Thao tác thành công.";
      });
    });
  });

  // Xóa dữ liệu thành công
  document.getElementById("xoaThongTin").addEventListener("click", function () {
    chrome.storage.sync.set({ "storageCI": JSON.stringify([]) }, function () {
    });
  });

  // Lấy danh sach
  document.getElementById("loadDanhSach").addEventListener("click", function () {
    chrome.storage.sync.get(["storageCI"], function (items) {
      var tmpArray = JSON.parse(items["storageCI"]);
      var tmpHTML = "";
      for (i = 0; i < tmpArray.length; i++) {
        tmpHTML += "<tr>";
        tmpHTML += "<td>" + (i + 1) + "</td>";
        tmpHTML += "<td>" + tmpArray[i].CMND + "</td>";
        tmpHTML += "<td>" + tmpArray[i].HoTen + "</td>";
        tmpHTML += "<td>" + tmpArray[i].NgaySinh + "</td>";
        tmpHTML += "<td>" + tmpArray[i].GioiTinh + "</td>";
        tmpHTML += "<td>" + tmpArray[i].DiaChi + "</td>";
        tmpHTML += "<td>" + tmpArray[i].MSSV + "</td>";
        tmpHTML += "<td>" + tmpArray[i].HocPhi + "</td>";
        tmpHTML += "<td>" + tmpArray[i].MaBienLai + "</td>";
        tmpHTML += "<td><button class='btn btn-danger btn-sm'>Xóa</button></td>";
        tmpHTML += "</tr>";
      }
      document.getElementById("tableData").innerHTML = tmpHTML;
    });
  });

  // Xuất Excel
  document.getElementById("xuatExcel").addEventListener("click", function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><?xml version="1.0" encoding="UTF-8" standalone="yes"?><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
    table = document.getElementById("pztable");
    $('#toExcel').html($(table).html());
    $('#toExcel').find("thead > tr > th:last-child").remove();
    $('#toExcel').find("tbody > tr > td:last-child").remove();
    var toExcel = $('#toExcel').html();
    var ctx = {
        worksheet: name || '',
        table: toExcel
    };
    $('#toExcel').remove();
    window.open(uri + base64(format(template, ctx)));
  });
});