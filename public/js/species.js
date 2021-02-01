// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('species_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {name:null, diet:null, habitat:null};
            info.name = document.getElementById('name_insert').value;
            info.diet = document.getElementById('diet_insert').value;
            info.habitat = document.getElementById('habitat_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/species_insert?name=' + info.name + '&diet=' + info.diet + '&habitat=' + info.habitat, true);
            req.send(null)
            
            // error and success handling
            req.addEventListener('load', function(){
                if(req.status >= 200 && req.status <= 400){
                    console.log("Species Added"); //Success message
                } else {
                    console.log("Error in network request: " + req.statusText); //Error message
                }
                location.reload();
            });
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
            req.open('GET', 'http://localhost:9380/species_search?terms=' + terms, true);
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
                        
                        // input sid
                        var sid = document.createElement('td');
                        sid.textContent = response.results[i].sid;
                        row.appendChild(sid)

                        // inputs the name
                        var name = document.createElement('td');
                        name.textContent = response.results[i].name;
                        row.appendChild(name)

                        //inputs the diet
                        var diet = document.createElement('td');
                        diet.textContent = response.results[i].diet;
                        row.appendChild(diet)

                        //inputs the habitat
                        var habitat = document.createElement('td');
                        habitat.textContent = response.results[i].habitat;
                        row.appendChild(habitat)

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
                location.reload();
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
            if (document.getElementById('sid_update')) {
                var old_name = document.getElementById('name_update')
                old_name.parentElement.textContent = old_name.value;
                var old_diet = document.getElementById('diet_update')
                old_diet.parentElement.textContent = old_diet.value;
                var old_habitat = document.getElementById('habitat_update')
                old_habitat.parentElement.textContent = old_habitat.value;
                document.getElementById('sid_update').id = "";
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
            
            // adds an id to the sid cell
            var sid_update = row.children[0];
            sid_update.id = 'sid_update';

            // for the name cell
            var name_update = document.createElement('input');
            name_update.type = 'text';
            name_update.id = 'name_update';
            name_update.value = row.children[1].textContent;
            row.children[1].textContent = '';
            row.children[1].appendChild(name_update);

            // for the diet cell
            var diet_update = document.createElement('select');
            diet_update.id = 'diet_update';
            diet_update.value = row.children[2].textContent;
            row.children[2].textContent = '';
            row.children[2].appendChild(diet_update);
            var list = ['Carnivore','Omnivore','Herbivore'];
            for (var i=0; i < list.length; i++) {
                var option = document.createElement('option');
                option.value = list[i];
                option.textContent = list[i];
                diet_update.appendChild(option);
            }

            // for the habitat cell
            var habitat_update = document.createElement('select');
            habitat_update.id = 'habitat_update';
            habitat_update.value = row.children[2].textContent;
            row.children[3].textContent = '';
            row.children[3].appendChild(habitat_update);
            var list = ['Arctic','Savannah','Rainforest','Grassland','Wetland','Desert'];
            for (var i=0; i < list.length; i++) {
                var option = document.createElement('option');
                option.value = list[i];
                option.textContent = list[i];
                habitat_update.appendChild(option);
            }

            // creates a new submit button
            var submit = document.createElement('button');
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
    var info = {sid:null,name:null,diet:null,habitat:null};
    info.sid = document.getElementById('sid_update').textContent;
    info.name = document.getElementById('name_update').value;
    info.diet = document.getElementById('diet_update').value;
    info.habitat = document.getElementById('habitat_update').value;

    req.open('GET', 'http://localhost:9380/species_update?sid=' + info.sid + '&name=' + info.name + '&diet=' + info.diet + '&habitat=' + info.habitat, true);
    req.send(null)

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log( info.name + " Updated"); //Success message
            location.reload();
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
    }

    );
}