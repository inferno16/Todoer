var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

var defaultColor;
var hoverColor = "#5090B2";

function GetHexColor(color) {
    if(color.indexOf('#') != -1) return color;

    color = color
                .replace("rgba", "")
                .replace("rgb", "")
                .replace("(", "")
                .replace(")", "");
    color = color.split(",");

    return  "#"
            + ('0' + parseInt(color[0], 10).toString(16)).slice(-2)
            + ('0' + parseInt(color[1], 10).toString(16)).slice(-2)
            + ('0' + parseInt(color[2], 10).toString(16)).slice(-2);
}

$(document).ready(function() {
    $(".inputWithIcon input")
        .focus(function() {
            var icon = $(this).siblings("i");
            var currentColor = GetHexColor($(icon).css("color"))
            if(currentColor != hoverColor) {
                defaultColor = currentColor;
                $(icon).css("color", hoverColor);
            }
        })
        .focusout(function() {
            var icon = $(this).siblings("i");
            $(icon).css("color", defaultColor);
        });
});

function DisplayError(field, error) {
    if($.isArray(field)) {
        $.each(field, function(index, value){$("[name='"+value+"']").siblings("i").css('color', 'red');});
    }
    else if(field != ''){
        $("[name='"+field+"']").siblings("i").css('color', 'red');
    }
    $('#error').text(error);
}

$('#registration-form').submit(function(e){
    e.preventDefault();
    var data = $('#registration-form').serializeArray().reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    $.each(data, function(index, value){ $("[name='"+index+"']").siblings("i").css('color', ''); });
    $('#error').text('');
    var error = false;
    $.each(data, function(index, value){
        if(index != 'phone' && value.match(/^\s*$/)) {
            $("[name='"+index+"']").siblings("i").css('color', 'red');
            error = true;
        }
    });
    if(!error) {
        if(data['password'] != data['password2']) {
            DisplayError(['password','password2'], 'Passwords does not match!');
        }
        else if(data['password'].length < 6) {
            DisplayError(['password','password2'], 'Password must be at least 6 symbols!');
        }
        else {
            dbAccessor.getUserByUsername(data['username']).done(function(user){
                user = user[0];
                if(user != undefined) {
                    DisplayError('username', 'Username already exists!');
                }
                else {
                    delete data['password2'];
                    data['password'] = Base64.encode(data['password']);
                    data['userPhoto'] = "https://png.icons8.com/account/ultraviolet/25/000000";
                    dbAccessor.addUser(data);
                    location.href = 'login.html';
                }
            });
        }
    }
    else { DisplayError('', 'Please fill all requered fields!'); }
});

$('#login-form').submit(function(e){
    e.preventDefault();
    var data = $('#login-form').serializeArray().reduce(function(obj, item){
        obj[item.name] = item.value;
        return obj;
    }, {});
    $.each(data, function(index, value){ $("[name='"+index+"']").siblings("i").css('color', ''); });
    $('#error').text('');
    var error = false;
    $.each(data, function(index, value){
        if(value.match(/^\s*$/)) {
            $("[name='"+index+"']").siblings("i").css('color', 'red');
            error = true;
        }
    });
    if(!error) {
        dbAccessor.getUserByUsername(data['username']).done(function(user) {
            user = user[0];
            if(user === undefined) {
                DisplayError('username', 'Username not found!');
            }
            else if(user.password != Base64.encode(data['password'])) {
                DisplayError('password', 'Invalid password!');
            }
            else {
                if(typeof(Storage) === 'undefined') {
                    DisplayError('', 'It looks like your browser does not support sessionStorage. Please use a different browser.');
                }
                else {
                    $.each(user, function(key, value){
                        if(key != 'password') {
                            sessionStorage.setItem(key, value);
                        }
                    });
                    $(location).attr('href', 'index.html');
                }
            }
        });
    }
    else { DisplayError('', 'Please fill all fields!'); }
});