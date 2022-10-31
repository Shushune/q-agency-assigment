
import { useEffect, useState } from "react";
import { IPost } from "../models/post";
import { IUser } from "../models/user";

const useGetPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setLoading] = useState<Boolean>(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://jsonplaceholder.typicode.com/posts");
                const postData: IPost[] = await response.json();
                const users = await fetch("https://jsonplaceholder.typicode.com/users");
                const userData: IUser[] = await users.json();
                postData.forEach((post: IPost) => {
                    const user = userData.find((user: IUser) => user.id === post.userId);
                    if (user) post.usersName = user.name;
                });
                setPosts(postData);
            } catch (error) {
                console.error(error, 'this is get all posts error');
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return { posts, isLoading };
};

export default useGetPosts;
