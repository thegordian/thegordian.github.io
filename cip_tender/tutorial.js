var intro, trgSegment, trgSegment1;
function startIntro() {
    intro = introJs();
    intro.setOptions({
        highlightClass: 'bg-half-dark',
        doneLabel: 'Finish',
        hidePrev: true,
        hideNext:true,
        showProgress: true,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        showBullets: false,
        showStepNumbers: true,
        disableInteraction: false,
        steps: [
            {
                intro: "Transport flows from 10 million annual heavy freight transport routes.",
                position: 'right'
            },
            {
                intro: "Hover over a segment to see the transport work in millions of ton-kms (Mtkm)",
                position: 'right'
            },
            {
                element: '#trg-sidebar',
                intro: "Set the parameters (on-board vehicle battery size and charging power) for an electrification scenario, select a corridor or optimized infrastructure plan of a given size in kms, and hit 'Get results'",
                position: 'right'
            },
            {
                element: '#res-trg',
                intro: "Result Loading",
                position: 'right'
            },
            {
                element: '#map-anch',
                intro: "Hover over a segment to see the electrification effects (amount and percent of transport electrified) on the segment or show detailed overall statistics by hitting 'Show statistics' in the control menu.",
                position: 'right'
            }, {
                element: '#slider-tooltip',
                intro: "Use slider to adjust infrastructure rollout sequence",
                position: 'right'
            },
            {
                element: '#click-info',
                intro: 'Click the information icon, to learn more about the model that is centered around the transport energy demand that arises from the transport routes and takes into account individual vehicle weights and speeds and the road elevation profiles.',
                position: 'bottom'
            }
        ]
    }).onexit(function () {
        $('.introjs-skipbutton').off('click');
        $('#info_modal-1').modal("hide");
        if (trgSegment !== undefined) {
            resetHighlight({target: trgSegment});
        }
        if (trgSegment1 !== undefined) {
            resetHighlight({target: trgSegment1});
        }
        if (trgfixExit) {
            //$('#click-info').click();
        }
    }).onchange(function (targetElement) {


        if (this.currentStep() === 1){
            trgSegment = geoJsonLayerNetworkElectrified.getLayers()[379];
            highlightFeature({target: trgSegment});
        }else
        if (this.currentStep() === 2){

            $('#sidebar,#sidebar-content').addClass('open');
            if (!trgfixStart){
                setTimeout(function () {
                    trgfixStart = true;
                    intro.exit();
                    intro.goToStep(2).start();
                },500)
            }
        } else
        if (this.currentStep() === 3){
            $('#filter_modal_toggle_btn').click();
            $('#sidebar,#sidebar-content').addClass('open');
        } else
        if (this.currentStep() === 4) {
            var trgSegments = geoJsonLayerNetworkElectrified.getLayers().filter(function(ft){
                return geoJsonLayerNetworkSelected.getLayers()[5].feature.properties.gid === ft.feature.properties.gid;
            })
            if (trgSegments.length > 0) {
                trgSegment1 = trgSegments[0];
                highlightFeature({target: trgSegments[0]});
                // setTimeout(function () {
                //     resetHighlight({target: trgSegments[0]});
                // },7000)
            }
            $('#sidebar,#sidebar-content').removeClass('open');

        } else
        if (this.currentStep() === 5) {
            trgfixExit = true;
        }
        bindSkip();
    });

    map.dragging.disable();
    trgfixStart = false;
    trgfixExit = false;
    intro.start();
    bindSkip()
}
function bindSkip() {
    setTimeout(function () {
        $('.introjs-skipbutton').off('click').on('click', function () {
            map.dragging.enable();
            if (!trgfixExit){
                setCookie('skip', 'yes', 5);
            }
            $('#info_modal-1').modal("hide");
        })
    },1000);
}
var trgfixStart = false;
var trgfixExit = false;

function setCookie(cname, cvalue, exdays) {
    console.log("ok");
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
