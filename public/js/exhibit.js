// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('exhibit_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {name:null, biome:null};
            info.name = document.getElementById('name_insert').value;
            info.biome = document.getElementById('biome_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/exhibit_insert?name=' + info.name + '&biome=' + info.biome, true);
            req.send(null);
            
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
            event.preventDefault();
            var req = new XMLHttpRequest();

            // get search query from form
            var terms = document.getElementById('terms').value;

            // make get request
            req.open('GET', 'http://localhost:9380/exhibit_search?terms=' + terms, true);
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
                        
                        // input exid
                        var exid = document.createElement('td');
                        exid.textContent = response.results[i].exid;
                        row.appendChild(exid);

                        // inputs the name
                        var name = document.createElement('td');
                        name.textContent = response.results[i].name;
                        row.appendChild(name);

                        //inputs the biome
                        var biome = document.createElement('td');
                        biome.textContent = response.results[i].biome;
                        row.appendChild(biome);

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
            if (document.getElementById('exid_update')) {
                var old_name = document.getElementById('name_update');
                old_name.parentElement.textContent = old_name.value;
                var old_biome = document.getElementById('biome_update');
                old_biome.parentElement.textContent = old_biome.value;
                document.getElementById('exid_update').id = "";
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
            var exid_update = row.children[0];
            exid_update.id = 'exid_update';

            // for the name cell
            var name_update = document.createElement('input');
            name_update.type = 'text';
            name_update.id = 'name_update';
            name_update.value = row.children[1].textContent;
            row.children[1].textContent = '';
            row.children[1].appendChild(name_update);

            // for the biome cell
            var biome_update = document.createElement('select');
            biome_update.id = 'biome_update';
            biome_update.value = row.children[2].textContent;
            row.children[2].textContent = '';
            row.children[2].appendChild(biome_update);
            var list = ['Rainforest','Arctic','Savannah','Wetland','Grassland','Desert','Forest','Climate Controlled'];
            for (var i=0; i < list.length; i++) {
                var option = document.createElement('option');
                option.value = list[i];
                option.textContent = list[i];
                biome_update.appendChild(option);
            }

            // creates a new submit button
            var submit = document.createElement('button');
            submit.id = 'submit_button';
            submit.textContent = 'Submit';
            target.parentNode.appendChild(submit);
            target.parentNode.removeChild(target);
            submit.addEventListener('click', updateQuery);
        }
        if (target.className == 'detail_button') {
            var exid = target.parentNode.parentNode.children[0].textContent;
            detailQuery(exid);
        }
    }
});

updateQuery = function() {
    var req = new XMLHttpRequest();

    // pulls the info from the form
    var info = {exid:null,name:null,biome:null};
    info.exid = document.getElementById('exid_update').textContent;
    info.name = document.getElementById('name_update').value;
    info.biome = document.getElementById('biome_update').value;

    req.open('GET', 'http://localhost:9380/exhibit_update?exid=' + info.exid + '&name=' + info.name + '&biome=' + info.biome, true);
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

detailQuery = function(exid) {

    // clears out the table
    var tbody = document.getElementById('tbody');
    while (tbody.firstElementChild) {
        if (tbody.firstElementChild.firstElementChild.innerText == exid) {
            var store = tbody.firstElementChild;
        }
        tbody.removeChild(tbody.firstElementChild);
    }
    store.removeChild(store.children[3]);
    tbody.parentNode.firstElementChild.firstElementChild.removeChild(tbody.parentNode.firstElementChild.firstElementChild.children[3]);
    tbody.appendChild(store);

    // creates a new table for the incoming enrichment info

    var enrich_div = document.getElementById('enrichment_table');
    enrich_div.appendChild(document.createElement('h2'));
    enrich_div.firstElementChild.textContent = 'Enrichment for ' + tbody.firstElementChild.children[1].textContent;

    t1 = document.createElement('table');
    t1.appendChild(document.createElement('thead'));
    t1.firstElementChild.appendChild(document.createElement('tr'));
    var headers = ['enid','sid','name','type',''];
    for (var i=0; i < headers.length; i++) {
        t1.firstElementChild.firstElementChild.appendChild(document.createElement('th'));
        t1.firstElementChild.firstElementChild.children[i].textContent = headers[i];
        t1.firstElementChild.firstElementChild.children[i].id_name = 'enr_' + headers[i];
    }

    var tcontent1 = document.createElement('tbody');
    t1.appendChild(tcontent1);

    var enr_req = new XMLHttpRequest();
    enr_req.open('GET', 'http://localhost:9380/exhibit_enrichment_details?exid=' + exid, true);
    enr_req.send(null);

    enr_req.addEventListener('load', function(){
        if(enr_req.status >= 200 && enr_req.status <= 400){
            console.log('Detail view for ' + exid); //Success message
            
            var response = JSON.parse(enr_req.responseText);

            // for every row
            for (var i=0; i < response.results.length; i++) {

                //creates the row
                var row = document.createElement('tr');
                tcontent1.appendChild(row);

                //creates the enid cell
                var enr_enid = document.createElement('td');
                enr_enid.textContent = response.results[i].enid;
                row.appendChild(enr_enid);

               //creates the sid cell
               var enr_sid = document.createElement('td');
               enr_sid.textContent = response.results[i].sid;
               row.appendChild(enr_sid);
               
                //creates the name cell
                var enr_name = document.createElement('td');
                enr_name.textContent = response.results[i].name;
                row.appendChild(enr_name);

                //creates the type cell
                var enr_type = document.createElement('td');
                enr_type.textContent = response.results[i].type;
                row.appendChild(enr_type);

                //creates the delete cell
                var enr_delete_cell = document.createElement('td');
                enr_delete_cell.className = 'button';
                var enr_delete_button = document.createElement('button');
                enr_delete_button.className = 'enr_delete_button';
                enr_delete_button.textContent = 'Delete';
                enr_delete_cell.appendChild(enr_delete_button);
                row.appendChild(enr_delete_cell);

                enr_delete_button.onclick = function(event) {
                    event.preventDefault();
                    let target = event.target;
                    if (target.className == "enr_delete_button") {
                        var info = {entity:null, id_name:null, id:null};
                        info.entity = 'Exhibit_Enrichment';
                        info.id_name = 'enid';
                        info.id = target.parentNode.parentNode.children[0].innerText;
                        deleteQuery(info);
                        var delete_row = enr_delete_button.parentNode.parentNode;
                        delete_row.parentNode.removeChild(delete_row);
                    }
                }

            }
        }
    });

    document.getElementById('enrichment_table').appendChild(t1);

    // generates the insert form for adding enrichment to this exhibit

    var enr_text = document.createElement('h2');
    enr_text.textContent = 'Add Enrichment for this Exhibit';
    enrich_div.appendChild(enr_text);

    var enr_form = document.createElement('form');
    var enr_label = document.createElement('label');
    enr_label.textContent = 'ENID:';
    enr_form.appendChild(enr_label);
    enr_form.appendChild(document.createElement('br'));
    var enr_input = document.createElement('input');
    enr_input.type = 'text';
    enr_input.id_name = 'enid_insert';
    enr_form.appendChild(enr_input);
    enr_form.appendChild(document.createElement('br'));
    var enr_submit = document.createElement('input');
    enr_submit.type = 'submit';
    enr_submit.id_name = 'enr_submit';
    enr_form.appendChild(enr_submit);

    enr_submit.addEventListener('click', function(event){
        var enr_insert_req = new XMLHttpRequest();

        // creates the information to send through the get request
        var info = {exid:null, enid:null};
        info.exid = exid;
        info.enid = enid_input.value;

        // sends get request
        enr_insert_req.open('GET', 'http://localhost:9380/exhibit_enrichment_insert?exid=' + info.exid + '&enid=' + info.enid, true);
        enr_insert_req.send(null);
        
        // error and success handling
        enr_insert_req.addEventListener('load', function(){
            if(enr_insert_req.status >= 200 && enr_insert_req.status <= 400){
                console.log("Enrichment Added to Exhibit"); //Success message
            } else {
                console.log("Error in network enr_insert_request: " + enr_insert_req.statusText); //Error message
          }});
          location.reload();
    });

    enrich_div.appendChild(enr_form);

    // creates a new table for the incoming employee info

    var employ_div = document.getElementById('employee_table');
    employ_div.appendChild(document.createElement('h2'));
    employ_div.firstElementChild.textContent = "Employee's for " + tbody.firstElementChild.children[1].textContent;

    t2 = document.createElement('table');
    t2.appendChild(document.createElement('thead'));
    t2.firstElementChild.appendChild(document.createElement('tr'));
    var headers = ['emid','jid','fname','lname',''];
    for (var i=0; i < headers.length; i++) {
        t2.firstElementChild.firstElementChild.appendChild(document.createElement('th'));
        t2.firstElementChild.firstElementChild.children[i].textContent = headers[i];
        t2.firstElementChild.firstElementChild.children[i].id_name = 'emp_' + headers[i];
    }

    var tcontent2 = document.createElement('tbody');
    t2.appendChild(tcontent2);

    var emp_req = new XMLHttpRequest();
    emp_req.open('GET', 'http://localhost:9380/exhibit_employee_details?exid=' + exid, true);
    emp_req.send(null);

    emp_req.addEventListener('load', function(){
        if(emp_req.status >= 200 && emp_req.status <= 400){
            console.log('Detail view for ' + exid); //Success message
            
            var response = JSON.parse(emp_req.responseText);

            // for every row
            for (var i=0; i < response.results.length; i++) {

                //creates the row
                var row = document.createElement('tr');
                tcontent2.appendChild(row);

                //creates the emid cell
                var emp_emid = document.createElement('td');
                emp_emid.textContent = response.results[i].emid;
                row.appendChild(emp_emid);

                //creates the jid cell
                var emp_jid = document.createElement('td');
                emp_jid.textContent = response.results[i].jid;
                row.appendChild(emp_jid);
                
                //creates the fname cell
                var emp_fname = document.createElement('td');
                emp_fname.textContent = response.results[i].fname;
                row.appendChild(emp_fname);

                //creates the lname cell
                var emp_lname = document.createElement('td');
                emp_lname.textContent = response.results[i].lname;
                row.appendChild(emp_lname);

                //creates the delete cell
                var emp_delete_cell = document.createElement('td');
                emp_delete_cell.className = 'button';
                var emp_delete_button = document.createElement('button');
                emp_delete_button.className = 'emp_delete_button';
                emp_delete_button.textContent = 'Delete';
                emp_delete_cell.appendChild(emp_delete_button);
                row.appendChild(emp_delete_cell);

                emp_delete_button.onclick = function(event) {
                    event.preventDefault();
                    let target = event.target;
                    if (target.className == "emp_delete_button") {
                        var info = {entity:null, id_name:null, id:null}
                        info.entity = 'Exhibit_Employee';
                        info.id_name = 'emid';
                        info.id = target.parentNode.parentNode.children[0].innerText;
                        deleteQuery(info);
                        var delete_row = emp_delete_button.parentNode.parentNode;
                        delete_row.parentNode.removeChild(delete_row);
                    }
                }

            }

        } else {
            console.log("Error in network emp_request: " + emp_req.statusText); //Error message
        }
    });

    document.getElementById('employee_table').appendChild(t2);

    // generates the insert form for adding employee to this exhibit

    var emp_text = document.createElement('h2');
    emp_text.textContent = "Add Employees to this Exhibit";
    employ_div.appendChild(emp_text);

    var emp_form = document.createElement('form');
    var emp_label = document.createElement('label');
    emp_label.textContent = 'EMID:';
    emp_form.appendChild(emp_label);
    emp_form.appendChild(document.createElement('br'));
    var emp_input = document.createElement('input');
    emp_input.type = 'text';
    emp_input.id_name = 'emid_insert';
    emp_form.appendChild(emp_input);
    emp_form.appendChild(document.createElement('br'));
    var emp_submit = document.createElement('input');
    emp_submit.type = 'submit';
    emp_submit.id_name = 'emp_submit';
    emp_form.appendChild(emp_submit);

    emp_submit.addEventListener('click', function(event){
        var emp_insert_req = new XMLHttpRequest();

        // creates the information to send through the get request
        var info = {exid:null, emid:null};
        info.exid = exid;
        info.emid = emp_input.value;

        // sends get request
        emp_insert_req.open('GET', 'http://localhost:9380/exhibit_employee_insert?exid=' + info.exid + '&emid=' + info.emid, true);
        emp_insert_req.send(null);
        
        // error and success handling
        emp_insert_req.addEventListener('load', function(){
            if(emp_insert_req.status >= 200 && emp_insert_req.status <= 400){
                console.log("Employee Added to Exhibit"); //Success message
            } else {
                console.log("Error in network emp_insert_request: " + emp_insert_req.statusText); //Error message
            }});
            location.reload();
    });

    employ_div.appendChild(emp_form);

    // removes the insert into exhibit table since you don't need it on the details page
    document.getElementById('insert_div').removeChild(document.getElementById('insert_table'));
    document.getElementById('insert_message').textContent = '';

}
