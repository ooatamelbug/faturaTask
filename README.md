# faturaTask
task in node.js application 

in this api create api for app make user register
and create posts and mke admin review this post and active


# admin
- create admin
- ctive admin
- control Permission ( create, update , delete ,select )
- active user 
- active posts
- control user ( create, update , delete ,select )

# user
- register
- login
- control post ( create, update , delete ,select )


1 - secure user's session
    in this point i create user token with json web token
    and for this i create table in database for auth operation 
    for sure that token is still valid or not and i read abut that 
    solution in article for more secure your auth user log

2 - Datastore
    in this point i used postgre database in app with plugin pg
    i use it for first time in this project i know it before but i
    do not use it .
    for deal with it i used knex plugin to make different opertions
    with database sql and use it for first time but i know it before

3 - keep user's session valid.
    i refer to that before i create in database table that responsable
    of insert user and admin session token in it and insert login time 
    and status of token

4 - force invalidating sessions 
    if user log out from app will change status and insert time expire
    that make secure to not let anyone take this token and try to play 
    with user accout

5 - strucuture your roles and permissions
    in this point i create permissions table in database that permissions
    around of my app functions create update delete and get from table and 
    make anther operations

6 -  assign specific user a specific role or permission
    i refer to that before in 5 make 
    type of admin that can give this permissions to other admin
    and in our route or path to do thing in app there are middleware
    make sure that user allow to do this messions or enter to this route

7 - implement your solution with framework
    in this point i used express framework with some tech 

8 - Diagrams files 
    i will send in your email some of image about how i strucuture my app
    and build database Diagram, ERD, Draft Drawing and shape classes

9 - if you got additional time
    if you got additional time i will complete add all of swagger documentions
    and complete automation testing for app in fact i try to learn testing 
    i know a little about testing i try to use it but time is not supported
    me much

10 - learned during the coarse of this task
    i learn to use knex and swagger documentions and start to use testing

11 - Useful link(s)
    send link of this task in git 
    https://github.com/ooatamelbug/faturaTask

# to run this app use
    
    % npm install

    @ notice: migrate and create database name "fatura"

    % nodmon index.js
