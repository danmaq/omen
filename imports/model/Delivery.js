'use strict';

import Model from './Model.js';

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
            this.innerClone({ dst, override });
            return dst;
        };

    /** Clone object. */
    innerClone({ dst = new Delivery(), override = {} }) {
        Object
            .keys(structure)
            .forEach(
                k =>
                dst[k] =
                (!!override && k in override) ? override[k] : this[k]);
        super.innerClone({ dst, override });
    };

    /** Localized date. */
    get strDate() { return this.date.toLocaleDateString(); }

    /** Localized delivery schedule. */
    get strSchedule() { return this.schedule.toLocaleDateString(); }

    /** Structure data. */
    static get structure() { return structure; }
}