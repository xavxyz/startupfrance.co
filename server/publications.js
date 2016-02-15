Meteor.publish(null, () => {
	return Infos.find({}, { fields: { token: 0 } });
});

