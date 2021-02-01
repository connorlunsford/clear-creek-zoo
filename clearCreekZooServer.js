var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 9380); //Site address: localhost:9380
app.use(express.static('public')); //Allows files from the public folder to be accessed

//------------------SELECT QUERIES-----------------------------------------

// EXHIBIT
app.get('/', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Exhibit;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Exhibit',context);
  });
});

// SPECIES
app.get('/species', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Species;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Species',context);
  });
});

// Animal
app.get('/animal', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Animal;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Animal',context);
  });
});

// ENRICHMENT
app.get('/enrichment', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Enrichment;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Enrichment',context);
  });
});

// EMPLOYEE
app.get('/employee', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Employee;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Employee',context);
  });
});

// JOB
app.get('/job', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM Job;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('Job',context);
  });
});

// SPECIES FOR ENRICHMENT
app.get('/species_enrichment', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT sid, name FROM Species;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

// SPECIES FOR ANIMAL
app.get('/animal_species', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT sid, name FROM Species;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

// EXHIBIT FOR ANIMAL
app.get('/animal_exhibit', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT exid, name FROM Exhibit;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

// ENRICHMENT FOR EXHIBIT DETAILS
app.get('/exhibit_enrichment_details', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT Enrichment.enid, Enrichment.sid, Enrichment.name, Enrichment.type FROM Exhibit \
  INNER JOIN Exhibit_Enrichment ON Exhibit.exid=Exhibit_Enrichment.exid INNER JOIN Enrichment \
  ON Exhibit_Enrichment.enid=Enrichment.enid WHERE Exhibit.exid=' + req.query.exid +';', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

// EMPLOYMEE FOR EXHIBIT DETAILS
app.get('/exhibit_employee_details', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT Employee.emid, Employee.jid, Employee.fname, Employee.lname FROM Exhibit \
  INNER JOIN Exhibit_Employee ON Exhibit.exid=Exhibit_Employee.exid INNER JOIN Employee \
  ON Exhibit_Employee.emid=Employee.emid WHERE Exhibit.exid=' + req.query.exid +';', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

// JOB FOR EMPLOYEE
app.get('/employee_job', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT jid, title FROM Job;', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//------------------SEARCH QUERIES-----------------------------------------

//EXHIBIT
app.get('/exhibit_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Exhibit WHERE name REGEXP '" + req.query.terms + "' OR biome REGEXP '" + req.query.terms + "';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//SPECIES
app.get('/species_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Species WHERE name REGEXP '" + req.query.terms + "' OR diet REGEXP '" + req.query.terms + "' OR habitat REGEXP '" + req.query.terms +"';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//ANIMAL
app.get('/animal_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Animal WHERE name REGEXP '" + req.query.terms + "';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//ENRICHMENT
app.get('/enrichment_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Enrichment WHERE name REGEXP '" + req.query.terms + "' OR type REGEXP '" + req.query.terms + "';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//EMPLOYEE
app.get('/employee_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Employee WHERE fname REGEXP '" + req.query.terms + "' OR lname REGEXP '" + req.query.terms + "';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//JOB
app.get('/job_search', function(req, res, next){
  var context = {};
  var full_query = "SELECT * FROM Job WHERE title REGEXP '" + req.query.terms + "';";
  mysql.pool.query(full_query, function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.send(context);
  });
});

//------------------INSERT QUERIES-----------------------------------------

// EXHIBIT
app.get('/exhibit_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Exhibit(`name`,`biome`) VALUES (?,?)", 
  [req.query.name, req.query.biome], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// SPECIES
app.get('/species_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Species(`name`,`diet`,`habitat`) VALUES (?,?,?)", 
  [req.query.name, req.query.diet, req.query.habitat], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// ANIMAL
app.get('/animal_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Animal(`sid`,`exid`,`name`,`sex`,`age`) VALUES (?,?,?,?,?)", 
  [req.query.sid, req.query.exid, req.query.name, req.query.sex, req.query.age], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// ENRICHMENT
app.get('/enrichment_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Enrichment(`sid`,`name`,`type`) VALUES (?,?,?)", 
  [req.query.sid, req.query.name,req.query.type], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// EMPLOYEE
app.get('/employee_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Employee(`jid`,`fname`,`lname`,`salary`) VALUES (?,?,?,?)", 
  [req.query.jid, req.query.fname,req.query.lname,req.query.salary], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// JOB
app.get('/job_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Job(`title`) VALUES (?)", 
  [req.query.title], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// EXHIBIT_ENRICHMENT
app.get('/exhibit_enrichment_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Exhibit_Enrichment(`exid`, `enid`) VALUES (?,?)", 
  [req.query.exid, req.query.enid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

// EXHIBIT_EMPLOYEE
app.get('/exhibit_employee_insert',function(req,res,next){
  var context = {};
  mysql.pool.query("INSERT INTO Exhibit_Employee(`exid`, `emid`) VALUES (?,?)", 
  [req.query.exid, req.query.emid], function(err, result){
    if(err){
      next(err);
      return;
    }
    context.insert = req.query;
    context.results = result;
    res.send(context)
  });
});

//------------------UPDATE QUERIES-----------------------------------------

// EXHIBIT
app.get('/exhibit_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Exhibit SET `name`='" + req.query.name + "', `biome`='" + req.query.biome + "' WHERE `exid`=" + req.query.exid;
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

// SPECIES
app.get('/species_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Species SET `name`='" + req.query.name + "', `diet`='" + req.query.diet +  "', `habitat`='" + req.query.habitat + "' WHERE `sid`=" + req.query.sid;
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

// ANIMAL
app.get('/animal_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Animal SET `sid`='" + req.query.sid + "', `exid`='" + req.query.exid + 
  "', `name`='" + req.query.name  + "', `sex`='" + req.query.sex + "' WHERE `aid`=" + req.query.aid;
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

// ENRICHMENT
app.get('/enrichment_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Enrichment SET `sid`='" + req.query.sid + "', `name`='" + req.query.name + "', `type`='" + 
  req.query.type + "' WHERE `enid`=" + req.query.enid;
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

// EMPLOYEE
app.get('/employee_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Employee SET `jid`='" + req.query.jid + "', `fname`='" + req.query.fname + "', `lname`='" + 
  req.query.lname + "', `salary`='" + req.query.salary + "' WHERE `emid`=" + req.query.emid;
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

// JOB
app.get('/job_update',function(req,res,next){
  var context = {};
  var full_query = "UPDATE Job SET `title`='" + req.query.title + "' WHERE `jid`=" + req.query.jid + ";";
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

//------------------DELETE QUERIES-----------------------------------------

// one delete query works for all tables

app.get('/delete',function(req,res,next){
  var context = {};
  var full_query = "DELETE FROM " + req.query.entity + " WHERE " + req.query.id_name + "=" + req.query.id; 
  mysql.pool.query(full_query, function(err, result){
    if(err){
      next(err);
      return;
    }
    context.results = result;
    res.send(context)
  });
});

//------------------LISTENING----------------------------------------------

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
