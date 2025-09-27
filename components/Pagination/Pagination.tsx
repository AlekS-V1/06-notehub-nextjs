import css from './Pagination.module.css';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  pageCount?: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const handlePageClick = ({ selected }: { selected: number }) =>
    setCurrentPage(selected + 1);
  return (
    <ReactPaginate
      pageCount={pageCount ?? 0}
      pageRangeDisplayed={4}
      marginPagesDisplayed={3}
      onPageChange={handlePageClick}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
      nextLabel="→"
      previousLabel="←"
      renderOnZeroPageCount={null}
    />
  );
}
