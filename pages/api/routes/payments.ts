

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import emailData from "../components/emailData"
import transporter from "../components/transporter"


type Data = {
  message: string | object


}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
 
    const { profile } = req.body
  
    return transporter
      .sendMail(emailData.payment(profile))
      .then(() => {
        return res.json({ message: 'Success' })
      })
      .catch((err: any) => {
        return res.status(403).json({ message: err })
      })
    

}
