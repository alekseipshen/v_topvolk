// Photo galleries used by the WorksGallery component.
//
// `defaultWorks` / `defaultPreviews` are the generic renovation set shown on
// service pages that don't have their own photos yet. Per-service galleries
// (real client project photos) live in `serviceGalleries`, keyed by slug.
// `homeWorks` / `homePreviews` power the homepage "Our Recent Works" section.

export type Work = { image: string; alt: string };
export type Preview = { preview: string; index: number };

// Generic set (previously hardcoded in WorksGallery). AI-generated _02 and _05 removed.
export const defaultWorks: Work[] = [
  { image: '/assets/works/_01.jpg', alt: 'Home Renovation Project 1' },
  { image: '/assets/works/_03.jpg', alt: 'Home Renovation Project 3' },
  { image: '/assets/works/_04.jpg', alt: 'Home Renovation Project 4' },
  { image: '/assets/works/_06.jpg', alt: 'Home Renovation Project 6' },
  { image: '/assets/works/_07.jpg', alt: 'Home Renovation Project 7' },
  { image: '/assets/works/_08.jpg', alt: 'Home Renovation Project 8' },
  { image: '/assets/works/_09.jpg', alt: 'Home Renovation Project 9' },
  { image: '/assets/works/_10.jpg', alt: 'Home Renovation Project 10' },
  { image: '/assets/works/_11.jpg', alt: 'Home Renovation Project 11' },
  { image: '/assets/works/_12.jpg', alt: 'Home Renovation Project 12' },
  { image: '/assets/works/_13.jpg', alt: 'Home Renovation Project 13' },
  { image: '/assets/works/_14.jpg', alt: 'Home Renovation Project 14' },
  { image: '/assets/works/_15.jpg', alt: 'Home Renovation Project 15' },
];

export const defaultPreviews: Preview[] = [
  { preview: '/assets/works/_01m.jpg', index: 0 },
  { preview: '/assets/works/_03m.jpg', index: 1 },
  { preview: '/assets/works/_04m.jpg', index: 2 },
  { preview: '/assets/works/_06m.jpg', index: 3 },
];

// Real kitchen remodel photos (professional photoshoots, Seattle/Kirkland area).
const kitchenWorks: Work[] = [
  { image: '/assets/works/kitchen/kitchen-01.jpg', alt: 'Kitchen remodel in Kirkland, WA — full kitchen with island, stainless appliances and quartz countertops' },
  { image: '/assets/works/kitchen/kitchen-02.jpg', alt: 'Kitchen remodel in Seattle, WA — white Shaker cabinets with quartz countertops and gas cooktop' },
  { image: '/assets/works/kitchen/kitchen-03.jpg', alt: 'Kitchen remodel — sink area with quartz waterfall backsplash and hardwood flooring' },
  { image: '/assets/works/kitchen/kitchen-04.jpg', alt: 'Kitchen remodel in Kirkland, WA — cabinetry with brushed brass hardware and stainless refrigerator' },
  { image: '/assets/works/kitchen/kitchen-05.jpg', alt: 'Kitchen remodel — stainless gas cooktop set into a quartz countertop' },
  { image: '/assets/works/kitchen/kitchen-06.jpg', alt: 'Kitchen remodel — brushed brass cabinet hardware and hexagon tile backsplash' },
  { image: '/assets/works/kitchen/kitchen-07.jpg', alt: 'Kitchen remodel — Shaker cabinet detail with brushed nickel handles' },
  { image: '/assets/works/kitchen/kitchen-08.jpg', alt: 'Kitchen remodel — hexagon marble tile backsplash detail' },
  { image: '/assets/works/kitchen/kitchen-09.jpg', alt: 'Kitchen remodel — quartz countertop and cabinet drawer detail' },
  { image: '/assets/works/kitchen/kitchen-10.jpg', alt: 'Kitchen remodel — custom cabinetry and drawer hardware detail' },
];

const kitchenPreviews: Preview[] = [
  { preview: '/assets/works/kitchen/kitchen-01m.jpg', index: 0 },
  { preview: '/assets/works/kitchen/kitchen-02m.jpg', index: 1 },
  { preview: '/assets/works/kitchen/kitchen-03m.jpg', index: 2 },
  { preview: '/assets/works/kitchen/kitchen-04m.jpg', index: 3 },
  { preview: '/assets/works/kitchen/kitchen-05m.jpg', index: 4 },
  { preview: '/assets/works/kitchen/kitchen-06m.jpg', index: 5 },
];

// Per-service galleries. A service page with an entry here shows real project
// photos; others fall back to the generic default set.
export const serviceGalleries: Record<string, { works: Work[]; previews: Preview[] }> = {
  'kitchen-remodel': { works: kitchenWorks, previews: kitchenPreviews },
};

// Homepage: lead with two real kitchen projects, then the generic set.
export const homeWorks: Work[] = [kitchenWorks[0], kitchenWorks[1], ...defaultWorks];

export const homePreviews: Preview[] = [
  { preview: '/assets/works/kitchen/kitchen-01m.jpg', index: 0 },
  { preview: '/assets/works/kitchen/kitchen-02m.jpg', index: 1 },
  { preview: '/assets/works/_01m.jpg', index: 2 },
  { preview: '/assets/works/_03m.jpg', index: 3 },
];
