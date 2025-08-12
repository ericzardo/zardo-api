import { RawProject } from './extract';
import { parseRelativeDate } from './date';

export interface ParsedProject {
  title: string | null;
  link: string | null;
  date: string | null;
  proposals: string | null;
  description: string;
  budget: string | null;
  source: 'workana';
  keyword: string | null
}

export function parseProjects(rawProjects: RawProject[], querySearch: string): ParsedProject[] {
  return rawProjects.map((project) => ({
    title: project.title,
    link: project.link,
    date: parseRelativeDate(project.rawDate),
    proposals: project.rawProposals?.replace(/[^\d]/g, '') ?? null,
    description: project.description,
    budget: project.budget,
    source: 'workana',
    keyword: querySearch
  }));
}
