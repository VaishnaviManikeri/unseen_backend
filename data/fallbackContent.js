const fallbackGalleryItems = [
  {
    _id: 'gallery-1',
    title: 'Brand Launch Shoot',
    description: 'A polished launch-day visual set built for campaign rollouts and social use.',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-gallery-1',
    category: 'projects',
    createdAt: new Date('2026-01-12T10:00:00.000Z'),
  },
  {
    _id: 'gallery-2',
    title: 'Event Coverage Frame',
    description: 'Candid coverage from a live event, optimized for highlight reels and recap posts.',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-gallery-2',
    category: 'events',
    createdAt: new Date('2026-01-15T10:00:00.000Z'),
  },
  {
    _id: 'gallery-3',
    title: 'Creative Studio Portrait',
    description: 'A clean brand portrait shot for team pages and about sections.',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-gallery-3',
    category: 'general',
    createdAt: new Date('2026-01-18T10:00:00.000Z'),
  },
];

const fallbackJobs = [
  {
    _id: 'career-1',
    title: 'Social Media Strategist',
    department: 'Marketing',
    location: 'Remote',
    type: 'Full-time',
    description: 'Plan campaign calendars, coordinate creatives, and translate insights into content that performs.',
    requirements: '2+ years in social strategy, strong copy instincts, and comfort with performance reporting.',
    salaryRange: { min: 40000, max: 65000 },
    isActive: true,
    createdAt: new Date('2026-01-10T10:00:00.000Z'),
  },
  {
    _id: 'career-2',
    title: 'Video Editor',
    department: 'Production',
    location: 'Pune',
    type: 'Contract',
    description: 'Edit short-form and long-form brand content for campaigns, reels, and testimonials.',
    requirements: 'Strong Premiere Pro or DaVinci skills, pacing sense, and portfolio samples.',
    salaryRange: { min: 30000, max: 55000 },
    isActive: true,
    createdAt: new Date('2026-01-08T10:00:00.000Z'),
  },
  {
    _id: 'career-3',
    title: 'Graphic Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Part-time',
    description: 'Create campaign assets, presentation decks, and social templates for recurring clients.',
    requirements: 'Adobe Creative Suite experience, typography skill, and motion familiarity is a plus.',
    salaryRange: { min: 25000, max: 45000 },
    isActive: true,
    createdAt: new Date('2026-01-06T10:00:00.000Z'),
  },
];

const fallbackBlogs = [
  {
    _id: 'blog-1',
    title: 'What Makes a Campaign Feel Premium',
    excerpt: 'Premium brand work is usually about restraint, consistency, and the right visual rhythm.',
    content: 'Premium campaigns are not defined by expensive production alone. They are defined by a clear story, disciplined art direction, and details that feel intentional from the opening frame to the final CTA.',
    author: 'Unseen Studios',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-blog-1',
    tags: ['branding', 'strategy', 'campaigns'],
    views: 128,
    isPublished: true,
    createdAt: new Date('2026-01-14T10:00:00.000Z'),
    updatedAt: new Date('2026-01-14T10:00:00.000Z'),
  },
  {
    _id: 'blog-2',
    title: 'Short-Form Video That Retains Attention',
    excerpt: 'Retention comes from a strong first second, a simple idea, and visually distinct beats.',
    content: 'Good short-form video keeps the viewer oriented. The hook should land immediately, the message should stay tight, and every cut should move the story forward without unnecessary noise.',
    author: 'Creative Team',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-blog-2',
    tags: ['video', 'social', 'retention'],
    views: 84,
    isPublished: true,
    createdAt: new Date('2026-01-11T10:00:00.000Z'),
    updatedAt: new Date('2026-01-11T10:00:00.000Z'),
  },
  {
    _id: 'blog-3',
    title: 'How We Structure a Content Sprint',
    excerpt: 'A content sprint works best when strategy, production, and approvals stay in one flow.',
    content: 'A structured content sprint starts with a clear brief, then moves through concepting, production, and distribution planning. That sequence keeps teams aligned and reduces last-minute churn.',
    author: 'Unseen Studios',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    publicId: 'fallback-blog-3',
    tags: ['workflow', 'content', 'production'],
    views: 61,
    isPublished: true,
    createdAt: new Date('2026-01-09T10:00:00.000Z'),
    updatedAt: new Date('2026-01-09T10:00:00.000Z'),
  },
];

const findFallbackBlogById = (id) => fallbackBlogs.find((blog) => blog._id === id);

const incrementFallbackBlogViews = (id) => {
  const blog = findFallbackBlogById(id);
  if (blog) {
    blog.views += 1;
    blog.updatedAt = new Date();
  }
  return blog;
};

module.exports = {
  fallbackGalleryItems,
  fallbackJobs,
  fallbackBlogs,
  findFallbackBlogById,
  incrementFallbackBlogViews,
};