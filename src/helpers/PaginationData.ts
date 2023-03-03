export default function paginationData(
  data: any,
  page: number,
  limit: number,
  count: number,
  nameData: string
) {
  return {
    total: count,
    currentPage: page,
    pageSize: data.length,
    totalPage: Math.ceil(count / limit),
    [nameData]: data,
  };
}
