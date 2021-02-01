// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('enrichment_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {sid:null, name:null, type:null};
            info.sid = document.getElementById('sid_insert').value;
            info.name = document.getElementById('name_insert').value;
            info.type = document.getElementById('type_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/enrichment_insert?sid=' + info.sid + '&name=' + info.name + '&type=' + info.type, true);
            req.send(null)
            
            // error and success handling
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Exhibit Added"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
              }});
              location.reload();
        });

});

// search query
document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('search').addEventListener('click', function(event){
            event.preventDefault()
            var req = new XMLHttpRequest();

            // get search query from form
            var terms = document.getElementById('terms').value;

            // make get request
            req.open('GET', 'http://localhost:9380/enrichment_search?terms=' + terms, true);
            req.send(null);

            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log('Search Proceeded');

                    var response = JSON.parse(req.responseText);

                    // clears out the table
                    var tbody = document.getElementById('tbody');
                    while (tbody.firstChild) {
                        tbody.removeChild(tbody.firstChild);
                    }

                    document.getElementById('message').textContent = ''
                    
                    if (response.results[0] == undefined) {
                        document.getElementById('message').textContent = 'Sorry, no results could be found for that search term';
                    }

                    // for every row
                    for (var i=0; i < response.results.length; i++) {
                        var row = document.createElement('tr');
                        tbody.appendChild(row);
                        
                        // input enid
                        var enid = document.createElement('td');
                        enid.textContent = response.results[i].enid;
                        row.appendChild(enid)

                        // input sid
                        var sid = document.createElement('td');
                        sid.textContent = response.results[i].sid;
                        row.appendChild(sid)

                        // inputs the name
                        var name = document.createElement('td');
                        name.textContent = response.results[i].name;
                        row.appendChild(name)

                        //inputs the type
                        var type = document.createElement('td');
                        type.textContent = response.results[i].type;
                        row.appendChild(type)

                        // makes the update button
                        var update_column = document.createElement('td');
                        update_column.className = 'button';
                        row.appendChild(update_column);
                        var update_button = document.createElement('button');
                        update_button.className = 'update_button';
                        update_button.textContent = 'Update';
                        update_column.appendChild(update_button);

                        // makes the delete button
                        var delete_column = document.createElement('td');
                        delete_column.className = 'button';
                        row.appendChild(delete_column);
                        var delete_button = document.createElement('button');
                        delete_button.className = 'delete_button';
                        delete_button.textContent = 'Delete';
                        delete_column.appendChild(delete_button);
                    }

                } else {
                    console.log("Error in network request: " + req.statusText);
                }
            });
        });
    });

// sets up update and delete queries
document.addEventListener('DOMContentLoaded', function() {

    var check = document.getElementById('show_names');
    checkbox(check);
    
    table = document.getElementById('tbody');
    table.onclick = function(event) {
        event.preventDefault();
        let target = event.target;
        if (target.className == "delete_button") {
            info = {entity:null, id_name:null, id:null}
            info.entity = document.getElementById('title').innerText;
            info.id_name = document.getElementById('id_name').innerText;
            info.id = target.parentNode.parentNode.children[0].innerText;
            deleteQuery(info);
            var delete_row = target.parentNode.parentNode;
            delete_row.parentNode.removeChild(delete_row);
        }
        if (target.className == "update_button") {

            if (check.checked) {
                document.getElementById('message').textContent = 'You cannot edit while viewing full names'
            }
            else {
                // removes the last update boxes if they exist
                if (document.getElementById('enid_update')) {
                    var old_sid = document.getElementById('sid_update')
                    old_sid.parentElement.textContent = old_sid.value;
                    var old_name = document.getElementById('name_update')
                    old_name.parentElement.textContent = old_name.value;
                    var old_type = document.getElementById('type_update')
                    old_type.parentElement.textContent = old_type.value;
                    document.getElementById('enid_update').id = "";
                    // deletes the submit button and makes a new one
                    var old_submit = document.getElementById('submit_button');
                    var parent = old_submit.parentElement;
                    parent.removeChild(old_submit);
                    var new_update = document.createElement('button');
                    new_update.className = 'update_button';
                    new_update.textContent = 'Update';
                    parent.appendChild(new_update);
                }

                var row = target.parentNode.parentNode;

                // adds an id to the enid cell
                var enid_update = row.children[0];
                enid_update.id = 'enid_update';

                // for the sid cell
                var sid_update = document.createElement('input');
                sid_update.type = 'number';
                sid_update.id = 'sid_update';
                sid_update.value = row.children[1].textContent;
                row.children[1].textContent = '';
                row.children[1].appendChild(sid_update);

                // for the name cell
                var name_update = document.createElement('input');
                name_update.type = 'text';
                name_update.id = 'name_update';
                name_update.value = row.children[2].textContent;
                row.children[2].textContent = '';
                row.children[2].appendChild(name_update);

                // for the type cell
                var type_update = document.createElement('select');
                type_update.id = 'type_update';
                type_update.value = row.children[3].textContent;
                row.children[3].textContent = '';
                row.children[3].appendChild(type_update);
                var list = ['Food','Tactile','Structural','Sensory'];
                for (var i=0; i < list.length; i++) {
                    var option = document.createElement('option');
                    option.value = list[i];
                    option.textContent = list[i];
                    type_update.appendChild(option);
                }

                // creates a new submit button
                var submit = document.createElement('button');
                submit.id = 'submit_button';
                submit.textContent = 'Submit';
                target.parentNode.appendChild(submit);
                target.parentNode.removeChild(target);
                submit.addEventListener('click', updateQuery);

            }
        }
    }
});

updateQuery = function() {
    var req = new XMLHttpRequest();

    // pulls the info from the form
    var info = {enid:null,name:null,type:null};
    info.enid = document.getElementById('enid_update').textContent;
    info.sid = document.getElementById('sid_update').value;
    info.name = document.getElementById('name_update').value;
    info.type = document.getElementById('type_update').value;

    req.open('GET', 'http://localhost:9380/enrichment_update?enid=' + info.enid + '&sid=' + info.sid +  '&name=' + info.name + '&type=' + info.type, true);
    req.send(null);

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log( info.name + " Updated"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
        location.reload();
    }

    );
}

checkbox = function(check){
    check = document.getElementById("show_names");
    check.onclick = function(event) {
        if (check.checked) {
            var req = new XMLHttpRequest();
            req.open('GET', 'http://localhost:9380/species_enrichment', true);
            req.send(null);
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log( "Table Updated"); //Success message

                    var response = JSON.parse(req.responseText);
                    var table = document.getElementById('tbody');
                    document.getElementById('sid_name').textContent = 'species'
                    
                    for (var i=0; i < response.results.length; i++) {

                        var sid = response.results[i].sid;
                        var name = response.results[i].name;

                        for (var j=0; j < table.children.length; j++) {
                            if (table.children[j].children[1].textContent == sid){
                                table.children[j].children[1].textContent = name;
                            }
                        }
                    }

                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
                }
            });
        }
        else if (!check.checked) {
            location.reload();
        }
    }
}