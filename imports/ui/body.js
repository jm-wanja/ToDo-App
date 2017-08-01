import { Template } from 'meteor/templating';

import { Tasks } from '../api/tasks';

import './body.html';

Template.body.helpers({
    tasks () {
        // return Tasks.find({});
        // show newest tasks at the top
        return Tasks.find({}, { sort: { createdAt: -1 } });
    },
});

Template.body.events({
    'submit .new-task'(event) {
        // prevent default browser form submit
        event.preventDefault();

        // get value from form element
        const target = event.target;
        const text = target.text.value;

        // insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), // current time
        });

        // clear form
        target.text.value = '';
    },
});