chrome.browserAction.onClicked.addListener(function() {
    alert('');
    $('.chkWeeks').each(function()
    {
        $(this).prop('checked', 'checked');
    });
});