import { useEffect } from "react";

import useGetPostComments from "../../hooks/useGetPostComments";
import { IComment } from "../../models/comment";
import { IPost } from "../../models/post";
import CommentComponent from "../Comments/CommentComponent";

const PostComponent = (props: {
    post: IPost;
    handleClick?: (id: number) => void;
}) => {
    const { post, handleClick } = props;
    const comments = useGetPostComments(post.id);

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <div
                className="post-wrapper"
                onClick={() => {
                    if (handleClick) {
                        handleClick(post.id);
                    }
                }}
            >
                <div className="post">
                    <p className="posted">Posted by: {post.usersName}</p>
                    <p className="title">{post.title}</p>
                    <div>
                        <p className="description">{post.body}</p>
                    </div>
                    <p className="bolded">{comments.length} comments: </p>
                </div>
                <div className="comments-wrapper">
                {comments.map((comment: IComment) => (
                    <CommentComponent key={comment.id} comment={comment} />
                ))}
                </div>
            </div>
        </>
    );
};

export default PostComponent;
