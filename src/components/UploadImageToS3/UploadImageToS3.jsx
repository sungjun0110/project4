import React, { useState } from 'react';
import AWS from 'aws-sdk'

const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_S3_BASE_URL;
const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export default function UploadImageToS3({ handlePhotos }) {
    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        handlePhotos(`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${e.target.files[0].name}`);
    }

    const uploadFile = (file) => {

        const params = {
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100));
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }


    return <div>
        <div>Upload Progress is {progress}%</div>
        <input type="file" onChange={handleFileInput}/>
        <button type="submit" onClick={() => uploadFile(selectedFile)}>Add Item</button>
    </div>
}