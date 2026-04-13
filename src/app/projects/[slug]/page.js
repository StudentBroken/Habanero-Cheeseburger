import { getProjectData, getSortedProjectsData } from '@/lib/projects';
import ProjectContent from '@/components/ProjectContent';

export async function generateStaticParams() {
  const projects = getSortedProjectsData();
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const projectData = getProjectData(resolvedParams.slug);
  return {
    title: projectData.title,
    description: projectData.description,
  };
}

export default async function ProjectPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const projectData = getProjectData(slug);

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: projectData.title,
    description: projectData.description,
    datePublished: projectData.date,
    author: {
      "@type": "Person",
      name: "Habanero Cheeseburger",
    },
    articleSection: projectData.subcategory || projectData.category,
    keywords: [projectData.category, projectData.subcategory].filter(Boolean).join(', '),
  };

  if (projectData.thumbnail) {
    projectSchema.image = projectData.thumbnail;
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(projectSchema)}</script>
      <ProjectContent projectData={projectData} />
    </>
  );
}
