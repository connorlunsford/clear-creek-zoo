// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('animal_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {sid:null, exid:null, name:null, sex:null, age:null};
            info.sid = document.getElementById('sid_insert').value;
            info.exid = document.getElementById('exid_insert').value;
            info.name = document.getElementById('name_insert').value;
            info.sex = document.getElementById('sex_insert').value;
            info.age = document.getElementById('age_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/animal_insert?sid=' + info.sid + '&exid=' + info.exid + '&name=' + info.name
            + '&sex=' + info.sex + '&age=' + info.age, true);
            req.send(null);
            
            // error and success handling
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Animal Added"); //Success message
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
            req.open('GET', 'http://localhost:9380/Animal_search?terms=' + terms, true);
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

                    document.getElementById('message').textContent = '';
                    
                    if (response.results[0] == undefined) {
                        document.getElementById('message').textContent = 'Sorry, no results could be found for that search term';
                    }

                    // for every row
                    for (var i=0; i < response.results.length; i++) {
                        var row = document.createElement('tr');
                        tbody.appendChild(row);

                        // input aid
                        var aid = document.createElement('td');
                        aid.textContent = response.results[i].aid;
                        row.appendChild(aid);

                        // input sid
                        var sid = document.createElement('td');
                        sid.textContent = response.results[i].sid;
                        row.appendChild(sid);

                        // input exid
                        var exid = document.createElement('td');
                        exid.textContent = response.results[i].exid;
                        row.appendChild(exid);

                        // inputs the name
                        var name = document.createElement('td');
                        name.textContent = response.results[i].name;
                        row.appendChild(name);

                        //inputs the sex
                        var sex = document.createElement('td');
                        sex.textContent = response.results[i].sex;
                        row.appendChild(sex);
                        
                        //inputs the age
                        var age = document.createElement('td');
                        age.textContent = response.results[i].age;
                        row.appendChild(age);

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

// sets up the checkbox, and update/delete queries
document.addEventListener('DOMContentLoaded', function() {

    var check = document.getElementById('show_names');
    checkbox(check);
    
    table = document.getElementById('tbody');
    table.onclick = function(event) {
        event.preventDefault();
        let target = event.target;
        if (target.className == "delete_button") {
            info = {entity:null, id_name:null, id:null};
            info.entity = document.getElementById('title').innerText;
            info.id_name = document.getElementById('id_name').innerText;
            info.id = target.parentNode.parentNode.children[0].innerText;
            deleteQuery(info);
            var delete_row = target.parentNode.parentNode;
            delete_row.parentNode.removeChild(delete_row);
        }
        if (target.className == "update_button") {

            // removes the last update boxes if they exist
            if (document.getElementById('aid_update')) {
                var old_sid = document.getElementById('sid_update');
                old_sid.parentElement.textContent = old_sid.value;
                var old_exid = document.getElementById('exid_update');
                old_exid.parentElement.textContent = old_exid.value;
                var old_name = document.getElementById('name_update');
                old_name.parentElement.textContent = old_name.value;
                var old_sex = document.getElementById('sex_update');
                old_sex.parentElement.textContent = old_sex.value;
                var old_age = document.getElementById('age_update');
                old_age.parentElement.textContent = old_age.value;
                document.getElementById('aid_update').id = "";
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
            
            // adds an id to the aid cell
            var aid_update = row.children[0];
            aid_update.id = 'aid_update';

            // for the sid cell
            var sid_update = document.createElement('input');
            sid_update.type = 'number';
            sid_update.id = 'sid_update';
            sid_update.value = row.children[1].textContent;
            row.children[1].textContent = '';
            row.children[1].appendChild(sid_update);
            
            // for the exid cell
            var exid_update = document.createElement('input');
            exid_update.type = 'number';
            exid_update.id = 'exid_update';
            exid_update.value = row.children[2].textContent;
            row.children[2].textContent = '';
            row.children[2].appendChild(exid_update);

            // for the name cell
            var name_update = document.createElement('input');
            name_update.type = 'text';
            name_update.id = 'name_update';
            name_update.value = row.children[3].textContent;
            row.children[3].textContent = '';
            row.children[3].appendChild(name_update);

            // for the sex cell
            var sex_update = document.createElement('select');
            sex_update.id = 'sex_update';
            sex_update.value = row.children[4].textContent;
            row.children[4].textContent = '';
            row.children[4].appendChild(sex_update);
            var list = ['Male','Female'];
            for (var i=0; i < list.length; i++) {
                var option = document.createElement('option');
                option.value = list[i];
                option.textContent = list[i];
                sex_update.appendChild(option);
            }

            // for the age cell
            var age_update = document.createElement('input');
            age_update.type = 'number';
            age_update.id = 'age_update';
            age_update.value = row.children[5].textContent;
            row.children[5].textContent = '';
            row.children[5].appendChild(age_update);

            // creates a new submit button
            var submit = document.createElement('button');
            submit.id = 'submit_button';
            submit.textContent = 'Submit';
            target.parentNode.appendChild(submit);
            target.parentNode.removeChild(target);
            submit.addEventListener('click', updateQuery);

        }
    }
});

updateQuery = function() {
    var req = new XMLHttpRequest();

    // pulls the info from the form
    var info = {sid:null, exid:null, name:null, sex:null, age:null};
    info.sid = document.getElementById('sid_update').textContent;
    info.exid = document.getElementById('exid_update').textContent;
    info.name = document.getElementById('name_update').value;
    info.sex = document.getElementById('sex_update').value;
    info.age = document.getElementById('age_update').value;
    info.aid = document.getElementById('aid_update').textContent;

    req.open('GET', 'http://localhost:9380/animal_update?sid=' + info.sid + '&exid=' + info.exid + '&name=' + info.name
    + '&esex=' + info.sex + '&age=' + info.age + '&aid=' + info.aid, true);
    req.send(null)

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
            var spec_req = new XMLHttpRequest();
            spec_req.open('GET', 'http://localhost:9380/animal_species', true);
            spec_req.send(null);
            
            spec_req.addEventListener('load', function(){
                if(spec_req.status >= 200 && spec_req.status <= 400){
                    console.log( "Table Updated"); //Success message

                    var spec_response = JSON.parse(spec_req.responseText);
                    var table = document.getElementById('tbody');
                    document.getElementById('sid_name').textContent = 'species';
                    
                    for (var i=0; i < spec_response.results.length; i++) {

                        var sid = spec_response.results[i].sid;
                        var name = spec_response.results[i].name;

                        for (var j=0; j < table.children.length; j++) {
                            if (table.children[j].children[1].textContent == sid){
                                table.children[j].children[1].textContent = name;
                            }
                        }
                    }

                } else {
                    console.log("Error in network spec_request: " + spec_req.statusText); //Error message
                }
            });

            var ex_req = new XMLHttpRequest();
            ex_req.open('GET', 'http://localhost:9380/animal_exhibit', true);
            ex_req.send(null);
            
            ex_req.addEventListener('load', function(){
                if(ex_req.status >= 200 && ex_req.status <= 400){
                    console.log( "Table Updated"); //Success message

                    var ex_response = JSON.parse(ex_req.responseText);
                    var table = document.getElementById('tbody');
                    document.getElementById('exid_name').textContent = 'exhibit';
                    
                    for (var i=0; i < ex_response.results.length; i++) {

                        var exid = ex_response.results[i].exid;
                        var name = ex_response.results[i].name;

                        for (var j=0; j < table.children.length; j++) {
                            if (table.children[j].children[2].textContent == exid){
                                table.children[j].children[2].textContent = name;
                            }
                        }
                    }

                } else {
                    console.log("Error in network ex_request: " + ex_req.statusText); //Error message
                }
            });

        }
        else if (!check.checked) {
            location.reload();
        }
    }
}