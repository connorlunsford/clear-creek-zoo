deleteQuery = function(info) {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:9380/delete?entity=' + info.entity + '&id_name=' + info.id_name + '&id=' + info.id, true);
    req.send(null);

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log( info.entity + "Deleted"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
    }

    );
}