#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting IT-CCTV Full Stack Development Servers...\n');

// Start Backend
const backend = spawn('npm', ['start'], {
  cwd: join(__dirname, 'backend'),
  stdio: 'pipe',
  shell: true
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data.toString().trim()}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data.toString().trim()}`);
});

// Start Frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: join(__dirname, 'frontend'),
  stdio: 'pipe',
  shell: true
});

frontend.stdout.on('data', (data) => {
  const output = data.toString().trim();
  console.log(`[Frontend] ${output}`);
  
  // Extract the URL when frontend is ready
  if (output.includes('Local:')) {
    const match = output.match(/Local:\s*(http:\/\/localhost:\d+)/);
    if (match) {
      console.log(`\n✅ Frontend ready at: ${match[1]}`);
      console.log(`✅ Backend API running at: http://localhost:3001`);
      console.log('\n🎯 Development Environment is Ready!');
      console.log('📝 API Endpoints:');
      console.log('   - Health Check: http://localhost:3001/api/health');
      console.log('   - Customer API: http://localhost:3001/api/customer');
      console.log('   - Admin API: http://localhost:3001/api/admin');
      console.log('   - Banners API: http://localhost:3001/api/banners');
    }
  }
});

frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error] ${data.toString().trim()}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit(0);
});

backend.on('close', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

frontend.on('close', (code) => {
  console.log(`Frontend process exited with code ${code}`);
});
