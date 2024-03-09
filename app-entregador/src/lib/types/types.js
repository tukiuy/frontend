/**
 * @typedef Item
 * @type {Object}
 * @property {string} name
 * @property {number} quantity
 */

/**
 * @typedef Order
 * @type {Object}
 * @property {string} id 
 * @property {string | undefined} user
 * @property {Date} created
 * @property {"approved" | "delivered"} status
 * @property {Item[]} items
 */

/**
 * @typedef User
 * @type {object}
 * @property {string} id - Id of the user as a UUID
 * @property {string} name - Name of the user
 */


export {}