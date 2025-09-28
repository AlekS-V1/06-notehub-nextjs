import { Note } from '@/types/note';
import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
  onChange?: (note: Note) => void;
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleDelete = (noteId: string) => {
    mutation.mutate(noteId);
  };
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        // <NoteItem key={note.id} note={note} />
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`}>View Details</Link>
            <button
              className={css.button}
              onClick={() => handleDelete(note.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
