import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow: auto;
`;

function SortableTable({ columnNames, dataSource }) {
  const [data, setData] = useState(dataSource);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  useEffect(() => {
    if (sortedColumn) {
      const sortedArray = _.sortBy(dataSource, [sortedColumn]);
      setData(
        sortDirection === "ascending" ? sortedArray : sortedArray.reverse()
      );
    } else {
      setData(dataSource);
    }
  }, [dataSource]);

  const changeSort = (column) => {
    if (sortedColumn === column) {
      setData(data.slice().reverse());
      setSortDirection(
        sortDirection === "ascending" ? "descending" : "ascending"
      );
    } else {
      setData(_.sortBy(dataSource, [column]));
      setSortDirection("ascending");
      setSortedColumn(column);
    }
  };

  return (
    <TableContainer>
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            {columnNames.map((colName, index) => {
              return (
                <Table.HeaderCell
                  key={`header${index}`}
                  title={colName.description}
                  sorted={
                    sortedColumn === colName.property ? sortDirection : null
                  }
                  onClick={() => changeSort(colName.property)}
                >
                  {colName.title}
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
    </TableContainer>
  );
}

SortableTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  dataSource: PropTypes.arrayOf(PropTypes.object),
};

export default SortableTable;
