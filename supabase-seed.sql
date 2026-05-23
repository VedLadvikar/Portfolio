insert into projects (number, title, tag, description, stack, image_url, live_url, code_url, featured, "order")
values
  (
    '01',
    'FinTrack- Expense Tracker With Dashboard',
    'SaaS · Dashboard',
    'Full-stack MERN expense tracker with JWT authentication, transaction management, interactive analytics dashboard, financial reporting, and responsive UI.',
    array['React.JS', 'Tailwind CSS', 'MongoDB', 'Express', 'REST APIs'],
    '/assets/project-1.jpg',
    '#',
    '#',
    true,
    1
  ),
  (
    '02',
    'Lume Studio',
    'E-commerce',
    'Headless storefront for an artisan brand with editorial product stories and instant checkout.',
    array['MERN', 'Stripe', 'Sanity'],
    '/assets/project-2.jpg',
    '#',
    '#',
    false,
    2
  ),
  (
    '03',
    'Halo Chat',
    'Realtime · Mobile',
    'End-to-end encrypted messaging with rich presence, threads, and a calm minimalist UI.',
    array['React Native', 'Socket.io', 'Node'],
    '/assets/project-3.jpg',
    '#',
    '#',
    false,
    3
  ),
  (
    '04',
    'Folio Journal',
    'Editorial · CMS',
    'A typographic blogging platform with MDX-first authoring and a focus on slow reading.',
    array['Next.js', 'MDX', 'Mongo'],
    '/assets/project-4.jpg',
    '#',
    '#',
    false,
    4
  );
