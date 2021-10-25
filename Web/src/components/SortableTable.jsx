import _ from "lodash";
import React, { useMemo, useState } from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

let data = [];
function SortableTable({ columnNames, dataSource }) {
  useMemo(() => {
    data = dataSource;
  }, [dataSource]);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const changeSort = (column) => {
    if (sortedColumn === column) {
      (data = data.slice().reverse()),
        setSortDirection(
          sortDirection === "ascending" ? "descending" : "ascending"
        );
    } else {
      _.sortBy(data, [column]);
      setSortDirection("ascending");
      setSortedColumn(column);
    }
  };

  return (
    <Table sortable celled>
      <Table.Header>
        <Table.Row>
          {columnNames.map((colName, index) => {
            return (
              <Table.HeaderCell
                key={`header${index}`}
                sorted={
                  sortedColumn === colName.property ? sortDirection : null
                }
                onClick={() => changeSort(colName.property)}
              >
                {colName.name}
              </Table.HeaderCell>
            );
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, index) => {
          return (
            <Table.Row key={`row${index}`}>
              {columnNames.map((col, colIndex) => {
                return (
                  <Table.Cell key={`column${colIndex}`}>
                    {col.link ? (
                      <Link to={row.link}>{row[col.property]}</Link>
                    ) : (
                      row[col.property]
                    )}
                  </Table.Cell>
                );
              })}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
}

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

export default SortableTable;
