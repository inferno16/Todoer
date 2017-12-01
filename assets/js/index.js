function createBar(container, settings) {
    var bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 6,
    color: '#C0FFFF',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 4400,
    svgStyle: null,
    text: {
        value: '',
        alignToBottom: false
    },
    from: {color: '#22A8A7'},
    to: {color: '#5090B2'},
    // Set default step function for all animate calls
    step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
        var value = Math.round(bar.value() * 100);
        if (value === 0) {
        bar.setText('');
        } else {
        bar.setText(value + "%");
        }

        bar.text.style.color = state.color;
    }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '4rem';

    bar.animate(settings.to);  // Number from 0.0 to 1.0
}

function createCircle(container, settings) {
    var bar = new ProgressBar.Circle(container, {
    color: '#22A8A7',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 5,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1000,
    text: {
        autoStyleContainer: false
    },
    from: { color: '#22A8A7', width: 5 },
    to: { color: '#22A8A7', width: 5 },
    // Set default step function for all animate calls
    step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
        circle.setText(Math.round(circleSettings.to * 100));

    }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '5rem';

    bar.animate(1.0);  // Number from 0.0 to 1.0
}

let barSettings = {
    to: 0.7
}
createBar("#all-completed-tasks", { to: 0.7});
createBar("#all-not-completed-tasks", {to: 0.2});
createBar("#all-not-started-tasks", {to: 0.1});


let circleSettings = {
    to: 0.1,
    fromColor:"",
    toColor:""
};
createCircle("#current-completed-tasks", circleSettings);
circleSettings.to = 0.3;
createCircle("#current-not-completed-tasks", circleSettings);
createCircle("#current-not-started-tasks", circleSettings);