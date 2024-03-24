
export async function getCourses() {
  const res = await fetch(`/api/course`, {
    next: {
      tags: ['courses'],
    },
    cache: 'no-cache',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  return res.json();
}