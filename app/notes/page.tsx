import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

const NotesPage = async ({
  params,
}: {
  params: { search: string; page: string };
}) => {
  const queryClient = new QueryClient();

  const search = params.search ?? '';
  const page = Number(params.page ?? '1');
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ['notes', search, page, perPage],
    queryFn: () => fetchNotes(search, page, perPage),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default NotesPage;
