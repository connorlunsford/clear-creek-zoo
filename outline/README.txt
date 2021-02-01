To run this project, run the data definition query in a database management system, which will populate it with the entities.
In the case of this project, the database was run using XAMPP with the phpMyAdmin interface.
From there, edit the dbcon file with the credentials tied to your database.
After that, using the command line, navigate to the directory of the server and run "npm install".
Then run the server from the command line using "node clearCreekZooServer.js".
After that, the website will run on localhost:9380.

Overview
This was created as a sample project to demonstrate meaningful usage of Javascript, HTML, CSS, and SQL. 
In this project I will also include examples of my design work on front end web pages and database design. 
The code for the website is mostly my own, starting from a template provided in my Intro to Databases class at Oregon State University. 

This website provides a management system for a zoo, named Clear Creek Zoo. 
The website is designed to mostly be used as a management system for employees of the zoo. 
The database includes the following entities: 
Species, Animal, Exhibit, Enrichment, Employee, and Job, as well as relationship tables for 
Exhibit_Employee and Exhibit_Enrichment. The full outline for the entities can be found below.

Outline
Species
Contains Information on animal species in the zoo
Attributes
sid - int, auto increment, not null, primary key
name - varchar, not null
diet - varchar, not null
Relationships
1:M Relationship with Enrichment
1:M Relationship with Animal

Animal
Contains information on each individual animal in the zoo
Attributes
aid - int, auto increment, not null, primary key
sid - foreign key from Species, not null
exid - foreign key from Exhibit, not null
name - varchar, not null
sex - varchar, not null
age - int, not null
img_link - varchar
notes - text
Relationships
M:1 Relationship with Species
M:1 Relationship with Exhibit

Exhibit
Contains information about the exhibits in the zoo
Attributes
exid - int, auto increment, not null, primary key
biome - varchar, not null
Relationships
1:M relationship with Animal
M:M relationship with Enrichment through Exhibit_Enrichment
M:M relationship with Employee through Exhibit_Employee

Enrichment
Contains information on the various kinds of enrichment you can add to an exhibit
Attributes
enid - int, auto increment, not null, primary key
sid - foreign key from Species
type - varchar, not null
name - varchar, not null
Relationships
M:1 relationship with Species
M:M relationship with Exhibit

Employee
Contains information on each individual employee in the zoo
Attributes
emid - int, auto increment, not null, primary key
jid - foreign key from Job
fname - varchar, not null
lname - varchar, not null
salary - int, not null
Relationships
M:M relationship with Exhibit
M:1 relationship with job

Job
Contains information on the various jobs in the zoo
Attributes
jid - int, auto increment, not null, primary key
title - varchar, not null
Relationships
1:M relationship with Employee

Exhibit_Employee
A relationship table for the many to many relationship between Exhibit and Employee
Attributes
exid - foreign key from Exhibit
emid - foreign key from Employee

Exhibit_Enrichment
A relationship table for the many to many relationship between Exhibit and Enrichment
Attributes
exid - foreign key from Exhibit
enid - foreign key from Enrichment
