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
