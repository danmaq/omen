'use strict';

/** Object list of parser by type string key. */
const to =
    Object.freeze({
        int: Number.parseInt,
        float: Number.parseFloat,
        str: (x = '') => x,
        date: (x = '') => new Date(Date.parse(x)),
    });

/** Parse inputed form. */
const parse =
    ({ target, params = {}, convert = {} }) =>
    Object.assign({},
        ...Object
        .keys(params)
        .map((key = '') => ({
            [key in convert ? convert[key] : key]: params[key](target[key].value)
        })));

export default Object.freeze({ to, parse });