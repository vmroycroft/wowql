const users = [];

module.exports = {
	users: users,
	getUsers: () => users,
	addUser: user => users.push(user)
};
