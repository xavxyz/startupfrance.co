Template.slackit.onCreated(function() {
  analytics.page("Portal loaded");
});

Template.setup.events({
  'submit form': function (e) {
    const info = { org: $('#org').val(), token: $('#token').val(), sentence: $('#sentence').val(), userCount: 'N/A', userOnlineCount: 'N/A' };
    Meteor.call('setup', info);
    return false;
  },
});

Template.login.events({
  'submit form': function (e) {
    const email = $('#email').val();
    $('#button').prop('disabled', true).removeClass('error').text('MERCI DE PATIENTER !');
    Meteor.call('inviter', email, err => {
      if(err) {
        let reason = 'Erreur.';
        console.log('err', err);
        switch (err.error) {
          case 'already_invited':
            reason = 'Tu es déjà reçu une invit\' !';
            break;
          case 'already_in_team':
            reason = 'Tu es déjà dans la team !';
            break;
        }
        analytics.track("Auto-inviter", {
          state: "fail",
          email: email,
        });
        $('#button').prop('disabled', false).addClass('error').text(reason);
      } else {
        analytics.track("Auto-inviter", {
          state: "success",
          email: email,
        });
        $('#button').addClass('success').text('WOOT. REGARDE TES EMAILS !');
      }
    });
    return false;
  },
});
