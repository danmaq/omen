'use strict';

import { Template } from 'meteor/templating';

import Delivery from '../../model/Delivery.js';

import './delivery.html';

/** Get template data. */
const getData = () => new Delivery().clone(Template.instance().data);

Template.delivery.helpers({
    strDate: () => getData().strDate,
    strSchedule: () => getData().strSchedule,
});
Template.delivery.events({
    'click .omen-detail': event => {
        event.preventDefault();
        Meteor.call('delivery.remove', getData()._id);
    },
});