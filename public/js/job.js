// insert query
document.addEventListener('DOMContentLoaded', function() {

        document.getElementById('job_insert').addEventListener('click', function(event){
            var req = new XMLHttpRequest();

            // creates the information to send through the get request
            var info = {title:null, biome:null};
            info.title = document.getElementById('title_insert').value;

            // sends get request
            req.open('GET', 'http://localhost:9380/job_insert?title=' + info.title, true);
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
            req.open('GET', 'http://localhost:9380/job_search?terms=' + terms, true);
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
                        
                        // input jid
                        var jid = document.createElement('td');
                        jid.textContent = response.results[i].jid;
                        row.appendChild(jid)

                        // inputs the title
                        var title = document.createElement('td');
                        title.textContent = response.results[i].title;
                        row.appendChild(title)

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
            info = {entity:null, id_title:null, id:null}
            info.entity = document.getElementById('title').innerText;
            info.id_name = document.getElementById('id_name').innerText;
            info.id = target.parentNode.parentNode.children[0].innerText;
            deleteQuery(info);
            var delete_row = target.parentNode.parentNode;
            delete_row.parentNode.removeChild(delete_row);
        }
        if (target.className == "update_button") {

            // removes the last update boxes if they exist
            if (document.getElementById('jid_update')) {
                var old_title = document.getElementById('title_update')
                old_title.parentElement.textContent = old_title.value;
                document.getElementById('jid_update').id = "";
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
            
            // adds an id to the jid cell
            var jid_update = row.children[0];
            jid_update.id = 'jid_update';

            // for the title cell
            var title_update = document.createElement('input');
            title_update.type = 'text';
            title_update.id = 'title_update';
            title_update.value = row.children[1].textContent;
            row.children[1].textContent = '';
            row.children[1].appendChild(title_update);

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
    var info = {jid:null,title:null};
    info.jid = document.getElementById('jid_update').textContent;
    info.title = document.getElementById('title_update').value;

    req.open('GET', 'http://localhost:9380/job_update?jid=' + info.jid + '&title=' + info.title, true);
    req.send(null)

    req.addEventListener('load', function(){
        if(req.status >= 200 && req.status <= 400){
            console.log( info.title + " Updated"); //Success message
        } else {
            console.log("Error in network request: " + req.statusText); //Error message
        }
        location.reload();
    }

    );
}