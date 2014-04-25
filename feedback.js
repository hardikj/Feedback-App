/*
===============
 Routes
==============
*/
Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading'
});

// route for main screen
Router.map(function () {
  this.route('dashboard');
});

// rooute for clients
Router.map(function () {
  this.route('entryfield', {path:'/'});
})


/*
==============
  Models
==============
*/
Feedback = new Meteor.Collection('feedback');


/*
====================
  Application logic
====================
*/

Meteor.startup(function () {
  // client startup code here 
  Feedback.remove ({})
});


if (Meteor.isClient) {
  
  //count the response
  Template.dashboard.count = function(){
    var count=0;
    var Feeds = Feedback.find({}, { sort: { time: -1 }});
    
    Feeds.forEach(function (feed) {
        count += 1;
    });
   return count;
  };

  // send the average to the /dashboard
  Template.dashboard.average = function(){
    var count=0;
    var av=0;
    var Feeds = Feedback.find({}, { sort: { time: -1 }});
    
    Feeds.forEach(function (feed) {
        av += parseInt(feed.name);
        count += 1;
    });

    return Math.round(av/count);
  }

  /* total no of feedbacks
  Template.dashboard.counts = function(){
    var Feeds = Feedback.find({}, { sort: { time: -1 }});
    return count;
  }*/

  // send all the responses to the /dashboard
  Template.dashboard.messages = function(){    
    return Feedback.find({}, { sort: { time: -1 }});
  }

  Template.entryfield.events = {
   "click #feedbackb": function(event){

    if(event.which=1){
      // Submit the form
      var feedback = document.getElementById('feedback');
      var div = document.getElementById('content');

      if(feedback.value != ''){
        Feedback.insert({
          name: feedback.value,
          time: Date.now()
        });

        name.value = '';
        div.innerHTML = "<h2 id='aresponse'>Thank You</h2>"
      }
    }
   }
  }
}

if (Meteor.isServer) {

  Meteor.startup(function () {

    // on server startup code here    
  });
}
