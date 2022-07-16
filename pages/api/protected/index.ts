// This is an example of to protect an API route
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRET

import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const token = await getSession({ req })
    if (token) {
        // Signed in
        res.send({
            token,
            isValid: true
        })
    } else {
        // Not Signed in
        res.status(401)
        res.send({
            message: "Unauthorized"
        })
    }
  res.end()

}