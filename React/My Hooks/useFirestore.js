import { useState, useEffect } from 'react';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection,  getDocs} from 'firebase/firestore';
import firebaseConfig from '../keys/firestore.js'


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const useFirestore = (collectionName) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const colRef = collection(db, collectionName);
            try {
                const querySnapshot = await getDocs(colRef);

                const newData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setData(newData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName]);

    return { data, loading };
};

export default useFirestore;