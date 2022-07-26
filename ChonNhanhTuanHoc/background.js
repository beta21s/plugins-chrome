function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}
chrome.browserAction.onClicked.addListener(function() {
    var tuongUngVoi = 35;
    var batDau = prompt("Tuần bắt đầu", "36");
    if (batDau == null || batDau == "" || !isNumeric(batDau)) {
        return;
    }
    var ketThuc = prompt("Tuần kết thúc", "");
    if (ketThuc == null || ketThuc == "" || !isNumeric(ketThuc)) {
        return;
    }
    alert();
    // for(i = batDau; i <= ketThuc; i++){
    //     $('.tuan').each(function()
    //     {
    //         var giaTri = $(this).val();
    //         if(isNumeric(giaTri)){
    //             if(parseInt(i) === (parseInt($(this).val()) + tuongUngVoi)){
    //                 $(this).prop('checked', 'checked');
    //             }
    //         }
    //     });
    // } 
    var tenLop = document.getElementById("#loailop-dialog").innerHTML;
    alert(tenLop);
    if(tenLop === "Lý thuyết"){
        document.getElementById("#soSV-dialog").value = 80;
    }else{
        document.getElementById("#soSV-dialog").value = 45;
    }
});