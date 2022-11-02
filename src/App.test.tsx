import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PostsPage from "./screens/Posts/PostsPage";
import PostComponent from "./screens/Posts/PostComponent";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any),
    useNavigate: () => mockedUsedNavigate,
}));

test("renders PostsPage", () => {
    render(
        <PostsPage
            propsMessage="Hello from"
            helloFrom={() => `Hello from PostPage`}
        />
    );
    const postsPage = screen.getByTestId("posts-page");
    expect(postsPage).toBeInTheDocument();
});

test("Click on specific post", () => {
    const mockOnClick = jest.fn();
    const { getByTestId } = render(
        <PostComponent
            propsMessage="Hello from"
            helloFrom={() => `Hello from PostComponent`}
            post={{
                userId: 1,
                id: 1,
                title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            }}
            handleClick={mockOnClick()}
        />
    );

    const clickIndicator = getByTestId("specific-post-1");

    fireEvent.click(clickIndicator);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
});

test("Search field input", () => {
    render(
        <PostsPage
            propsMessage="Hello from"
            helloFrom={() => `Hello from PostPage`}
        />
    );

    const searchField = screen.getByPlaceholderText("Search...");

    type TestElement = Document | Element | Window | Node;
    const hasInputValue = (e: TestElement, inputValue: string) => {
        return screen.getByDisplayValue(inputValue) === e;
    };

    fireEvent.change(searchField, { target: { value: "Leanne" } });
    expect(hasInputValue(searchField, "Leanne")).toBe(true);
});
