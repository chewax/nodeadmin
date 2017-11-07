### What is this? ###

This is wants to become an admin dashboard for apps made with nodejs and mongodb using mongoose as a driver.
I know there are a lot of ifs, but it is a rather common setup.
It is still in a very early alpha, but my intention is to create something similar to the django admin for nodejs.
There is still a lot of work to do. In that sense there is a [waffle.io](https://waffle.io/chewax/nodeadmin) document where you can check what remains to be done.

### Setup ###

* **Install** as npm module.

```
npm install https://github.com/chewax/nodeadmin.git
```
*note: one of the tasks that remains to be done is to create and register an npm module*

* **Start the admin** using the instance of mongoose 

```
#!javascript
var _admin = require('nodeadmin');
var Mongoose = require('mongoose');

Mongoose.connect('mongodb://' + mongo_connection.url + '/' + mongo_connection.database, { useMongoClient: true });

var db = Mongoose.connection;

db.on('error', console.error.bind( console, 'connection error'));
db.once('open', function callback() {  _admin.init(Mongoose); });
```

* **Access the admin**
The admin will run under port 2100 on a localhost server.
```
http://localhost:2100/dashboard
```

