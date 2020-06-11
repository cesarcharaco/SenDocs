const Mail = use('Mail')

exports.sendMail = async (to, subject, message, attach, cc, bcc) => {
  await Mail.raw(message, (msg) => {
    msg.from('guiomarket@softlutionszone.com', 'GuioMarket')
    msg.to(to)
    msg.subject(subject)
    msg.cc(cc)
    msg.bcc(bcc)
    if (attach) {
      msg.attach(attach)
    }
  })
  return 'Message sent';
};
