washingApp
==========
Description
-------
Car Washing App, project for Software Dev. year 3

Requierement
-------

Install
-------
Firstly, download and install [Node.js](https://nodejs.org). 
 then make sure you have installed npm updated as general :

     sudo npm install npm -g
You can check the last npm version :
     sudo npm --version

Go into the directory where you have pull the git reposit, and using npm install all dependencies and dev dependencies for this project : 

    sudo npm install
Once  all dependencies are installed successfully, you have to download all vendors used for this project by installing and running bower.

Install : `sudo npm install bower -g`
Then install all vendors : `bower install`

Configuration
-------

This project uses GruntJs which is a task manager. To Create a nice build and export it on you server (I use a FTP server, but you can modify the following files if you wish), you have to configure config/appConfig.json : 

    {
	"targets" : {
        "washingapp": {
            "targetHost"      : "host FTP",
            "targetUser"      : "user FTP",
            "targetPwd"      :  "user password FTP ",
            "targetServer"    : "www/directory_on_ftp_server"
        }
    }

Then you have to configure application/php/configDB.php with your DataBase credentials
and MAIL_FROM is used to send an automatic email to new users.

    <?php
    define('DB_USERNAME', 'user name of MySQL');
    define('DB_PASSWORD', 'password of MySQL');
    define('DB_HOST', 'host of MySQL Data Base');
    define('DB_NAME', 'name of DataBase');

    define('MAIL_FROM', 'email_address@example.com');
    ?>

Deploy project on your FTP Server 
-------
In the project directory, run the grunt CLI :

    sudo grunt deploy --target=washingapp
   
   you can use `--verbose` grunt option to see what the task is doing.

Documentation
-------
For more information about using the AngularJs module in this app,
a generated API has been done : [API doc](https://doc.romainfanara.com).

This API is split in two main part :
 - Washing App : AngularJs module
 - Washing App API : Explanation on the restful API.

References
-------

 - AngularJS
 - Bower
 - GruntJS + plugins
 - PHPSlim
 - Font awesome
 - Bootstrap
 - Less
 - NodeJS + NPM
 - 
