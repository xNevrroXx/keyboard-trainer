const nodemailer = require("nodemailer");


async function sendMail(targetEmail, temporaryCode) {
  const userEmail = process.env.EMAIL_ADDRESS;
  const passwordEmail = process.env.EMAIL_PASSWORD;

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



// async function sendMail(targetEmail) {
//   const userEmail = process.env.EMAIL_ADDRESS;
//   const passwordEmail = process.env.EMAIL_PASSWORD;
//   console.log("userEmail: ", userEmail);
//   console.log("passwordEmail: ", passwordEmail);
//   console.log("targetEmail: ", targetEmail);
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     host: "smtp.mail.ru",
//     auth: {
//       user: userEmail,
//       pass: passwordEmail
//     },
//     secure: true
//   })
//
// //todo fix: {msg: 'Missing credentials for "PLAIN"'}
//   const subject = "subj",
//     text = "text",
//     html = "",
//     attachments = "";
//   const mailer = async () => {
//     console.log(userEmail, " ", passwordEmail)
//     const mailData = {
//       from: userEmail,
//       to: targetEmail,
//       subject: subject,
//       text: text,
//       html: html,
//       attachments: attachments
//     }
//
//     return new Promise((resolve, reject) => {
//       transporter.sendMail(mailData, function (error, info) {
//         if (error) {
//           console.log("error: ", error)
//           reject(error);
//           return;
//         }
//         console.log("info: ", info)
//         resolve(info)
//       })
//     })
//   }
//
//   return await mailer();
// }
module.exports = sendMail;