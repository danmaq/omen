'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import Deliveries from '../../api/deliveries.js';

import Delivery from '../../model/Delivery.js';

import util from '../../util/util.js';

import './delivery.js';
import '../form.html';
import './deliveries.html';

/** Template for parsing. */
const params =
    Object.freeze({
        'date': util.to.date,
        'carton': util.to.int,
        'qty': util.to.int,
        'duty': util.to.str,
        'schedule': util.to.date,
        'maker': util.to.str,
        'name': util.to.str,
        'carton-order': util.to.int,
        'qty-order': util.to.int,
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
    'click #omen-drop': event => {
        event.preventDefault();
        if (
            confirm(
                'Cannot be undone. Do you really want to remove all records in this table?')) {
            Meteor.call('delivery.drop');
        }
    },
    'click #omen-export': event => {
        event.preventDefault();
        const raws = Deliveries.find().fetch();
        const rows = raws.map(v => new Delivery().clone(v).toRow());
        const body = Papa.unparse(rows, { quotes: true });
        alert(body);
    },
    'change #omen-import-deiiveries #file': event => {
        event.preventDefault();
        const reader = new FileReader();
        reader.onload =
            () =>
            Papa.parse(
                reader.result, {
                    complete: r => {
                        console.log(r.data);
                        alert('Not implemented yet. Show console.')
                    }
                });
        reader.readAsText(event.target.files[0]);
    },
    'submit #omen-add-deiivery': event => {
        event.preventDefault();
        const parsed =
            util.parse({ target: event.target, params, convert });
        Meteor.call('delivery.create', parsed);
    },
});