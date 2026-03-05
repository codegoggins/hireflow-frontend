import { Table } from "antd";
import type { TableProps } from "antd";

interface TableComponentProps<T> extends TableProps<T> {
  pageSize?: number;
}

const TableComponent = <T extends object>({
  pageSize = 5,
  pagination,
  className,
  ...props
}: TableComponentProps<T>) => {
  return (
    <Table<T>
      className={`dashboard-table ${className ?? ""}`}
      pagination={
        pagination === false
          ? false
          : {
              pageSize,
              size: "small",
              showSizeChanger: false,
              ...((typeof pagination === "object" ? pagination : {}) as object),
            }
      }
      {...props}
    />
  );
};

export default TableComponent;
