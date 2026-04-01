import axios from 'axios';

// Mock localStorage
global.localStorage = {
  data: {},
  getItem: function(key) {
    return this.data[key] || null;
  },
  setItem: function(key, value) {
    this.data[key] = value;
  }
};

// Create API instance exactly like frontend
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Add auth interceptor
api.interceptors.request.use((config) => {
  const adminAuth = global.localStorage.getItem('adminAuth');
  const parsed = adminAuth ? JSON.parse(adminAuth) : null;
  const token = parsed?.data?.token || parsed?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function debugTicketDisplay() {
  console.log('🔍 DEBUGGING TICKET DISPLAY ISSUE');
  console.log('='.repeat(50));
  
  try {
    // Login first
    console.log('\n1. 🔐 Logging in...');
    const login = await api.post('/admin/login', {
      email: 'admin@example.com',
      password: 'Admin@123'
    });
    global.localStorage.setItem('adminAuth', JSON.stringify(login.data));
    console.log('✅ Login successful');
    
    // Get tickets like DashboardPage does
    console.log('\n2. 🎫 Getting tickets...');
    const ticketsRes = await api.get('/admin/tickets');
    console.log('📊 Full API Response:', JSON.stringify(ticketsRes.data, null, 2));
    
    // Check different ways to access data
    console.log('\n3. 🔍 Testing data access methods...');
    console.log('ticketsRes.data:', ticketsRes.data);
    console.log('ticketsRes.data.data:', ticketsRes.data.data);
    console.log('ticketsRes.data.data length:', ticketsRes.data.data?.length);
    console.log('ticketsRes.data.count:', ticketsRes.data.count);
    
    // Simulate DashboardPage logic
    console.log('\n4. 📱 Simulating DashboardPage...');
    
    // Method 1: Current implementation
    const tickets1 = ticketsRes.data;
    console.log('Method 1 - ticketsRes.data:');
    console.log('  Type:', typeof tickets1);
    console.log('  Is Array:', Array.isArray(tickets1));
    console.log('  Length:', tickets1.length);
    console.log('  Keys:', Object.keys(tickets1));
    
    // Method 2: Correct implementation
    const tickets2 = ticketsRes.data.data;
    console.log('Method 2 - ticketsRes.data.data:');
    console.log('  Type:', typeof tickets2);
    console.log('  Is Array:', Array.isArray(tickets2));
    console.log('  Length:', tickets2?.length || 0);
    
    // Method 3: Check if it's the tickets array
    if (Array.isArray(tickets2)) {
      console.log('✅ tickets2 is an array with', tickets2.length, 'tickets');
      console.log('First ticket:', tickets2[0]);
    } else {
      console.log('❌ tickets2 is not an array');
    }
    
    console.log('\n5. 🎯 ISSUE IDENTIFIED:');
    console.log('Problem: DashboardPage is using ticketsRes.data instead of ticketsRes.data.data');
    console.log('Solution: Change setTickets(ticketsRes.data) to setTickets(ticketsRes.data.data)');
    
    console.log('\n🎉 DEBUGGING COMPLETED!');
    
  } catch (error) {
    console.error('❌ Debug failed:', error.response?.data || error.message);
  }
}

debugTicketDisplay();
