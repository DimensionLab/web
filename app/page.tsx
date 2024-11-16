import Home from '@/components/Home'
import HubMainPage from '@/components/hub/home/HubMainPage';
import { getSession } from '@auth0/nextjs-auth0';

export default async function Index () {
  const session = await getSession();
  if (session) {
    return <HubMainPage />
  }
  return <Home />
}