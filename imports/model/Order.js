'use strict';

import Model from './Model.js';

/** Structure data. */
const structure =
    Object.freeze({
        ...Model.structure,
        week: Number,
        maker: String,
        carton: Number,
        qty: Number,
        price: Number,
        unit: Number,
        unitWithTax: Number,
        note: String,
    });

/** Model of order form. */
export default class Order extends Model {
    /** Week number. */
    week = 0;

    /** Maker name. */
    maker = '';

    /** Q'ty per carton. */
    carton = 1;

    /** Quantity. */
    qty = 1;

    /** Price. */
    price = 1;

    /** Unit cost. */
    unit = 1;

    /** Unit cost + Tax. */
    unitWithTax = 1;

    /** Note. */
    note = '';

    /** Clone object. */
    clone =
        (override = {}) => {
            const dst = new Order();
            this.innerClone({ dst, override, structure });
            return dst;
        };

    /** Structure data. */
    static get structure() { return structure; }
}