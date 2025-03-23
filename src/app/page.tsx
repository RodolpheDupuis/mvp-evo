import { redirect } from 'next/navigation';
import { defaultLocale } from '../../navigation';

// This function runs on the server at request time
export default function RootPage() {
  // Simply redirect to the default locale path
  redirect(`/${defaultLocale}`);

  return (
    <></>
  )
}
