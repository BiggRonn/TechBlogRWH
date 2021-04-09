//
const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form, clean out any empty space at ends
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

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

  const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (name && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        //redirect to the dashboard
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
  
  // document
  //   .querySelector('.signup-form')
  //   .addEventListener('submit', signupFormHandler);