Template.link.events({
	'click a' (e, tmpl) {
		analytics.track("Go to", {
			page: tmpl.data.name
		});
	},
});