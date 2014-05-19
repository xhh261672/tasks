var mongodb = require('./db');

function Post(taskname, dscrp, time) {
    this.taskname = taskname;
    this.dscrp = dscrp;
    if (time) {
        this.time = time;
    } else {
        this.time = new Date();
    }
};

module.exports = Post;

Post.prototype.save = function save(callback) {
    var post = {
        taskname: this.taskname,
        dscrp: this.dscrp,
        time: this.time,
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
            collection.ensureIndex('taskname');
            collection.insert(post, {save: true}, function(err, post) {
                mongodb.close();
                callback(err, post);
            });
        });
    });
};

Post.get = function(taskname, callback) {
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('tasks', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            // if (taskname) {
            //     query.taskname = taskname;
            // }
            collection.find(query).sort({time: -1}).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    callback(err, null);
                }

                var posts = [];
                docs.forEach(function(doc, index) {
                    var post = new Post(doc.taskname, doc.post, doc.time);
                    posts.push(post);
                });
                callback(null, posts);
            });
        });
    });
};