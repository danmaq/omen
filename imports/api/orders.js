'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import Model from '../model/Model.js';
import Order from '../model/Order.js';

/** Collection. */
const collection = new Mongo.Collection('order');

Meteor.methods({
    'order.create': params => {
        check(params, Model.structureWithoutId(Order.structure));
        collection.insert(params);
    },
    'order.remove': id => {
        check(id, String);
        collection.remove(id);
    },
});

export default collection;