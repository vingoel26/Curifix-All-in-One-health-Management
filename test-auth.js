// Simple test script to verify authentication endpoints
const testAuth = async () => {
  const baseURL = 'http://localhost:3000/api/auth';
  
  console.log('Testing authentication endpoints...');
  
  // Test registration
  try {
    const registerResponse = await fetch(`${baseURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123'
      }),
    });
    
    const registerData = await registerResponse.json();
    console.log('Registration test:', registerResponse.ok ? 'SUCCESS' : 'FAILED');
    console.log('Response:', registerData);
    
    if (registerResponse.ok) {
      // Test login with the same credentials
      const loginResponse = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'TestPassword123'
        }),
      });
      
      const loginData = await loginResponse.json();
      console.log('Login test:', loginResponse.ok ? 'SUCCESS' : 'FAILED');
      console.log('Response:', loginData);
    }
    
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run the test
testAuth();
