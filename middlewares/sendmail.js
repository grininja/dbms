const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../app");
const config=require("../config");
const mailUser = config.MAIL_USERNAME;
const mailPass = config.MAIL_PASSWORD;
const clientId = config.OAUTH_CLIENTID;
const clientSecret = config.OAUTH_CLIENT_SECRET;
const refreshToken = config.OAUTH_REFRESH_TOKEN;
// console.log(mailUser);

const SendMail =  (email, subject, htmlBody, onSuccess, onError) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: mailUser,
      pass: mailPass,
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
    },
  });

  let mailOptions = {
    from: `"Shubham Rai" <${mailUser}>`,
    to: email,
    subject: subject,
    html: htmlBody,
  };
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      onError(error);
    } else {
      onSuccess(info);
    }
  });

};




module.exports = SendMail;
