import { useEffect, useState } from "react";
import { IComment } from "../models/comment";

const useGetPostComments = (id: number) => {
    const [comments, setComments] = useState<IComment[]>([]);
    useEffect(() => {
        const fetchData = async (id: number) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
            const data: IComment[] = await response.json();
            setComments(data);
        }
        fetchData(id);
    }, [id]);

    return comments;
};

export default useGetPostComments;
