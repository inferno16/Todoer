$(document).ready(function(){
    $.get('nav.html', function(data){
        $('#nav-placeholder').replaceWith(data);
        if(sessionStorage.length > 0) {
            $('a[href="login.html"]')
                .text(sessionStorage.firstName+' '+sessionStorage.lastName)
                .attr('href', 'profile.html');

            $('a[href="register.html"]')
                .text('Logout')
                .attr('href', '#')
                .click(function(){
                    sessionStorage.clear();
                    $(location).attr('href', 'index.html');
                });
        }
    });
});
