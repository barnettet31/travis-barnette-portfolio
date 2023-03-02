/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
interface IPhotoUploadResponse{
    photoUrl:string;
    photoId:string;
}
export async function postPhoto(file:string | undefined , location:string){
    if(!file || !location) return;
    const fileData = JSON.stringify({ photo_data: file, location: location });
    const data = await axios.post<IPhotoUploadResponse>('/api/photos', fileData, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return data.data;

}