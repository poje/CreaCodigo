$(document).ready ( function () {
    
    var hub = $.connection.notificationHub;

    $.connection.hub.url = "https://test-senainfo2015.senainfo.cl:8084/signalr";

    var username = $('#hdIdUsuario').val();
    

    registerClientMethods(hub);
    // Start Hub

    $.connection.hub.start().done(function () {
        connectUser(hub, username);

        
    });
    

});

function connectUser(hub, username) {
    if (username.length > 0) {
        hub.server.connect(username);
    }
    else
        alert("Sin usuario");
}

function registerClientMethods(hub) {

    // Calls when user successfully logged in
    hub.client.onConnected = function (id, userName, allUsers, messages) {
        //alert("Conectado");
    }

    // On New User Connected
    hub.client.onNewUserConnected = function (id, name) {
        //alert("Nuevo usuario Conectado");
    }
    
    // On User Disconnected
    hub.client.onUserDisconnected = function (id, userName) {
    }

    // Funciones Broadcast 
    hub.client.messageReceived = function (userName, message) {
      
        document.getElementById("notification-wrapper").style.display = "inline";

        var notifyStr = $("#notification").text();
        if (notifyStr) {
            var notifyNumber = parseInt(notifyStr) + 1;
            $("#notification").text(notifyNumber.toString());
        } else {
            $("#notification").append("1");
        }
        
        $("#notification-ddl").append("<li><a href='#'> " + message + "</a></li>");

        // Mostrar Alerta con Alertify
        alertify.parent(document.body);
        alertify.alert(message);
    }

    hub.client.redirectTo = function (message) {
        alert(message);
        window.location.replace("https://www.senainfo.cl");
    }


    
}

