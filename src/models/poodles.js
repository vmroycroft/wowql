const mongoose = require('mongoose'),
	{ Schema } = mongoose;

const administrationSchema = new Schema({
	poodle: String,
	date: String,
	scheduledTime: String,
	administeredTime: String
});
const Administration = mongoose.model('administration', administrationSchema);

module.exports = {
	Administration
};
