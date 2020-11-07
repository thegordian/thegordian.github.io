var intro;
function startIntro(){
    intro = introJs();
    intro.setOptions({
        highlightClass: 'bg-half-dark',
        doneLabel: 'Finish',
        hidePrev: true,
        showProgress: true,
        exitOnOverlayClick: false,
        exitOnEsc: true,
        showBullets: false,
        showStepNumbers: true,
        disableInteraction: true,
        steps: [
            {
                intro: "The map shows the starts and densities of 500 movement traces.",
                position: 'bottom'
            },
            {
                element: document.querySelector('.'+geoJsonLayerSeg.getLayers()[4].options.className),
                intro: "Hover on a segment to see the number of movement traces that pass through the segment.",
                position: 'left'
            },
            {
                element: document.querySelector('.'+geoJsonLayerNode.getLayers()[14].options.className),
                intro: "Hover over a circle to see how many movement traces start from it.",
                position: 'bottom'
            },
            {
                element: '#slider-2',
                intro: 'Define a maximum acceptable distance to a hub.',
                position: 'right'
            },
            {
                element: document.querySelector('.'+geoJsonLayerSeg.getLayers()[4].options.className),
                intro: "Click a segment to select and deselect it.",
                position: 'left'
            },
            {
                element: '#filter_modal_toggle_btn',
                intro: 'When you are happy with your selection try your luck against Gordian by clicking the Evaluate and Optimize button.'
            },
            {
                element: '#eval_text',
                intro: 'This is the number of movement traces that your selection serves.'
            },
            {
                element: '#opt_text',
                intro: 'And this is the number of movement traces that the Gordian optimized selection serves.'
            },
            {
                element: '#modal_toggle_btn_animate_o',
                intro: 'Click here to see which trajectories are served by the segments.'
            },
            {
                element: '#exit_filter_modal_toggle_btn',
                intro: 'Finish'
            }
        ]
    }).onexit(function() {
        // setCookie('skip', 'yes', 5);
        if (trgSegment !== undefined) {
            resetHighlight({target: trgSegment});
        }
        if (trgCircle !== undefined) {
            resetHighlight_node({target: trgCircle});
        }
        if (trgAtFinish) {
            $('#exit_filter_modal_toggle_btn').click();
        }
        trgAtBorder = false;
    }).onchange(function(targetElement) {
        $('.introjs-skipbutton').off('click').on('click', function () {
            map.dragging.enable();
            setCookie('skip', 'yes', 5);
            $('#exit_filter_modal_toggle_btn').click();
        })
        trgAtFinish = false;
        if (this.currentStep() === 1) {
            trgSegment = geoJsonLayerSeg.getLayers()[4];
            highlightFeature({target: trgSegment});
            adjustToolBox()
        } else if (this.currentStep() === 2) {
            if (trgSegment !== undefined) {
                resetHighlight({target: trgSegment});
            }
            trgCircle = geoJsonLayerNode.getLayers()[14];
            highlightFeature_node({target: trgCircle})
        } else if (this.currentStep() === 3) {
            if (trgCircle !== undefined) {
                resetHighlight_node({target: trgCircle});
            }
            $( "#slider-2" ).slider( "value", 50 );
            setTimeout(function () {
                $( "#slider-2" ).slider( "value", 200 );
                $('#filter_slider').removeClass('introjs-fixParent');
            });
            setTimeout(function () {
                $( "#slider-2" ).slider( "value", 150 );
            },1000);
            setTimeout(function () {
                $( "#slider-2" ).slider( "value", 50 );
            },1500);

        } else if (this.currentStep() === 4) {
            trgSegment = geoJsonLayerSeg.getLayers()[4];
            clickFeature({target: trgSegment}, trgSegment.feature);
            adjustToolBox();
        } else if (this.currentStep() === 5) {
            setTimeout(function () {
                $('#filter_slider').removeClass('introjs-fixParent');
            });
            if (trgAtBorder) {
                $('#exit_filter_modal_toggle_btn').click();
                setTimeout(function () {
                    intro.exit();
                    intro.goToStep(6).start();
                }, 1000);
                trgAtBorder = false;
            }
        } else if (this.currentStep() === 6) {
            $('#filter_modal_toggle_btn').click();
            setTimeout(function () {
                $('#absolute-maps,.result-white-box').removeClass('introjs-fixParent');
                if (!trgfixStart){
                    trgfixStart = true;
                    intro.exit();
                    intro.goToStep(6).start();
                    trgAtBorder = true;
                }
            },1000);
            setTimeout(function () {
                $('#absolute-maps,.result-white-box').removeClass('introjs-fixParent');
            },1000);
        } else if (this.currentStep() === 7) {
            setTimeout(function () {
                $('#absolute-maps,.result-white-box').removeClass('introjs-fixParent');
            });
        } else if (this.currentStep() === 8) {
            setTimeout(function () {
                $('#absolute-maps,.result-white-box').removeClass('introjs-fixParent');
            });
        } else if (this.currentStep() === 9) {
            setTimeout(function () {
                $('#absolute-maps,.result-white-box').removeClass('introjs-fixParent');
            });
            $('#modal_toggle_btn_animate_o').click();
            trgAtFinish = true;
        }

        setTimeout(function () {
            $('.leaflet-zoom-animated').removeClass('introjs-fixParent');
        })


    });
    trgfixStart = false;
    trgAtBorder = false;
    trgAtFinish = false;
    map.setView([59.313932, 18.061776], 14);
    map.dragging.disable();
    intro.start();
    setTimeout(function () {
        $('.introjs-skipbutton').off('click').on('click', function () {
            map.dragging.enable();
            setCookie('skip', 'yes', 5);
            $('#exit_filter_modal_toggle_btn').click();
        })
    },1000);

}

function adjustToolBox() {
    setTimeout(function () {
        var pos = $('.'+geoJsonLayerSeg.getLayers()[4].options.className).position();
        $('.introjs-tooltipReferenceLayer').css('left', pos.left-50).css('top', pos.top + 100);
    });

}

var trgSegment;
var trgCircle;
var trgfixStart = false;
var trgAtBorder = false;
var trgAtFinish = false;
// if (getCookie('skip') !== 'yes') {
//     startIntro();
// }

function setCookie(cname, cvalue, exdays) {
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