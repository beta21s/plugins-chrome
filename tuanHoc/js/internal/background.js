function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

chrome.runtime.onMessage.addListener((request, port, sendResponse) => {
	var thoiGian  = prompt("Nhập tuần", "");
    if (thoiGian == null || thoiGian == "") {
        return;
	}
	$('.tuan').each(function()
	{
		$(this).prop('checked', '');
	});
	var tmp = thoiGian.split(" ");
	thoiGian = "";
	for(i = 0; i < tmp.length; i++){ thoiGian += tmp[i] + "-"; } 
	tmp = thoiGian.split("-");
    for(i = 0; i < tmp.length; i++){
		var giaTri = tmp[i].trim();
		if(isNumeric(giaTri)){
			$('.tuan').each(function()
			{
				var tag = $(this).val();
				if(isNumeric(tag)){
					if( parseInt(giaTri) == (parseInt(tag) + 35)){
						$(this).prop('checked', 'checked');
					}
				}
				console.log(giaTri + " | " + (parseInt(tag) + 35) +  "| " + (giaTri == (parseInt(tag) + 35)));
			});
		} 
    } 
    if($('#loailop-dialog').text().trim() === "Lý thuyết"){
        $('#soSV-dialog').val('80');
    }else{
        $('#soSV-dialog').val('45');
    }
});