Meteor.methods({
	setup (info) {
		if (!this.isSimulation && Infos.find().count() === 0) {
			Infos.insert(info);
		}
	},
	inviter (email) {
		const info = Infos.findOne();
		let res;
		try {
			res = HTTP.post(`https://${info.org}.slack.com/api/users.admin.invite`, {
				params: {
					email,
					token: info.token,
				}
			});
		} catch(e) {
			console.log('eee', e);
			throw new Meteor.Error('yolo2', 'boom2');
		}
		if(res && res.data && res.data.ok) {
			console.log('aa', res);
		} else {
			console.error('boom', res);
			throw new Meteor.Error(res.data.error);
		}
	},
});