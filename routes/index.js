
/*
 * GET home page.
 */
var express = require('express');
var app = express();
var Post = require('../modules/post');

exports.index = function(req, res){
  res.render('index', {
            title: 'Tasklist',
            taskname: 'Empty',
            descripe: 'Nonthing',
            // posts: posts,
        });
        // return res.redirect('/');
    // Post.get(req.params.task, function(err, posts) {
    //     if (err) {
    //         res.render('index', { 
    //         title: 'Tasklist', 
    //         taskname: 'Empty',
    //         descripe: 'Nonthing',
    //         });
    //         // return res.redirect('/');
    //     }
    //     res.render('index', {
    //         title: 'Tasklist',
    //         taskname: 'Empty',
    //         descripe: 'Nonthing',
    //         posts: posts,
    //     });
    //     // return res.redirect('/');
    // });
};

app.post('/post', function(req, res) {
    var post = new Post(req.taskname, req.body.task.name, req.body.task.dscrp);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', 'send!');
        res.redirect('/');
        // next();
    });
});

