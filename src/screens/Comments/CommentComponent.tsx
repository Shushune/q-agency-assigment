import { useEffect } from "react";
import { IComment } from "../../models/comment";

const CommentComponent = (props: { comment: IComment }) => {
    const { comment } = props;

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <div className="comment" key={comment.id}>
                <h3>{comment.name}</h3>
                <p className="posted">by: {comment.email}</p>
                <p className="description">{comment.body}</p>
            </div>
        </>
    );
};

export default CommentComponent;
