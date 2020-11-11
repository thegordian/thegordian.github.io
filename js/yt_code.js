
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var philosophy_player;
var philosophy_player_modal;


function onYouTubeIframeAPIReady() {
    philosophy_player = new YT.Player('philosophy_player', {
        height: ($(window).width()*0.8)*0.56,
        width: $(window).width()*0.8,
        videoId: 'UHfpUinIdtA',
        playerVars: {
            rel: 0
        },
        events: {
            onReady: onReadyYT
        }
    });
    philosophy_player_modal = new YT.Player('philosophy_player_modal', {
        // height: $(window).height()-30,
        // width: ($(window).height()-30)*1.77,
        height: ($(window).width()*0.8)*0.56,
        width: $(window).width()*0.8,
        videoId: 'ZZTHoidPCP4',
        playerVars: {
            rel: 0
        },
        events: {
            onReady: onReadyYT_modal
        }
    });

    philosophy_player_modal_ph = new YT.Player('philosophyVideo_modal', {
        // height: $(window).height()-30,
        // width: ($(window).height()-30)*1.77,
        height: ($(window).width()*0.8)*0.56,
        width: $(window).width()*0.8,
        videoId: 'UHfpUinIdtA',
        playerVars: {
            rel: 0
        },
        events: {
            onReady: onReadyYT_modal_ph
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
                if(current_time < 113 || current_time > 118) {
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
    if(current_time >= 113) {
        // watch video toggle here
        $("#watch_video").removeClass("d-none");
    }
    if(current_time >= 118) {
        // try demo
        $("#try_demo").removeClass("d-none");
    }
}
