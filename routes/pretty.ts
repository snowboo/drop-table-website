///<reference path='../types/node/node.d.ts'/>
  
///<reference path='../types/express/express.d.ts'/> 

//displays dashboard

var express = require('express');
var config = require('../config');
import User = require('../src/User');
import { Comic } from '../src/Comic';

//struct for a single result in a list of search results
class SearchResult{
  linktext: string;
  description: string;
  href: string;
}

class RoutePretty {
  router_: any;
  static searchFor(searchtext: string): SearchResult[] {
     var results: SearchResult[] = []
     for (var i=0;i<12;i++) {
       //make random search results
       var result: SearchResult = {
         linktext:"search result "+i,
         description:"description "+i,
         href:"/pretty/"
       }
       results.push(result);
     }
     return results;
  }
  constructor() {
    var router = express.Router();
    /* GET dashboard page. */
    router.get('/', function(req, res, next) {
      res.render('dashboard', {
        title: 'dashboard',
        stuff: 'Dashboard'
      });
    });
    
    /* GET pretty search results */
    router.get('/search/*', function(req,res,next) {
      var results = RoutePretty.searchFor(req.url.substring('/pretty/search/'.length))
      res.render('prettysearch', {
        title: 'pretty search',
        searchresults: results
      });
    })
	
	 /* POST Comic. */
    router.post('/comic', function(req, res, next) {
		console.log("in pretty.ts");
      if (req.comic)//comic already exists:
        res.send({success: false,
          msg: 'Comic already exists'})
      else if (!req.body.name) //incorrect POST body
        res.send({success: false, msg: 'Provide comic name'});
     // else if (req.body.account_type!="artist") //incorrect account type
     //   res.send({success: false, msg: 'account_type must be"artist"'});
      else {
        // check if user is signed in
        if (!req.body.artist)
          return res.send({success: false, msg: 'Please sign-in to create a comic'})
        var comic: Comic = req.dbManager.getComic(req.body.name, req.body.artist, function(err,comic){
	  if (comic) {
            res.send({success: false, msg: 'Comic already exists!'})
            return;
          }
          //Everything good!
            comic = req.dbManager.createComic(req.body.comic,req.body.artist);
        });
      } 
    }); 
	 this.router_=router;
  }
  
  
  
  getRouter(){
    return this.router_;
  }
}

module.exports=RoutePretty
