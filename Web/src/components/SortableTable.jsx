import React, { useEffect, useState } from "react";
import { Table, Header } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { sortBy } from "lodash";
import styled from "styled-components";

const TableContainer = styled.div`
  overflow: auto;
`;

const NameCellStyled = styled(Table.Cell)`
  white-space: nowrap;
`;

const ValueCellStyled = styled(Table.Cell)`
  text-align: center !important;
  vertical-align: middle !important;
`;

function SortableTable({ columnNames, dataSource, paintBestValues = false }) {
  const [data, setData] = useState(dataSource);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  useEffect(() => {
    if (sortedColumn) {
      const sortedArray = sortBy(dataSource, [sortedColumn]);
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
      setData(sortBy(dataSource, [column]));
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
                  {...(!colName.notSortable
                    ? {
                        sorted:
                          sortedColumn === colName.property &&
                          !colName.notSortable
                            ? sortDirection
                            : null,
                        onClick: () => changeSort(colName.property),
                      }
                    : "")}
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
                  const formatNumber = () => {
                    if (typeof row[col.property] === "number") {
                      let newValue = row[col.property];
                      if (col.percent) {
                        newValue *= 100;
                      }
                      if (row[col.property]?.toString().includes(".")) {
                        return newValue.toFixed(2);
                      }
                      return newValue;
                    } else {
                      return row[col.property];
                    }
                  };
                  const value = formatNumber();
                  const isTopValue = value === col.topVal && paintBestValues;
                  return col.link ? (
                    <NameCellStyled key={`column${colIndex}`}>
                      <Link to={row.link}>{value}</Link>
                    </NameCellStyled>
                  ) : col.customName ? (
                    row.customName
                  ) : col.customOptions ? (
                    row.customOptions
                  ) : col.bold ? (
                    <ValueCellStyled key={`column${colIndex}`}>
                      <Header as="h3" textAlign="center">
                        {value}
                      </Header>
                    </ValueCellStyled>
                  ) : (
                    <ValueCellStyled
                      key={`column${colIndex}`}
                      positive={isTopValue}
                    >
                      {value}
                    </ValueCellStyled>
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
  paintBestValues: PropTypes.bool,
};

export default SortableTable;
