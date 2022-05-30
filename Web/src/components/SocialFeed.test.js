import React from "react";
import { render, screen } from "@testing-library/react";

import { mockSocial } from "util/mocks";
import { renderWithState } from "util/tests";
import { DEFAULT_NOT_FOUND_TEXT } from "util/common";

import SocialFeed from "./SocialFeed";

describe("SocialFeed component", () => {
  it("renders loading without parameters", () => {
    const { container } = render(<SocialFeed />);

    expect(container.textContent).toBe("Loading social feed...");
  });
  it("renders empty when no content", () => {
    renderWithState(<SocialFeed tweets={[]} />);

    const mainText = screen.getByText(DEFAULT_NOT_FOUND_TEXT);
    expect(mainText).toBeInTheDocument();
  });
  it("renders news when present", () => {
    renderWithState(<SocialFeed tweets={mockSocial(4)} />);

    const mainText = screen.getByText("Feed");
    expect(mainText).toBeInTheDocument();
  });
});
