/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextApiRequest, type NextApiResponse } from "next";
import { createTRPCContext } from "../../../server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { uploadToGoogleCloud } from "~/server/api/utils/gcs";

export default async function handler(req: NextApiRequest, res: NextApiResponse)
{
    const ctx = await createTRPCContext({ req, res });
    if (req.method !== 'POST') res.status(405).json({ message: 'Method Not Allowed' });
    if (ctx.session?.user.email !== 'barnette.travis31@gmail.com') res.status(401).json({ message: 'Unauthorized, you are not the master of this dashboard. Begone nasty hacker!' });
    try
    {

        const { photo_data, location } = req.body;
        if (!photo_data || !location || typeof photo_data !== 'string' || typeof location !== 'string') return res.status(400).json({ message: 'Bad Request, Missing Parameters' });
        const PHOTO_ID = crypto.randomUUID();
        const photoUrl = await uploadToGoogleCloud(photo_data, PHOTO_ID, location);

        res.status(200).json({ photoUrl, photoId: PHOTO_ID });



    } catch (cause)
    {
        if (cause instanceof TRPCError)
        {
            const httpCode = getHTTPStatusCodeFromError(cause);
            res.status(httpCode).json(cause);
        }
        console.error(cause);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb',

        }
    }
};
