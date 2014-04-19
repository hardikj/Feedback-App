/*

*/

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
  
  Template.dashboard.messages = function(){
    return Feedback.find({}, { sort: { time: -1 }});
  }

  Template.entryfield.events = {
   "keydown #feedback": function(event){
    if(event.which == 13){
      // Submit the form
      var feedback = document.getElementById('feedback');

      if(feedback.value != ''){
        Feedback.insert({
          name: feedback.value,
          time: Date.now()
        });

        name.value = '';
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
