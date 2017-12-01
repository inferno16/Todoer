var dbAccessor = (function(){
    let serverUrl = ' http://localhost:3000';
    let tasksUrl = `${serverUrl}/tasks`;

    function getTasks() {
        return $.ajax({
            url: tasksUrl,
            contentType: 'application/json'
        });
    }

    return {
        getTasks: getTasks
    }
})()