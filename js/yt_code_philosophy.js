
// var tag = document.createElement('script');
//
// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var philosophy_player_modal_ph;


function onReadyYT_modal_ph() {
    philosophy_player_modal_ph.addEventListener('onStateChange', youtube_video_toggled_modal_ph);
}
var check_video_seek_interval = null;
function youtube_video_toggled_modal_ph(e) {
    try {
        if (e.data === YT.PlayerState.PLAYING) {
            // console.log(philosophy_player_modal_ph.getDuration());
            check_video_seek_interval = setInterval(check_video_seek_modal_ph, 1000);
        } else {
            if(check_video_seek_interval) {
                clearInterval(check_video_seek_interval);
                check_video_seek_interval = null;
                if(current_time < 113 || current_time > 118) {
                    $(".floating_btns_on_yt_video_modal_ph").addClass("d-none");
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
var current_time = 0;
function check_video_seek_modal_ph() {
    current_time = philosophy_player_modal_ph.getCurrentTime();
    if(current_time >= 113) {
        // watch video toggle here
        $("#philosophy_watch_video_modal").removeClass("d-none");
    }
    if(current_time >= 118) {
        // try demo
        $("#philosophy_try_demo_modal").removeClass("d-none");
    }
}
