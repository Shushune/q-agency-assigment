

import { useEffect, useState } from "react";
import { IPost } from "../models/post";
import { IUser } from "../models/user";

const useGetSpecificPost = (id: string | undefined) => {
    const [post, setPost] = useState<IPost>();
    useEffect(() => {
        const fetchData = async (id: string) => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${+id}`);
                const data: IPost = await response.json();
                const res = await fetch(`https://jsonplaceholder.typicode.com/users/${data.userId}`);
                const user: IUser = await res.json();
                if (user) data.usersName = user.name;
                setPost(data);
            } catch (error) {
                console.error(error, 'this is get specific post error');
            }

        }
        if (id) fetchData(id);
    }, [id]);

    return post;
};

export default useGetSpecificPost;