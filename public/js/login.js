//
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form, clean out any empty space at ends
    const email = document.querySelector('#user-email').value.trim();
    const password = document.querySelector('#user-password').value.trim();

    if (email && password) {
      // If there are both an email and password, send a POST request
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //redirect to dashboard page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
