const update = () => {
	const info = Infos.findOne();
	if(info) {
		try {
			const res = HTTP.post(`https://${info.org}.slack.com/api/users.list`, {
				params: {
					token: info.token,
					presence: 1,
				}
			});
			if(res && res.data && res.data.ok) {
				//console.log('aa', res);

				Infos.update(info._id, { $set: {
					userCount: res.data.members.length,
					userOnlineCount: _.where(res.data.members, { presence: 'active' }).length,
				} });

			} else {
				console.error('boom', res);
			}
		} catch(e) {
			console.log('eee', e);
		}
	}
	Meteor.setTimeout(update, 1000);
};

update();