import { adminEmail } from "../Config/AWS.js"

adminEmail


const emailTemplate = (reciever_email,subject,body) => {
  return {
        Source : adminEmail,
        Destination: {
            ToAddresses: [reciever_email]
        },
        ReplyToAddresses: [adminEmail],
        Message : {
            Subject: { Charset: 'UTF-8',
                Data: `WheelSpot - ${subject}`
            },
            Body: {
                Html:  { Charset: 'UTF-8',
                Data: `
                <html>
                <body>
                    <h1> WheelSpot </h1>
                    ${body}
                </body>
                </html>`,
            }
            }
        }
  }
}

export default emailTemplate
