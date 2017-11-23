'use strict';

import { Template } from 'meteor/templating';

import Deliveries from '../../api/deliveries.js';

import Delivery from '../../model/Delivery.js';

import formUtil from '../formUtil.js';

import './detail.html';

/** Get Identifier from router. */
const id = () => `${FlowRouter.getParam('id')}`;

/** Acquired information associated with the selected identifier. */
const data = () => new Delivery().clone(Deliveries.findOne(id()));

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

Template.deliveryDetail.helpers({ data });
Template.deliveryDetail.events({
    'click .omen-back': event => {
        event.preventDefault();
        window.history.back();
    },
    'click .omen-delete': event => {
        event.preventDefault();
        if (confirm('Cannot be undone. Do you really want to delete it?')) {
            Meteor.call('delivery.remove', id());
            window.history.back();
        }
    },
    'submit #omen-update-deiivery': event => {
        event.preventDefault();
        const parsed =
            formUtil.parse({ target: event.target, params, convert });
        Meteor.call('delivery.update', { ...parsed, _id: id() });
        alert('Saved.');
    },
});