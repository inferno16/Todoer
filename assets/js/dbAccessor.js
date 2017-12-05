var dbAccessor = (function () {
    let serverUrl = ' http://localhost:3000';
    let tasksUrl = `${serverUrl}/tasks`;
    let usersUrl = `${serverUrl}/users`;

    function getTasks() {
        return $.ajax({
            url: `${tasksUrl}?isDeleted=false`,
            contentType: 'application/json'
        });
    }

    function editTask(data) {
        return $.ajax({
            method: 'PATCH',
            url: `${tasksUrl}/${data.id}`,
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    function removeTask(data) {
        return $.ajax({
            method: 'PATCH',
            url: `${tasksUrl}/${data.id}`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    }

    function addTask(data) {
        return $.ajax({
            method: 'POST',
            url: tasksUrl,
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    function changeTaskStatus(data) {
        return $.ajax({
            method: 'PATCH',
            url: `${tasksUrl}/${data.id}`,
            data: JSON.stringify(data),
            contentType: 'application/json'
        });
    }

    function getUsers() {
        return $.ajax({
            url: usersUrl,
            contentType: 'application/json'
        });
    }

    function addUser(data) {
        return $.ajax({
            method: 'POST',
            url: usersUrl,
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    function getUser(id) {
        return $.ajax({
            url: `${usersUrl}/${id}`,
            contentType: 'application/json'
        });
    }

    function getUserByUsername(username) {
        return $.ajax({
            url: `${usersUrl}?username=${username}`,
            contentType: 'application/json'
        });
    }

    return {
        getTasks: getTasks,
        editTask: editTask,
        removeTask: removeTask,
        changeTaskStatus: changeTaskStatus,
        addTask: addTask,
        getUsers: getUsers,
        getUser: getUser,
        addUser: addUser,
        getUserByUsername: getUserByUsername
    }
})()