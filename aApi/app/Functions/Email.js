const Mail = use('Mail')

exports.sendMail = async (to, subject, message, attach, cc, bcc) => {
  try {
    await Mail.raw(message, (msg) => {
      msg.from('guiomarket@softlutionszone.com', 'Sendocs')
      msg.to(to)
      msg.subject(subject)
      msg.cc(cc)
      msg.bcc(bcc)
      if (attach) {
        msg.attach(attach)
      }
    })
    return 'Message sent';
  } catch (error) {
    console.log(error, 'erorrrrr')
  }
};
