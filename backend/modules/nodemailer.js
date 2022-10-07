const nodemailer = require("nodemailer");


async function sendMail(targetEmail) {
  const userEmail = process.env.EMAIL_ADDRESS;
  const passwordEmail = process.env.EMAIL_PASSWORD;
  console.log("userEmail: ", userEmail);
  console.log("passwordEmail: ", passwordEmail);
  console.log("targetEmail: ", targetEmail);
  const transporter = nodemailer.createTransport({
    host: "smtp.google.com",
    port: 465,
    secure: true,
    auth: {
      user: userEmail,
      pass: passwordEmail
    }
  });

  const sendingResult = await transporter.sendMail({
    from: `"Keyboard trainer" ${userEmail}`,
    to: targetEmail,
    subject: "Password recovery",
    html: `
      <h1>234323</h1>
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