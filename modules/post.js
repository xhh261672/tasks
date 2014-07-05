var mongodb = require('./db');

function Post(taskname, dscrp) {
    this.name = taskname;
    this.description = dscrp;
};



Post.save = function save(post, callback) {
    console.log("saving..");
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        var collection = db.collection("tasks");
        var saveTask = {
            name: post.name,
            description: post.description
        }
        collection.insert(saveTask, {safe: true}, function(err, post){
            mongodb.close();
        });
        setTimeout(function() {
            collection.findOne(saveTask, function(err, item) {
            });
        }, 1000);
    });
};

Post.remove = function(taskname, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('tasks', function(err, collection) {
            if (err) {
                // mongodb.close();
                return callback(err);
            }
            collection.remove({name: taskname}, function(err, docs){
                if (err) {
                    // mongodb.close();
                    return callback(err);
                }
                mongodb.close();
            });
        });
    });
};

Post.getAll = function(callback) {
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
                docs.forEach(function(task, index) {
                    var post = new Post(task.name, task.description);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
};

module.exports = Post;