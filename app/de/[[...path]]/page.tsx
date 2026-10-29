import { notFound } from 'next/navigation';
import { routes, pageMetadata } from '@/content/routes';

type Props = { params: Promise<{ path?: string[] }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(routes).map(path => ({ path: path === '/' ? [] : path.slice(1).split('/') }));
}

export async function generateMetadata({ params }: Props) {
  const { path = [] } = await params;
  return pageMetadata(`/${path.join('/')}`, 'de');
}

export default async function GermanPage({ params }: Props) {
  const { path = [] } = await params;
  const route = routes[`/${path.join('/')}`];
  if (!route) notFound();
  const Content = route.component;
  return <Content locale="de" />;
}
