import { useState } from "react";
import { IPagination } from "../interface/pagination";

const usePagination = () => {
  const [pagination, setPagination] = useState<IPagination>({
    limit: 52,
    offset: 0,
    page: 0,
    total: 1,
  });

  const changeState = (p: IPagination) => {
    setPagination(p);
  };

  const pageUp = () =>
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      offset: pagination.offset + pagination.limit,
    });

  const pageDown = () =>
    setPagination({
      ...pagination,
      page: pagination.page - 1,
      offset: pagination.offset - pagination.limit,
    });

  const changePage = (i: number) => {
    setPagination({
      ...pagination,
      page: i,
      offset: pagination.limit * i,
    });
  };

  return { pageDown, pageUp, changePage, changeState, pagination };
};

export default usePagination;
