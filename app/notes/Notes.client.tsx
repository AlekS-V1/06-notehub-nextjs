'use client';

import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import css from './Notes.module.css';

const NotesClient = () => {
  // Стан для зберігання поточної сторінки
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;
  // Стан для зберігання пошуку
  const [searchQuery, setSearchQuery] = useState('');

  const { data } = useQuery({
    queryKey: ['notes', searchQuery, currentPage, perPage],
    queryFn: () => fetchNotes(searchQuery, currentPage, perPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  const { notes = [], totalPages } = data || {};

  const handleSearch = useDebouncedCallback((val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  }, 300);

  // Стан для керування модалкою
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onSearch={handleSearch} />
        {data?.notes && data.notes.length > 0 && (
          <Pagination
            pageCount={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </div>
      {notes && <NoteList notes={notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default NotesClient;
