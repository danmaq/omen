'use strict';

/** Structure data. */
const structure = Object.freeze({ _id: String });

/** base class for Model. */
export default class Model {
    /** Identifier for MongoDB. */
    _id = '';

    /** Clone object. */
    clone =
        (override = {}) => {
            const dst = new Model();
            this.innerClone({ dst, override, structure });
            return dst;
        };

    /** Clone object. */
    innerClone({ dst = new Model(), override = {}, structure = {} }) {
        Object
            .keys(structure)
            .forEach(
                k =>
                dst[k] =
                (!!override && k in override) ? override[k] : this[k]);
    };

    /** Structure data without identity. */
    static structureWithoutId = ({ _id, ...rest }) => rest;

    /** Structure data. */
    static get structure() { return structure; }
}