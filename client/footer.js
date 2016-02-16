Template.footer.events({
	'click [rel=producthunt]' (e, tmpl) {
		analytics.track("Go to", {
			page: "producthunt"
		});
	},
	'click [rel=news]' (e, tmpl) {
		analytics.track("Go to", {
			page: "news"
		});
	},
	'click [rel=podcast]' (e, tmpl) {
		analytics.track("Go to", {
			state: "podcast"
		});
	}
});