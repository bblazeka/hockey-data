import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import RosterStatsGrid from "./RosterStatsGrid";

describe("RosterStatsGrid component", () => {
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

  it("renders loading without parameters", () => {
    act(() => {
      render(<RosterStatsGrid />, container);
    });

    expect(container.textContent).toBe("Loading...");
  });
});
