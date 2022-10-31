import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetSpecificPost from "../../hooks/useGetSpecificPost";
import Loader from "../../shared/Loader";
import PostComponent from "./PostComponent";

const PostDetails = () => {
    const { id } = useParams();
    const post = useGetSpecificPost(id);

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            {post ? (
                <>
                    <div className="container">
                        <h1 className="header">Post #{post.id}</h1>
                    </div>
                    <div className="posts-container">
                        <PostComponent post={post} />
                    </div>
                </>
            ) : (
                <Loader loadingText={'Loading post...'} />
            )}
        </>
    );
};

export default PostDetails;
