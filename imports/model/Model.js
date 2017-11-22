'use strict';

/** Structure data. */
const structure = Object.freeze({ _id: String });

/** base class for Model. */
export default class Model {
    /** Identity for MongoDB. */
    _id = '';

    /** Clone object. */
    clone =
        (override = {}) => {
            const dst = new Model();
            this.innerClone({ dst, override });
            return dst;
        };

    /** Clone object. */
    innerClone({ dst = new Model(), override = {} }) {
        const key = '_id';
        dst[key] = !!override && key in override ?
            override[key] : this[key];
    }

    /** Structure data without identity. */
    static structureWithoutId = ({ _id, ...rest }) => rest;

    /** Structure data. */
    static get structure() { return structure; }
}