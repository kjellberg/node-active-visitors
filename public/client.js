var socket = io();

socket.on('activeVisitors', function(number){
	var elems = document.getElementsByTagName('*'), i;
    for (i in elems) {
        if((' ' + elems[i].className + ' ').indexOf(' activeVisitors ')
                > -1) {
            elems[i].innerHTML = number;
        }
    }
});