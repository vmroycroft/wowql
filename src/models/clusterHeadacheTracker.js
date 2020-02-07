const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const currentAttackSchema = new Schema({
	user: String,
	startDate: String,
	startTime: String,
	endDate: String,
	endime: String,
	kip: Number
	// user: String,
	// startDateTime: Date,
	// endDateTime: Date,
	// kipScale: String
});
const CurrentAttack = mongoose.model('currentAttack', currentAttackSchema);

module.exports = {
	CurrentAttack
};
