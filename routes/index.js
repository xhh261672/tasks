
/*
 * GET home page.
 */
var express = require('express');
var app = express();
var Post = require('../modules/post');

exports.index = function(req, res){
  console.log("debug");
  Post.get(function(err, tasks) {
    res.render('index',{
        title:'Task List',
        posts: tasks
    });
  });
};
