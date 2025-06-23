const parseRelativeDate = require('./date');

function parseProjects(rawProjects) {
  return rawProjects.map(project => ({
    title: project.title,
    link: project.link,
    date: parseRelativeDate(project.rawDate),
    proposals: project.rawProposals?.replace(/[^\d]/g, '') || null,
    description: project.description,
    budget: project.budget,
  }));
}

module.exports = parseProjects;
