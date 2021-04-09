const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#new-user-name').value.trim();
    const email = document.querySelector('#new-user-email').value.trim();
    const password = document.querySelector('#new-user-password').value.trim();
  
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
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);