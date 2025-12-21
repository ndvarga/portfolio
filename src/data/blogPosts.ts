export interface BlogPost {
  title: string;
  body: string;
  links: string[] | null;
  date: string;
  image: string | null;
}

export const blogPosts: BlogPost[] = [
  {
    title: 'I Love Life Magazine Feature',
    body: 'My essay <a href="https://nikolasvarga.com/portfolio/musicontheperiphery.pdf">Music on the Periphery</a> has been featured in the latest edition of I Love Life Magazine!',
    links: ['https://nikolasvarga.com/portfolio/musicontheperiphery.pdf'],
    date: '2025-12-20',
    image: null,
  },
  {
    title: 'Embedded Audio Hackathon',
    body: 'I made a poster for the Embedded Audio Hackathon!',
    links: null,
    date: '2025-12-20',
    image: 'src/assets/passions/promo_poster.png',
  }
]