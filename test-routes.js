import axios from 'axios';

// Create API instance for testing
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock localStorage for testing
global.localStorage = {
  data: {},
  getItem: function(key) {
    return this.data[key] || null;
  },
  setItem: function(key, value) {
    this.data[key] = value;
  },
  removeItem: function(key) {
    delete this.data[key];
  }
};

// Add auth token to requests
api.interceptors.request.use((config) => {
  const adminAuth = global.localStorage.getItem('adminAuth');
  const parsed = adminAuth ? JSON.parse(adminAuth) : null;
  const token = parsed?.data?.token || parsed?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

async function testRoutes() {
  console.log('🔍 TESTING ALL ROUTES');
  console.log('='.repeat(50));
  
  try {
    // First login to get token
    console.log('\n1. 🔐 Getting Authentication Token...');
    const login = await api.post('/admin/login', {
      email: 'admin@example.com',
      password: 'Admin@123'
    });
    global.localStorage.setItem('adminAuth', JSON.stringify(login.data));
    console.log('✅ Authentication successful');
    
    // Test Backend API Routes
    console.log('\n2. 🛤️  Testing Backend API Routes...');
    
    const backendRoutes = [
      { method: 'GET', path: '/health', desc: 'Health Check' },
      { method: 'GET', path: '/admin/dashboard/stats', desc: 'Dashboard Stats' },
      { method: 'GET', path: '/admin/tickets', desc: 'Get All Tickets' },
      { method: 'GET', path: '/admin/tickets/69cab51681284164a2b007cf', desc: 'Get Single Ticket' },
    ];
    
    for (const route of backendRoutes) {
      try {
        const response = await api[route.method.toLowerCase()](route.path);
        console.log(`✅ ${route.desc}: ${route.method} ${route.path} - Status: ${response.status}`);
      } catch (error) {
        console.log(`❌ ${route.desc}: ${route.method} ${route.path} - Error: ${error.response?.status || error.message}`);
      }
    }
    
    // Test Frontend Route Structure
    console.log('\n3. 📱 Frontend Route Structure Analysis...');
    
    const frontendRoutes = {
      'Public Routes': [
        { path: '/', component: 'HomePage', desc: 'Home Page' },
        { path: '/about', component: 'AboutPage', desc: 'About Page' },
        { path: '/services', component: 'ServicesPage', desc: 'Services Page' },
        { path: '/ticket', component: 'TicketPage', desc: 'Ticket Creation Page' },
        { path: '/ticket-status', component: 'TicketStatusPage', desc: 'Ticket Status Page' },
        { path: '/contact', component: 'ContactPage', desc: 'Contact Page' },
      ],
      'Admin Routes': [
        { path: '/admin/login', component: 'AdminLoginPage', desc: 'Admin Login', protected: false },
        { path: '/admin/dashboard', component: 'DashboardPage', desc: 'Admin Dashboard', protected: true },
        { path: '/admin/tickets', component: 'TicketsPage', desc: 'All Tickets', protected: true },
        { path: '/admin/tickets/:id', component: 'TicketDetailsPage', desc: 'Ticket Details', protected: true },
        { path: '/admin/all-data', component: 'AllDataPage', desc: 'All Data', protected: true },
        { path: '/admin/analytics', component: 'AnalyticsPage', desc: 'Analytics', protected: true },
        { path: '/admin/technicians', component: 'TechniciansPage', desc: 'Technicians', protected: true },
        { path: '/admin/reports', component: 'ReportsPage', desc: 'Reports', protected: true },
        { path: '/admin/settings', component: 'SettingsPage', desc: 'Settings', protected: true },
      ]
    };
    
    Object.entries(frontendRoutes).forEach(([category, routes]) => {
      console.log(`\n${category}:`);
      routes.forEach(route => {
        const protection = route.protected ? '🔒 Protected' : '🌐 Public';
        console.log(`  ${protection} ${route.path} -> ${route.component} (${route.desc})`);
      });
    });
    
    // Test Route Protection
    console.log('\n4. 🛡️  Testing Route Protection...');
    
    // Test without token
    const apiWithoutAuth = axios.create({
      baseURL: 'http://localhost:3000/api',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });
    
    try {
      await apiWithoutAuth.get('/admin/dashboard/stats');
      console.log('❌ Route protection failed - accessible without token');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Route protection working - blocked without token');
      } else {
        console.log(`❌ Unexpected error: ${error.response?.status}`);
      }
    }
    
    // Test with token
    try {
      await api.get('/admin/dashboard/stats');
      console.log('✅ Route protection working - accessible with token');
    } catch (error) {
      console.log(`❌ Route protection failed - error with token: ${error.response?.status}`);
    }
    
    console.log('\n5. 📋 Route Summary...');
    console.log(`✅ Total Frontend Routes: ${frontendRoutes['Public Routes'].length + frontendRoutes['Admin Routes'].length}`);
    console.log(`✅ Public Routes: ${frontendRoutes['Public Routes'].length}`);
    console.log(`✅ Admin Routes: ${frontendRoutes['Admin Routes'].length}`);
    console.log(`✅ Protected Routes: ${frontendRoutes['Admin Routes'].filter(r => r.protected).length}`);
    
    console.log('\n🎉 ROUTE TESTING COMPLETED!');
    
  } catch (error) {
    console.error('❌ Route testing failed:', error.message);
  }
}

testRoutes();
