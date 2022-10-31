import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetPosts from "../../hooks/useGetPosts";
import { IPost } from "../../models/post";
import Loader from "../../shared/Loader";
import Search from "../../shared/Search";
import PostComponent from "./PostComponent";

const PostsPage = () => {
    const navigate = useNavigate();
    const { posts, isLoading } = useGetPosts();
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);

    useMemo(() => {
        setFilteredPosts(posts);
        return () => {};
    }, [posts]);

    const handleClick = (postId: number) => {
        navigate(`/post/${postId}`);
    };

    const searchItems = (value: string) => {
        setSearchInput(value);
        const newPosts = posts.filter((item: IPost) =>
            item.usersName?.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPosts(newPosts);
    };

    return (
        <>
            <div className="container">
                <h1 className="header">All Posts</h1>
                <Search searchItems={searchItems} />
            </div>
            <div className="posts-container">
                {!isLoading && filteredPosts ? (
                    filteredPosts.map((post: IPost) => (
                        <PostComponent
                            key={post.id}
                            post={post}
                            handleClick={handleClick}
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
