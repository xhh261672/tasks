var mongodb = require('./db');

function Post(taskname, dscrp) {
    this.name = taskname;
    this.description = dscrp;
};



Post.save = function save(post, callback) {
    console.log("saving..");
    mongodb.open(function (err,db) {
        if (err) {
            return callback(err);
        }
        var coll = db.collection("tasks");
        var saveTask = {
            name: post.taskname,
            description: post.description
        }
        coll.save(saveTask);

        setTimeout(function() {
            coll.findOne(saveTask, function(err, item) {
                db.close();
            });
        }, 1000);
    });
};

Post.remove = function(callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('tasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.findAndRemove({name: this.name}, function(err, doc){
                if (err) {
                    callback(err, null);
                }
            });
        });
    });
};

Post.get = function(callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('tasks', function(err, collection) {
            if (err) {
                mongodb.close();
                console.log(err);
                return callback(err);
            }
            
            collection.find().toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    callback(err, null);
                }

                var posts = [];
                docs.forEach(function(doc, index) {
                    var post = new Post(doc.name, doc.description);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
};

module.exports = Post;