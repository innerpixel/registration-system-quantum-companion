<template>
  <el-container class="app-container">
    <el-header>
      <nav class="main-nav">
        <div class="logo">
          <img src="@/assets/logo.png" alt="Logo" />
          <span>Cosmic User Management</span>
        </div>
        <el-menu
          mode="horizontal"
          :router="true"
          :default-active="currentRoute"
        >
          <el-menu-item index="/dashboard">Dashboard</el-menu-item>
          <el-menu-item index="/users">System Users</el-menu-item>
          <el-menu-item index="/registration">Register</el-menu-item>
        </el-menu>
        <div class="user-menu">
          <el-dropdown v-if="isLoggedIn" @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar :size="32" :src="userAvatar" />
              {{ username }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="settings">Settings</el-dropdown-item>
                <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-button v-else type="primary" @click="login">Login</el-button>
        </div>
      </nav>
    </el-header>

    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </el-main>

    <el-footer>
      <p>&copy; {{ currentYear }} Cosmic User Management. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'App',

  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const currentYear = new Date().getFullYear();
    const isLoggedIn = computed(() => store.state.auth.isLoggedIn);
    const username = computed(() => store.state.auth.user?.username);
    const userAvatar = computed(() => 
      store.state.auth.user?.avatar || 
      `https://ui-avatars.com/api/?name=${username.value}&background=random`
    );

    const currentRoute = computed(() => route.path);

    const handleCommand = async (command) => {
      switch (command) {
        case 'logout':
          await store.dispatch('auth/logout');
          router.push('/login');
          break;
        case 'profile':
          router.push('/profile');
          break;
        case 'settings':
          router.push('/settings');
          break;
      }
    };

    const login = () => {
      router.push('/login');
    };

    return {
      currentYear,
      isLoggedIn,
      username,
      userAvatar,
      currentRoute,
      handleCommand,
      login
    };
  }
};
</script>

<style>
.app-container {
  min-height: 100vh;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 32px;
}

.logo span {
  font-size: 1.2em;
  font-weight: bold;
}

.user-menu {
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.el-header {
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  padding: 0;
}

.el-footer {
  text-align: center;
  color: #666;
  padding: 20px;
  background-color: #f5f7fa;
}

.el-main {
  background-color: #f5f7fa;
  padding: 20px;
}
</style>
