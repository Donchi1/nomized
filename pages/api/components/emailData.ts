import { DocumentData } from "firebase/firestore"

const emailData = {
  accessCodeProve: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Access Code Prove',
    html: `<h1>Your access code prove has been sent successfully.
     We will get back to you in less than 24 hour time </h1>
  <br/>
    <small> © ${new Date().getFullYear()}
    <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
     Reserved</small>
             `,
  }),
  accessCode: (user: DocumentData, accessCode: string) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Access Code',
    html: `<h1>Your access code has been successfully created </h1>
                    <p>${accessCode} happy trading</p>
                    <br/>
                    <p>this email contains sensitive informations</p>
                     <small> © ${new Date().getFullYear()}
                 <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  payment: (profile: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: profile?.email,
    subject: 'payment prove ',
    html: `<h1>Your payment prove was sent successfully wait for less than 24 hours while we confirm your payment.</h1>
    <p>Thank.</p>
              
                    <br/>
                  <small> © ${new Date().getFullYear()}
                 <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),

  welcome: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Welcome',
    html: `<h1>Hi ${user?.firstname} you are welcome to ultimatecoins</h1>
                    <p>We are happy to see you</p>
                    <p>Make your life changing investment and enjoy while sit at home</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
                  
             `,
  }),

  passwordUpdate: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'password Update',
    html: `<h1>${
      user?.firstname
    } your password has been successfully changed</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  passwordReset: (email: string) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'password Update',
    html: `<h1>Your password has been successfully changed</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  profileUpdate: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'profile Update',
    html: `<h1>${user.firstname} you have updated your profile</h1>
                    <p>if you did not do this, kindly contact our support team</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  withdrawals: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Withdrawal Information',
    html: `<h1>${
      user?.firstname
    } your withdrawal has been placed successfully</h1>
                    <p>We will get back to you in less than 24 hours</p>
                     <p>Time ${new Date()}</p>
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  contacts: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: user?.email,
    subject: 'Contact Notification',
    html: `<h1>${user.name} thank you for contacting us</h1>
                    <p>We will get back to you soon.</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  contactsForAdmin: (user: DocumentData) => ({
    from: process.env.EMAIL_SENDER,
    to: process.env.TO,
    subject: 'Contact Notification',
    html: `<h1>${user?.name} just contacted you</h1>
                    <p>Login now and check it out</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                   <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
  newsLetters: (email: string) => ({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: 'Newsletter',
    html: `<h1>Thank you for subscribing for our newsletter</h1>
                    <p>We will reach out to you if there is any information</p>                   
                    <br/>
                    <small> © ${new Date().getFullYear()}
                  <a href="https://cryptonomized.info"> Cryptonomize</a> All Rights
                  Reserved</small>
             `,
  }),
}

export default emailData
