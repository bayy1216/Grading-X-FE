
export async function getCourses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_BASE_URL}/api/course`, {
    next: {
      tags: ['courses'],
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }

  return res.json();
}