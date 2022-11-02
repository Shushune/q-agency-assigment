import { useMemo } from "react";
import { IComment } from "../../models/comment";

const CommentComponent = (props: {
    comment: IComment;
    propsMessage: string;
    helloFrom: (message: string) => void;
}) => {
    const { comment, propsMessage, helloFrom } = props;

    useMemo(() => {
        helloFrom(`${propsMessage} CommentComponent`);
        return () => {};
    }, [helloFrom, propsMessage]);

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
