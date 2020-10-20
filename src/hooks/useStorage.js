import { useState, useEffect } from 'react';
import { projectStorage, projectFireStore, timeStamp } from '../firebase/config';
 
const useStorage = (file) => {
    const [url, setUrl] = useState(null);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const storageRef = projectStorage.ref(file.name);
        const collectionRef  = projectFireStore.collection('images');

        storageRef.put(file).on('state_changed', (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setProgress(percentage);
        }, (err) => {
            setError(err);
        }, async() => {
            const url = await storageRef.getDownloadURL();
            const createdAt = timeStamp();
            collectionRef.add({ url, createdAt });
            setUrl(url);
        })
    }, [file]);

    return { url, error, progress }
}

export default useStorage;