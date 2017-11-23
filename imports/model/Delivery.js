'use strict';

import Model from './Model.js';
import util from '../util/util.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...Model.structure,
        date: Date,
        carton: Number,
        qty: Number,
        duty: String,
        schedule: Date,
        maker: String,
        name: String,
        orderCarton: Number,
        orderQty: Number,
    });

const parsers = [
    { key: 'date', parser: util.to.date },
    { key: 'carton', parser: util.to.int },
    { key: 'qty', parser: util.to.int },
    { key: 'duty', parser: util.to.str },
    { key: 'schedule', parser: util.to.date },
    { key: 'maker', parser: util.to.str },
    { key: 'name', parser: util.to.str },
    { key: 'orderCarton', parser: util.to.int },
    { key: 'orderQty', parser: util.to.int },
];

/** Model of delivery form. */
export default class Delivery extends Model {
    /** Date. */
    date = new Date();

    /** Q'ty per carton. */
    carton = 1;

    /** Quantity. */
    qty = 1;

    /** Person in charge. */
    duty = '';

    /** Delivery schedule. */
    schedule = new Date();

    /** Maker name. */
    maker = '';

    /** Item name. */
    name = '';

    /** Qty per carton at order. */
    orderCarton = 1;

    /** Qty at order. */
    orderQty = 1;

    /** Clone object. */
    clone =
        (override = {}) => {
            const dst = new Delivery();
            this.innerClone({ dst, override, structure });
            return dst;
        };

    /** Create CSV Row. */
    toRow =
        () => [
            this.strDate,
            this.carton,
            this.qty,
            this.strSchedule,
            this.maker,
            this.name,
            this.orderCarton,
            this.orderQty,
        ];

    /** Localized date. */
    get strDate() { return this.date.toLocaleDateString(); }

    /** Localized delivery schedule. */
    get strSchedule() { return this.schedule.toLocaleDateString(); }

    /** Structure data. */
    static get structure() { return structure; }

    static fromRow =
        (row = []) =>
        new Delivery().clone(
            Object.assign({},
                ...row.map(
                    (v, i) =>
                    ({
                        [parsers[i].key]: parsers[i].parser(v)
                    }))));

}