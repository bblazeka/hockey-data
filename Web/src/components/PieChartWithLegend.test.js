import { render, screen } from "@testing-library/react";
import React from "react";

import PieChartWithLegend from "./PieChartWithLegend";

describe("PieChartWithLegend component", () => {

  it("displays pie chart with legend", () => {
    const values = [{color: "#de14d8", name: "red", value: 2}, { name:"blue" , color: "#2814d8", value: 5}];

    render(<PieChartWithLegend values={values} width={500} height={500} />);

    const firstElementText = screen.getByText(values[0].name);
    expect(firstElementText).toBeInTheDocument();
  });
});
