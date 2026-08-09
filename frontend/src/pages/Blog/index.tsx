import {useEffect, useState} from 'react';
import UniversalCard from '../../Components/UniversalCard/index.tsx.ts';
import BackButton from '../../Components/BackButton/index.tsx';

type Blog = {
  id: number;
  titlu: string;
    continut: string;
    imagine_url: string;
    data_publicarii: string;
};
  
function Blog(){
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/api/blogs`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setBlogs(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
}  