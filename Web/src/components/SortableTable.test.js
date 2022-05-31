import React from "react";
import { fireEvent, screen } from "@testing-library/react";

import { renderWithState } from "util/tests";
import { mockColumnsAndData } from "util/mocks";

import SortableTable from "./SortableTable";

describe("SortableTable component", () => {
  it("renders a table", async () => {
    const { columnNames, dataSource } = mockColumnsAndData();

    renderWithState(<SortableTable columnNames={columnNames} dataSource={dataSource} paintBestValues />);

    const columnElement = await screen.findByText("Col1");
    fireEvent.click(columnElement, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));
    
    const column2Element = await screen.findByText("Col2");
    fireEvent.click(column2Element, new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    }));

    const mainText = screen.getByText("hey");
    expect(mainText).toBeInTheDocument();
  });
});
