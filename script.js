const userContainer = document.getElementById('userContainer');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = ''; // Clear previous content

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';

      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(userCard);
    });
  } catch (error) {
    userContainer.innerHTML = `<p id="error">Failed to load users. Please check your internet connection.</p>`;
    console.error('Fetch error:', error);
  }
}

// Fetch users on page load
window.addEventListener('load', fetchUsers);

// Reload users when button is clicked
reloadBtn.addEventListener('click', fetchUsers);
