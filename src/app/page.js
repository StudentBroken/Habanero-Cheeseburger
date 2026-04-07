import { getSortedProjectsData } from '@/lib/projects';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  const projects = getSortedProjectsData();
  return <HomeContent projects={projects} />;
}
