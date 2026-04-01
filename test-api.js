const axios = require('axios');

async function testAPI() {
  try {
    console.log('🔍 Testing Backend API...');
    
    // Test 1: Health Check
    console.log('\n1. Testing Health Check...');
    const health = await axios.get('http://localhost:3000/api/health');
    console.log('✅ Health:', health.data);
    
    // Test 2: Admin Login
    console.log('\n2. Testing Admin Login...');
    const login = await axios.post('http://localhost:3000/api/admin/login', {
      email: 'admin@example.com',
      password: 'Admin@123'
    });
    console.log('✅ Login:', login.data);
    
    // Test 3: Get Dashboard Stats (with token)
    console.log('\n3. Testing Dashboard Stats...');
    const token = login.data.data.token;
    const stats = await axios.get('http://localhost:3000/api/admin/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('✅ Dashboard Stats:', stats.data);
    
    // Test 4: Get Tickets
    console.log('\n4. Testing Get Tickets...');
    const tickets = await axios.get('http://localhost:3000/api/admin/tickets', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('✅ Tickets:', tickets.data);
    
    console.log('\n🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.response?.data || error.message);
  }
}

testAPI();
