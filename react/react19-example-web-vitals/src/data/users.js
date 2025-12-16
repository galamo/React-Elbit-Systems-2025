
/**
 * We'll simulate heavy load for users by adding large text blobs and
 * also by providing a fetch wrapper that delays response on purpose.
 */
export const USERS = Array.from({length: 120}, (_,i) => {
  const jobs = ['Engineer','Designer','Manager','Marketing','Sales','Support']
  const job = jobs[i % jobs.length]
  // large bio to simulate heavy payload
  const bio = 'Bio '.repeat(200 + (i%10)*50)
  return {
    id: i+1,
    name: `User ${i+1}`,
    job,
    bio
  }
})
