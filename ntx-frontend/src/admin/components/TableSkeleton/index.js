import React from "react";
import { Table, Skeleton } from "antd";

export const SkeletonTable = (props) => {
  const { columns } = props;
  const rowCount = 10;
  return (
    <Table
      rowKey="key"
      pagination={false}
      dataSource={[...Array(rowCount)].map((_, index) => ({
        key: `key${index}`,
      }))}
      columns={columns.map((column) => {
        return {
          ...column,
          render: function renderPlaceholder() {
            return (
              <Skeleton key={column.dataIndex} title={true} paragraph={false} />
            );
          },
        };
      })}
    />
  );
};
