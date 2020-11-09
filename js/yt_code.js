var philosophy_player;

$(document).ready(function (){
    var checkYT = setInterval(function () {
        if(YT.loaded){
            clearInterval(checkYT);
            onYouTubeIframeAPIReady()
        }
    }, 500);
})

function onYouTubeIframeAPIReady() {
    philosophy_player = new YT.Player('philosophy_player', {
        height: '500',
        width: '100%',
        videoId: '9xiVsFo3qmo',
        playerVars: {
            rel: 0
        },
        events: {
            onReady: onReadyYT
        }
    });
}
function onReadyYT() {
    philosophy_player.addEventListener('onStateChange', youtube_video_toggled);
}
var check_video_seek_interval = null;
function youtube_video_toggled(e) {
    try {
        if (e.data === YT.PlayerState.PLAYING) {
            // console.log(philosophy_player.getDuration());
            check_video_seek_interval = setInterval(check_video_seek, 1000);
        } else {
            if(check_video_seek_interval) {
                clearInterval(check_video_seek_interval);
                check_video_seek_interval = null;
                if(current_time < 109.5 || current_time > 116) {
                    $(".floating_btns_on_yt_video").addClass("d-none");
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
var current_time = 0;
function check_video_seek() {
    current_time = philosophy_player.getCurrentTime();
    if(current_time >= 109.5) {
        // watch video toggle here
        $("#watch_video").removeClass("d-none");
    }
    if(current_time >= 116) {
        // try demo
        $("#try_demo").removeClass("d-none");
    }
}