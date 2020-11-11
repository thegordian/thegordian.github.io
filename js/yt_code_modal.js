
// var tag = document.createElement('script');
//
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var philosophy_player_modal;


function onReadyYT_modal() {
    philosophy_player_modal.addEventListener('onStateChange', youtube_video_toggled_modal);
}
var check_video_seek_interval = null;
function youtube_video_toggled_modal(e) {
    try {
        if (e.data === YT.PlayerState.PLAYING) {
            // console.log(philosophy_player_modal.getDuration());
            check_video_seek_interval = setInterval(check_video_seek_modal, 1000);
        } else {
            if(check_video_seek_interval) {
                clearInterval(check_video_seek_interval);
                check_video_seek_interval = null;
                if(current_time < 145 || current_time > 155) {
                    $(".floating_btns_on_yt_video_modal").addClass("d-none");
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
var current_time = 0;
function check_video_seek_modal() {
    current_time = philosophy_player_modal.getCurrentTime();
    if(current_time >= 145) {
        // watch video toggle here
        $("#watch_video_modal").removeClass("d-none");
    }
    if(current_time >= 152) {
        // try demo
        $("#try_demo_modal").removeClass("d-none");
    }
}
