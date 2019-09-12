const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.js');


const Helper = {
	/**
	 * Hash Password Method
	 * @param {string} password
	 * @returns {string} returns hashed password
	 */
	hashPassword(password) {
		return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
	},
	/**
	 * comparePassword
	 * @param {string} hashPassword
	 * @param {string} password
	 * @returns {Boolean} return True or False
	 */
	comparePassword(hashPassword, password) {
		return bcrypt.compareSync(password, hashPassword);
	},
	/**
	 * isValidEmail helper method
	 * @param {string} email
	 * @returns {Boolean} True or False
	 */
	isValidEmail(email) {
		return /\S+@\S+\.\S+/.test(email);
	},
	/**
	 * Gnerate Token
	 * @param {string} id
	 * @returns {string} token
	 */
	generateToken(id) {
		console.log(id);
		const token = jwt.sign({
				userId: id
			},
			config.secret, { expiresIn: '1h' }
		);
		return token;
	}
};

module.exports = Helper;