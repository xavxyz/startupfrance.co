Template.registerHelper('info', () => Infos.findOne() );

Template.setup.events({
  'submit form': function (e) {
    const info = { org: $('#org').val(), token: $('#token').val(), sentence: $('#sentence').val(), userCount: 'N/A', userOnlineCount: 'N/A' };
    Meteor.call('setup', info);
    return false;
  },
});

Template.login.events({
  'submit form': function (e) {
    console.log('sub', $('#email').val());
    $('#button').prop('disabled', true).removeClass('error').text('MERCI DE PATIENTER !');
    Meteor.call('inviter', $('#email').val(), err => {
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
        $('#button').prop('disabled', false).addClass('error').text(reason);
      } else {
        $('#button').addClass('success').text('WOOT. REGARDE TES EMAILS !');
      }
    });
    return false;
  },
});
