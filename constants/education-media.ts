// External media (YouTube) referenced by education content, keyed like images.
export const EDU_VIDEOS: Record<string, { id: string; label: string }> = {
  'mrp-exile-interview': { id: 'NRndf3s4LxI', label: 'The Shah speaks in exile' },
  'mrp-wedding-farah': { id: 'IgQ2eruVhE4', label: 'The wedding of Mohammad Reza and Farah' },
};

export function eduVideo(key?: string) {
  return key ? EDU_VIDEOS[key] : undefined;
}
