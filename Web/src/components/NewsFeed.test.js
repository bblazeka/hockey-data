import React from "react";
import { render, screen } from "@testing-library/react";

import { mockNews } from "util/mocks";
import { renderWithState } from "util/tests";

import NewsFeed from "./NewsFeed";
import { DEFAULT_LOADING_TEXT, DEFAULT_NOT_FOUND_TEXT } from "util/common";

describe("NewsFeed component", () => {
  it("renders loading without parameters", () => {
    const { container } = render(<NewsFeed />);

    expect(container.textContent).toBe(DEFAULT_LOADING_TEXT);
  });
  it("renders news when present", () => {
    renderWithState(<NewsFeed news={[]} />);

    const mainText = screen.getByText(DEFAULT_NOT_FOUND_TEXT);
    expect(mainText).toBeInTheDocument();
  });
  it("renders news when present", () => {
    renderWithState(<NewsFeed news={mockNews(4)} />);

    const mainText = screen.getByText("News");
    expect(mainText).toBeInTheDocument();
  });
});
