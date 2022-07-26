function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

chrome.runtime.onMessage.addListener((request, port, sendResponse) => {
    var thoiGian  = prompt("Nhập tuần", "");
    
    // Reset checkbox
    $('.chkWeeks').each(function() { $(this).prop('checked', ''); });
    if (thoiGian == null || thoiGian == "") {
        $('.chkWeeks').each(function()
        {
            $(this).prop('checked', 'checked');
        });
        setTimeout(
            function() 
            {
                $('#dsGV-pop option')[1].selected = true;
            }, 500
        );
        return;
	}
	var tmp = thoiGian.split(" ");
	thoiGian = "";
	for(i = 0; i < tmp.length; i++){ thoiGian += tmp[i] + "-"; } 
	tmp = thoiGian.split("-");
    for(i = 0; i < tmp.length; i++){
        var giaTri = tmp[i].trim();
		if(isNumeric(giaTri)){
            $('.chkWeeks').each(function()
            {
                var tag = $(this).val();
				if(isNumeric(tag)){
					if( parseInt(giaTri) == (parseInt(tag) + 35)){
						$(this).prop('checked', 'checked');
					}
				}
            });
        }
    } 
    setTimeout(
        function() 
        {
            $('#dsGV-pop option')[1].selected = true;
        }, 500
    );
});