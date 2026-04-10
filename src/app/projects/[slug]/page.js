import { getProjectData, getSortedProjectsData } from '@/lib/projects';
import ProjectContent from '@/components/ProjectContent';

export async function generateStaticParams() {
  const projects = getSortedProjectsData();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const projectData = getProjectData(slug);

  return <ProjectContent projectData={projectData} />;
}
