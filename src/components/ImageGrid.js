import React, { useState } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import { projectStorage, projectFireStore } from '../firebase/config';

const ImageGrid = ({ setSelectedImg }) => {
    const { docs } = useFirestore('images');
    const [icon, setIcon] = useState(false);
    const [ids, setIds] = useState('');
    const [popValue, setPopValue] = useState('');
    const [flag, setFlag] = useState(false)

    const handleClickCross = (id, url) => {
        projectFireStore.collection('images').doc(id).delete();
        const imageRef = projectStorage.refFromURL(url);
        imageRef.delete().then(() => {
            setFlag(true);
            setPopValue('Successfully Deleted Image');
        }).catch(err => setPopValue(err));

        setTimeout(() => {
            setFlag(false);
        }, 2500);
    }
    
    const mouseEnter = (id) => {
        docs.map(doc => {
            if (doc.id === id) {
                setIds(doc.id);
            }
            return doc.id;
        });
        setIcon(true);
    }

    return (
        <>
            <div className="img-grid">
                {docs && docs.map(doc => (
                    <motion.div className="img-wrap" key={doc.id}
                        layout
                        whileHover={{opacity: 1}}
                    >
                    {( icon && ids === doc.id ) &&
                        <div 
                            className="cross" 
                            onMouseEnter={() => setIcon(true)}
                            onMouseLeave={() => setIcon(false)}
                            onClick={() => handleClickCross(doc.id, doc.url)}
                        >
                            &times;
                        </div> 
                    }
                    <motion.img src={doc.url} 
                        alt='uploaded pic'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={() => setSelectedImg(doc.url)}
                        onMouseEnter={() => mouseEnter(doc.id)}
                        onMouseLeave={() => setIcon(false)}
                    />
                    </motion.div>
                ))}
            </div>
           { flag && (
                <div className="action-popup">
                    <p>{popValue}</p>
                    <span onClick={() => setFlag(false)}>&times;</span>
                </div>
            )}
        </>
    )
}

export default ImageGrid;