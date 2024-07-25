import { Pagination } from "antd";

const _Pagination = ({ pageNum, total }) => {
  return (
    <Pagination
      align="end"
      defaultCurrent={pageNum}
      total={total}
      showSizeChanger
      pageSizeOptions={[5, 10, 15]}
      showTotal={(total) => `共 ${total} 条`}
    />
  );
};

export default _Pagination;
