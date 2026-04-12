import { getAllSeriesSlugs, getSeriesData } from '@/lib/projects';
import SeriesContent from '@/components/SeriesContent';

export async function generateStaticParams() {
  return getAllSeriesSlugs();
}

export default async function SeriesPage({ params }) {
  const { slug } = await params;
  const seriesData = getSeriesData(slug);
  return <SeriesContent seriesData={seriesData} />;
}
