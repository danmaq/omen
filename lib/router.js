'use strict';

import { FlowRouter } from 'meteor/kadira:flow-router';

FlowRouter.route('/', {
    name: 'root',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'root' }),
});

FlowRouter.route('/order', {
    name: 'orders.show',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'orders' }),
});

FlowRouter.route('/delivery', {
    name: 'deliveries.show',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'deliveries' }),
});

FlowRouter.route('/delivery/:id', {
    name: 'delivery.show',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'deliveryDetail' }),
});

FlowRouter.route('/payout', {
    name: 'payouts.show',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'payouts' }),
});

FlowRouter.route('/stock', {
    name: 'stocks.show',
    action: (params, queryParams) =>
        BlazeLayout.render('body', { main: 'stocks' }),
});