/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Storage, } from '@google-cloud/storage';
import { env } from "~/env.mjs";
import fs from 'fs';
interface ISecret{
    type:string;
project_id:string;
private_key_id:string;
private_key:string;
client_email:string;
client_id:string;
auth_uri:string;
token_uri:string;
auth_provider_x509_cert_url:string;
client_x509_cert_url:string;
}

const { private_key, client_email } = JSON.parse(Buffer.from(env.GOOGLE_CLOUD_SECRET, 'base64').toString('utf-8').replaceAll('/\n/g',""));

const storage = new Storage({
    projectId: env.GOOGLE_CLOUD_PROJECT,
    // 
    credentials: {
        private_key: private_key,
        client_email: client_email

    }
});

export async function uploadToGoogleCloud(fileElement: string, fileName: string, location: string)
{
    try
    {
        const base64 = fileElement.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(`/tmp/${fileName}.jpg`, buffer);
        const bucket = storage.bucket(`${env.GOOGLE_CLOUD_BUCKET_NAME}`);
        await bucket.upload(`/tmp/${fileName}.jpg`, {
            destination: `${location}/${fileName}.jpg`,

        });
        fs.unlinkSync(`/tmp/${fileName}.jpg`);
        const url = `https://storage.googleapis.com/${env.GOOGLE_CLOUD_BUCKET_NAME}/${location}/${fileName}.jpg`;
        return url;
    } catch (e)
    {
        console.log(e);
        return e;
    }
}

export const handleDeleteFromGoogleCloud = async (fileName: string) =>
{
    const bucket = storage.bucket(env.GOOGLE_CLOUD_BUCKET_NAME);
    //get file with full path
    const file = bucket.file(fileName);
    //delete file
    await file.delete();


    return 'deleted';
};