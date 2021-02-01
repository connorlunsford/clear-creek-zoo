// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('employee_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {jid:null, fname:null, lname:null, salary:null};
            info.jid = document.getElementById('jid_insert').value;
            info.fname = document.getElementById('fname_insert').value;
            info.lname = document.getElementById('lname_insert').value;
            info.salary = document.getElementById('salary_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/employee_insert?jid=' + info.jid + '&fname=' + info.fname + 
            '&lname=' + info.lname + '&salary=' + info.salary, true);
            req.send(null)
            
            // error and success handling
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Employee Added"); //Success message
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
            req.open('GET', 'http://localhost:9380/employee_search?terms=' + terms, true);
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
                        
                        // input emid
                        var emid = document.createElement('td');
                        emid.textContent = response.results[i].emid;
                        row.appendChild(emid)

                        // inputs the jid
                        var jid = document.createElement('td');
                        jid.textContent = response.results[i].jid;
                        row.appendChild(jid)

                        //inputs the fname
                        var fname = document.createElement('td');
                        fname.textContent = response.results[i].fname;
                        row.appendChild(fname)
                        
                        //inputs the lname
                        var lname = document.createElement('td');
                        lname.textContent = response.results[i].lname;
                        row.appendChild(lname)

                        //inputs the salary
                        var salary = document.createElement('td');
                        salary.textContent = response.results[i].salary;
                        row.appendChild(salary)

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

            // removes the last update boxes if they exist
            if (document.getElementById('emid_update')) {
                var old_jid = document.getElementById('jid_update')
                old_jid.parentElement.textContent = old_jid.value;
                var old_fname = document.getElementById('fjid_update')
                old_fname.parentElement.textContent = old_fname.value;
                var old_lname = document.getElementById('ljid_update')
                old_lname.parentElement.textContent = old_lname.value;
                var salary = document.getElementById('salary_update')
                old_salary.parentElement.textContent = old_salary.value;
                document.getElementById('emid_update').id = "";
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
            
            // adds an id to the exid cell
            var emid_update = row.children[0];
            emid_update.id = 'emid_update';

            // for the jid
            var jid_update = document.createElement('input');
            jid_update.type = 'text';
            jid_update.id = 'jid_update';
            jid_update.value = row.children[1].textContent;
            row.children[1].textContent = '';
            row.children[1].appendChild(jid_update);

            // for the fname
            var fname_update = document.createElement('input');
            fname_update.type = 'text';
            fname_update.id = 'fname_update';
            fname_update.value = row.children[2].textContent;
            row.children[2].textContent = '';
            row.children[2].appendChild(fname_update);

            // for the lname
            var lname_update = document.createElement('input');
            lname_update.type = 'text';
            lname_update.id = 'lname_update';
            lname_update.value = row.children[3].textContent;
            row.children[3].textContent = '';
            row.children[3].appendChild(lname_update);

            // for the salary
            var salary_update = document.createElement('input');
            salary_update.type = 'text';
            salary_update.id = 'salary_update';
            salary_update.value = row.children[4].textContent;
            row.children[4].textContent = '';
            row.children[4].appendChild(salary_update);

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
    var info = {exid:null,name:null,biome:null};
    info.emid = document.getElementById('emid_update').textContent;
    info.jid = document.getElementById('jid_update').value;
    info.fname = document.getElementById('fname_update').value;
    info.lname = document.getElementById('lname_update').value;
    info.salary = document.getElementById('salary_update').value;

    req.open('GET', 'http://localhost:9380/employee_update?jid=' + info.jid + '&fname=' + info.fname + 
    '&lname=' + info.lname + '&salary=' + info.salary + '&emid=' + info.emid, true);
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
            var req = new XMLHttpRequest();
            req.open('GET', 'http://localhost:9380/employee_job', true);
            req.send(null);
            
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log( "Table Updated"); //Success message

                    var response = JSON.parse(req.responseText);
                    var table = document.getElementById('tbody');
                    document.getElementById('jid_name').textContent = 'title'
                    
                    for (var i=0; i < response.results.length; i++) {

                        var jid = response.results[i].jid;
                        var title = response.results[i].title;

                        for (var j=0; j < table.children.length; j++) {
                            if (table.children[j].children[1].textContent == jid){
                                table.children[j].children[1].textContent = title;
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