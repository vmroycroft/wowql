const poodlesResolvers = require('./poodles'),
	clusterHeadacheTrackerResolvers = require('./clusterHeadacheTracker'),
	wowResolvers = require('./wow');

module.exports = [poodlesResolvers, clusterHeadacheTrackerResolvers, wowResolvers];
