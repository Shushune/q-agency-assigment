import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetSpecificPost from "../../hooks/useGetSpecificPost";
import Loader from "../../shared/Loader";
import PostComponent from "./PostComponent";

const PostDetails = (props: {
    propsMessage: string;
    helloFrom: (message: string) => void;
}) => {
    const { id } = useParams();
    const { propsMessage, helloFrom } = props;
    const post = useGetSpecificPost(id);

    useMemo(() => {
        helloFrom(`${propsMessage} PostDetails`);
        return () => {};
    }, [helloFrom, propsMessage]);

    return (
        <>
            {post ? (
                <>
                    <div data-testid={`post-${post.id}`} className="container">
                        <h1 className="header">Post #{post.id}</h1>
                    </div>
                    <div className="posts-container">
                        <PostComponent
                            post={post}
                            propsMessage={propsMessage}
                            helloFrom={helloFrom}
                        />
                    </div>
                </>
            ) : (
                <Loader loadingText={"Loading post..."} />
            )}
        </>
    );
};

export default PostDetails;
