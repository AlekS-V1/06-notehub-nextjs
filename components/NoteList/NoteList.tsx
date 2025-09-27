import { Note } from '@/types/note';
import NoteItem from '../NoteItem/NoteItem.client';
import css from './NoteList.module.css';

type Props = {
  notes: Note[];
};

const NoteList = ({ notes }: Props) => {
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
};

export default NoteList;
