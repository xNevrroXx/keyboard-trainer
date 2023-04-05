const nodemailer = require("nodemailer");
// own modules
const {EMAIL_ADDRESS, EMAIL_PASSWORD} = require("../mainData");

async function sendMail(targetEmail, temporaryCode) {
  const userEmail = EMAIL_ADDRESS;
  const passwordEmail = EMAIL_PASSWORD;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    requiresAuth: true,
    auth: {
      user: userEmail,
      pass: passwordEmail
    }
  });


  const sendingResult = await transporter.sendMail({
    from: `"Recovery" ${userEmail}`,
    to: targetEmail,
    subject: "Keyboard trainer password recovery",
    html: `
      <div style="padding: 5px; border-radius: 5px; border: 1px solid black; height: auto; width: 400px; box-shadow: 0 0 3px black">
        <p style="margin: 0; padding: 0">Please do not transfer the following code. Via this <span style="font-weight: bold">whoever</span> can access your account</p>
        <br><br>
        <p style="margin: 0; padding: 0"><span style="font-weight: bold">Enter code</span> to the input form on the site.</p>
      </div>
      <h1>${temporaryCode}</h1>
    `
  });

  return sendingResult;
}

module.exports = sendMail;