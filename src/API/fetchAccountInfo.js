const API_URL = 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me';

async function fetchAccountInfo({ token }) {
  try {
    const response = await fetch(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    });
    const user = await response.json();
    return user;
  } catch (e) {
    console.error("Unable to gather account info.", e);
  }
}
export default fetchAccountInfo;