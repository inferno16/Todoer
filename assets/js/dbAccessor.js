var dbAccessor = (function(){
    let serverUrl = ' http://localhost:3000';
    let tasksUrl = `${serverUrl}/tasks`;
    let usersUrl = `${serverUrl}/users`;

    function getTasks() {
        return $.ajax({
            url: tasksUrl,
            contentType: 'application/json'
        });
    }

    function editTask(data) {
         return $.ajax({
            method: 'PATCH',
            url: tasksUrl + `/${data.id}`,
            contentType: 'application/json',
            data: JSON.stringify(data),
            dataType: 'json'
        });
    }

    function removeTask(id) {
         return $.ajax({
            method: 'DELETE',
            url: tasksUrl + `/${id}`,
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

    return {
        getTasks: getTasks,
        editTask: editTask,
        removeTask: removeTask,
        addTask: addTask,
        getUsers: getUsers,
        addUser: addUser
    }
})()