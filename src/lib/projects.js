import fs from 'fs';
import path from 'path';

const projectsDirectory = path.join(process.cwd(), 'src/content/projects');

export function getSortedProjectsData() {
  if (!fs.existsSync(projectsDirectory)) return [];
  const folderNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = folderNames.map((folderName) => {
    if (folderName.startsWith('_')) return null;
    const id = folderName;
    const fullPath = path.join(projectsDirectory, folderName, 'metadata.json');
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const metadata = JSON.parse(fileContents);
    if (metadata.hidden) return null;
    return {
      id,
      ...metadata,
    };
  }).filter(Boolean);
  
  return allProjectsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    else return -1;
  });
}

export function subcategoryToSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function getAllSeriesSlugs() {
  const projects = getSortedProjectsData();
  const seen = new Set();
  return projects
    .filter(p => p.subcategory)
    .filter(p => {
      const slug = subcategoryToSlug(p.subcategory);
      if (seen.has(slug)) return false;
      seen.add(slug);
      return true;
    })
    .map(p => ({ slug: subcategoryToSlug(p.subcategory) }));
}

export function getSeriesData(slug) {
  const projects = getSortedProjectsData();
  const seriesProjects = projects.filter(
    p => p.subcategory && subcategoryToSlug(p.subcategory) === slug
  );
  if (!seriesProjects.length) return null;
  return {
    name: seriesProjects[0].subcategory,
    nameFr: seriesProjects[0].subcategoryFr || null,
    slug,
    projects: seriesProjects, // newest first
  };
}

export function getProjectData(slug) {
  const fullPath = path.join(projectsDirectory, slug, 'metadata.json');
  const contentPath = path.join(projectsDirectory, slug, 'content.md');
  const contentFrPath = path.join(projectsDirectory, slug, 'content_fr.md');
  
  const metadata = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  const content = fs.existsSync(contentPath) ? fs.readFileSync(contentPath, 'utf8') : '';
  const contentFr = fs.existsSync(contentFrPath) ? fs.readFileSync(contentFrPath, 'utf8') : '';
  
  return {
    slug,
    content,
    contentFr,
    ...metadata,
  };
}
