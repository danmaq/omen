'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Deliveries from '../../api/deliveries.js';

import formUtil from '../formUtil.js';

import './delivery.js';
import './deliveries.html';
import { parse } from 'url';

/** Template for parsing. */
const params =
    Object.freeze({
        'date': formUtil.to.date,
        'carton': formUtil.to.int,
        'qty': formUtil.to.int,
        'duty': formUtil.to.str,
        'schedule': formUtil.to.date,
        'maker': formUtil.to.str,
        'name': formUtil.to.str,
        'carton-order': formUtil.to.int,
        'qty-order': formUtil.to.int,
    });

/** List of keys that required to be converted. */
const convert =
    Object.freeze({
        'carton-order': 'orderCarton',
        'qty-order': 'orderQty',
    });

Template.deliveries.onCreated(() => Meteor.subscribe('deliveries'));
Template.deliveries.helpers({
    deliveries: () => Deliveries.find(),
    count: () => Deliveries.find().count(),
    now: new Date().toLocaleDateString(),
});
Template.deliveries.events({
    'submit #omen-add-deiivery': event => {
        event.preventDefault();
        const parsed =
            formUtil.parse({ target: event.target, params, convert });
        Meteor.call('delivery.create', parsed);
    },
});