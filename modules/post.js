var mongodb = require('./db');

function Post(taskname, dscrp) {
    this.name = taskname;
    this.description = dscrp;
    // if (time) {
    //     this.time = time;
    // } else {
    //     this.time = new Date();
    // }
};

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        name: this.taskname,
        description: this.dscrp,
        // time: this.time,
    };
    mongodb.open(function (err,db) {
        if (err) {
            return callback(err);
        }
        db.collection('tasks',function(err,collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name');
            collection.insert(post, {save: true}, function(err, post) {
                mongodb.close();
                callback(err, post);
            });
        });
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
        })
    })
}

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