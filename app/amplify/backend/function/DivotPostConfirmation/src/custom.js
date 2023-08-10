const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const client = new DynamoDBClient();
const sesClient = new SESClient({ region: 'us-east-1' }); // Replace YOUR_SES_REGION with the AWS SES region you are using

exports.handler = async (event, context) => {
  let date = new Date();

  if (event.request.userAttributes.sub) {
    let params = {
      Item: {
        'id': { S: event.request.userAttributes.sub },
        '__typename': { S: 'User' },
        '_lastChangedAt': { N: date.valueOf().toString() },
        '_version': { N: '1' },
        'createdAt': { S: date.toISOString() },
        'updatedAt': { S: date.toISOString() },
        'email': { S: event.request.userAttributes.email },
        'name': { S: event.userName },
        'isVerified': { N: '0' } //basically is the user approved to continue to see content
      },
      TableName: process.env.API_DIVOT_USERTABLE_NAME
    };

    try {
      await client.send(new PutItemCommand(params));
      console.log("Success");

      // Send welcome email using SES
      await sendWelcomeEmail(event.request.userAttributes.email);

    } catch (err) {
      console.log("Error", err);
    }

    console.log("Success: Everything executed correctly");
    context.done(null, event);
  } else {
    console.log("Error: Nothing was written to DynamoDB");
    context.done(null, event);
  }
};

async function sendWelcomeEmail(email) {
  const senderEmail = 'hollandblumer6@icloud.com'; // Replace with your verified SES sender email
  const subject = 'Welcome To Divot';
  const logoImageUrl = 'https://media.licdn.com/dms/image/C4E0BAQExBRO-JXLblw/company-logo_100_100/0/1674178178009?e=1698883200&v=beta&t=L3sqoG4PxeiaBkNQV8XrEvL1nataj5Enj5jYsSHUNIg'; // Replace with the URL of your logo image

  const body = `
    <html>
      <body>
        <p>Hello,</p>
        <p>Welcome to Divot! We are excited to have you on board.</p>
        <p><img src="${logoImageUrl}" alt="Divot Logo"></p>
        <p>Kind regards,<br>The Divot Team</p>
      </body>
    </html>
  `;


  const params = {
    Source: senderEmail,
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Subject: {
        Data: subject
      },
      Body: {
        Html: {
          Data: body
        }
      }
    }
  };

  try {
    await sesClient.send(new SendEmailCommand(params));
    console.log("Email sent successfully.");
  } catch (err) {
    console.log("Error sending email:", err);
  }
}