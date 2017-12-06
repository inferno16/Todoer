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
        circle.setText(Math.round(settings.to * 100));

    }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '5rem';

    bar.animate(1.0);  // Number from 0.0 to 1.0
}

function initObjectsFromData(bar, circle, data) {
    $.each(data, function(key, value){
        circle[value.status].to += 0.01;
    });
    bar[0].to = circle[0].to * 100 / data.length;
    bar[1].to = circle[1].to * 100 / data.length;
    bar[2].to = circle[2].to * 100 / data.length;
}

function initializeStatistics() {
    var bar = [{to:0}, {to:0}, {to:0}];
    var circle = [{to:0}, {to:0}, {to:0}];
    
    if(sessionStorage.length > 0 && sessionStorage.id != undefined) {
        dbAccessor.getTasksByUser(sessionStorage.id).done(function(data){
            initObjectsFromData(bar, circle, data);
            
            createBar("#all-completed-tasks", bar[2]);
            createBar("#all-not-completed-tasks", bar[1]);
            createBar("#all-not-started-tasks", bar[0]);

            createCircle("#current-completed-tasks", circle[2]);
            createCircle("#current-not-completed-tasks", circle[1]);
            createCircle("#current-not-started-tasks", circle[0]);
        });
    }
    else {
        createBar("#all-completed-tasks", bar[0]);
        createBar("#all-not-completed-tasks", bar[1]);
        createBar("#all-not-started-tasks", bar[2]);

        createCircle("#current-completed-tasks", circle[0]);
        createCircle("#current-not-completed-tasks", circle[1]);
        createCircle("#current-not-started-tasks", circle[2]);
    }
}

initializeStatistics();