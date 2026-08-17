export const THEMES = [
  {
    id: 'cherry',
    name: 'Warm Ivory & Cherry',
    description: 'Elegant and romantic',
    background: 'linear-gradient(135deg, #f5ebdd 0%, #fff8ea 55%, #ead2c7 100%)',
    accent: '#5a0000',
    text: '#5a0000',
    card: 'rgba(255,248,234,.72)',
  },
  {
    id: 'rose',
    name: 'Blush Rose',
    description: 'Soft and sweet',
    background: 'linear-gradient(135deg, #fff1f3 0%, #ffe0e6 55%, #f6c5d0 100%)',
    accent: '#8b1e3f',
    text: '#6f1733',
    card: 'rgba(255,248,249,.74)',
  },
  {
    id: 'lavender',
    name: 'Lavender Night',
    description: 'Dreamy and playful',
    background: 'linear-gradient(135deg, #f3efff 0%, #e6dcff 55%, #cfc0ee 100%)',
    accent: '#55327d',
    text: '#442764',
    card: 'rgba(250,247,255,.72)',
  },
  {
    id: 'sage',
    name: 'Sage Garden',
    description: 'Calm and natural',
    background: 'linear-gradient(135deg, #eef4ec 0%, #dce9d7 55%, #bfd1b7 100%)',
    accent: '#31583a',
    text: '#294b31',
    card: 'rgba(248,251,246,.72)',
  },
  {
    id: 'peach',
    name: 'Peach Sunset',
    description: 'Warm and cheerful',
    background: 'linear-gradient(135deg, #fff4e9 0%, #ffe0c2 55%, #f4b995 100%)',
    accent: '#8b3f1f',
    text: '#71321a',
    card: 'rgba(255,249,241,.72)',
  },
  {
    id: 'midnight',
    name: 'Midnight Romance',
    description: 'Bold and mysterious',
    background: 'radial-gradient(circle at 20% 10%, #4d2b3c 0%, #1e1822 45%, #111016 100%)',
    accent: '#f4c7d8',
    text: '#fff4f7',
    card: 'rgba(35,28,39,.76)',
  },
];

export function getTheme(id) {
  return THEMES.find((theme) => theme.id === id) || THEMES[0];
}
