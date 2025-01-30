import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

const authApi = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});

const userService = {
  async register(userData) {
    try {
      // Step 1: Register user with auth service
      const authResponse = await authApi.post('/api/auth/register', {
        username: userData.name,
        displayName: userData.displayName,
        personalEmail: userData.personalEmail,
        systemEmail: userData.systemEmail,
        password: userData.password,
        simFrequency: userData.simFrequency
      });

      // Step 2: Create system user and setup mail
      const systemResponse = await api.post('/users/system-setup', {
        username: userData.name,
        displayName: userData.displayName,
        personalEmail: userData.personalEmail,
        systemEmail: userData.systemEmail,
        simFrequency: userData.simFrequency,
        token: authResponse.data.token
      });

      return {
        ...authResponse.data,
        systemSetup: systemResponse.data
      };
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async verifyEmail(token) {
    try {
      const response = await authApi.post('/api/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  async getSystemStatus(username) {
    try {
      const response = await api.get(`/users/${username}/system-status`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

const TEST_USERS = [
  {
    name: 'test_john_2cr45',
    displayName: 'Cosmic Explorer John',
    personalEmail: 'test_john_2cr45@local.domain',
    systemEmail: 'test_john_2cr45@cosmical.space',
    password: 'CosmicPass123!',
    simFrequency: 'CSMC001'
  },
  {
    name: 'test_marie_2cr45',
    displayName: 'Star Voyager Marie',
    personalEmail: 'test_marie_2cr45@local.domain',
    systemEmail: 'test_marie_2cr45@cosmical.space',
    password: 'VoyagerPass123!',
    simFrequency: 'CSMC002'
  },
  {
    name: 'test_eduardo_2cr45',
    displayName: 'Nebula Seeker Eduardo',
    personalEmail: 'test_eduardo_2cr45@local.domain',
    systemEmail: 'test_eduardo_2cr45@cosmical.space',
    password: 'NebulaPass123!',
    simFrequency: 'CSMC003'
  }
];

async function createTestUsers() {
  for (const userData of TEST_USERS) {
    try {
      console.log(`Creating user: ${userData.displayName}...`);
      
      // Start registration process
      const registration = await userService.register(userData);
      console.log(`- User registered: ${userData.name}`);
      
      // Simulate immediate verification (since these are test users)
      const verificationToken = registration.verificationToken;
      await userService.verifyEmail(verificationToken);
      console.log(`- Email verified for: ${userData.name}`);
      
      // Check system status
      const systemStatus = await userService.getSystemStatus(userData.name);
      console.log(`- System status for ${userData.name}:`, systemStatus);
      
      console.log(`✅ Successfully created test user: ${userData.displayName}\n`);
    } catch (error) {
      console.error(`❌ Failed to create test user ${userData.displayName}:`, error);
    }
  }
}

// Run the script
createTestUsers().catch(console.error);
