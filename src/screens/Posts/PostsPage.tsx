import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPosts from "../../hooks/useGetPosts";
import { IPost } from "../../models/post";
import Loader from "../../shared/Loader";
import Search from "../../shared/Search";
import PostComponent from "./PostComponent";

const PostsPage = (props: {
    propsMessage: string;
    helloFrom: (message: string) => void;
}) => {
    const navigate = useNavigate();
    const { propsMessage, helloFrom } = props;
    const { posts, isLoading } = useGetPosts();
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

    useEffect(() => {
        setFilteredPosts(posts);
        return () => {};
    }, [posts]);

    useMemo(() => {
        helloFrom(`${propsMessage} PostPage`);
        return () => {};
    }, [helloFrom, propsMessage]);

    const handleClick = (postId: number) => {
        navigate(`/post/${postId}`);
    };

    const searchItems = (value: string) => {
        const newPosts = posts.filter((item: IPost) =>
            item.usersName?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPosts(newPosts);
    };

    return (
        <>
            <div data-testid="posts-page" className="container">
                <h1 className="header">All Posts</h1>
                <Search searchItems={searchItems} />
            </div>
            <div data-testid="post-components-wrapper" className="posts-container">
                {!isLoading && filteredPosts ? (
                    filteredPosts.map((post: IPost) => (
                        <PostComponent
                            key={post.id}
                            post={post}
                            handleClick={handleClick}
                            propsMessage={propsMessage}
                            helloFrom={helloFrom}
                        />
                    ))
                ) : (
                    <Loader loadingText="Loading Data..." />
                )}
                {!filteredPosts.length ? <h4>No posts by that User</h4> : null}
            </div>
        </>
    );
};

export default PostsPage;
