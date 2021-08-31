import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import GameTeamStats from "./GameTeamStats";

describe("GameTeamStats component", () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders loading when no parameters", () => {
    act(() => {
      render(<GameTeamStats />, container);
    });

    expect(container.textContent).toBe("Loading...");
  });
});
