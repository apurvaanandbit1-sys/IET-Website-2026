export const galleryItems = [
  {
    image: '/assets/gallery/icpc-amritapuri.jpg',
    alt: 'IET BIT Mesra team at the ICPC Amritapuri event',
    category: 'COMPETITIVE PROGRAMMING',
    title: 'ICPC Amritapuri',
  },
  {
    image: '/assets/about/about-initiatives.png',
    alt: 'Illustration of initiatives at the IET BIT Mesra chapter',
    category: 'CHAPTER LIFE',
    title: 'Ideas into action',
  },
  {
    image: '/assets/about/about-hands.png',
    alt: 'Illustration celebrating connection through engineering',
    category: 'ENGINEERING TOGETHER',
    title: 'A better world, together',
  },
  {
    image: '/assets/team/k23/Raunak_Kumar_Tripathi_President.jpeg',
    alt: 'IET BIT Mesra chapter president',
    category: 'THE PEOPLE',
    title: 'Chapter leadership',
  },
  {
    image: '/assets/team/k24/Hitesh_Bajaj_TechLead.jpg',
    alt: 'IET BIT Mesra technical lead',
    category: 'THE PEOPLE',
    title: 'Building with technology',
  },
  {
    image: '/assets/team/k24/aaroh-sinha.jpeg',
    alt: 'IET BIT Mesra chapter member',
    category: 'THE PEOPLE',
    title: 'The people behind IET',
  },
];

// Replace preview entries with their own image, alt, category, and title as assets arrive.
export const galleryArchiveItems = Array.from({ length: 100 }, (_, index) => {
  const source = galleryItems[index % galleryItems.length];
  if (index < galleryItems.length) return { ...source, id: `gallery-${index + 1}` };

  return {
    ...source,
    id: `gallery-${index + 1}`,
    category: 'PREVIEW IMAGE',
    title: `Gallery photo ${String(index + 1).padStart(2, '0')}`,
    alt: `${source.alt} (temporary preview for gallery slot ${index + 1})`,
  };
});
