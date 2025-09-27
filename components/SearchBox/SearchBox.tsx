import type { DebouncedState } from 'use-debounce';
import css from './SearchBox.module.css';

interface SearchProps {
  searchQuery: string;
  onSearch: DebouncedState<(val: string) => void>;
}

export default function SearchBox({ onSearch, searchQuery }: SearchProps) {
  const updateSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
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
