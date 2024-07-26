import { Pagination } from "antd";

const _Pagination = ({ pageNum, total, changePage }) => {
  const handlePageChange = (num, size) => {
    changePage(num, size);
  };
  return (
    <Pagination
      align="end"
      defaultCurrent={pageNum}
      defaultPageSize={5}
      total={total}
      showSizeChanger
      pageSizeOptions={[5, 10, 15]}
      showTotal={(total) => `共 ${total} 条`}
      onChange={handlePageChange}
    />
  );
};

export default _Pagination;
