'use strict';

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

import Model from '../model/Model.js';
import Delivery from '../model/Delivery.js';

/** Collection. */
const collection = new Mongo.Collection('delivery');

Meteor.methods({
    'delivery.create': params => {
        params.date = new Date(params.date);
        params.schedule = new Date(params.schedule);
        check(params, Model.structureWithoutId(Delivery.structure));
        collection.insert(params);
    },
    'delivery.drop': () => collection.remove({}),
    'delivery.remove': id => {
        check(id, String);
        collection.remove(id);
    },
    'delivery.update': params => {
        params.date = new Date(params.date);
        params.schedule = new Date(params.schedule);
        check(params, Delivery.structure);
        const { _id, ...data } = params;
        collection.update(_id, params);
    },
});

export default collection;