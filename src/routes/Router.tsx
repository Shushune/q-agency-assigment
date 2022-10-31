import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loader from "../shared/Loader";

const PostsPage = lazy(() => import("../screens/Posts/PostsPage"));
const PostDetails = lazy(() => import("../screens/Posts/PostDetails"));

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Loader loadingText="Loading..." />}>
                    <Routes>
                        <Route path="/posts" element={<PostsPage />} />
                        <Route path="/post/:id" element={<PostDetails />} />
                        <Route
                            path="*"
                            element={<Navigate to="/posts" replace />}
                        />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Router;
