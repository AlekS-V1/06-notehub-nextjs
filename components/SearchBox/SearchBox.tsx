// import type { DebouncedState } from 'use-debounce';
import { useDebouncedCallback } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchQuery: string;
  onSearch: (val: string) => void;
}

export default function SearchBox({ onSearch, searchQuery }: SearchBoxProps) {
  const debouncedSearch = useDebouncedCallback((val: string) => {
    onSearch(val);
  }, 300);

  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      defaultValue={searchQuery}
      onChange={updateSearchQuery}
      placeholder="Search notes"
    />
  );
}
