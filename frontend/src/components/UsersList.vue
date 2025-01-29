&lt;template>
  <div class="users-list">
    <div class="header">
      <h2>System Users</h2>
      <div class="filters">
        <el-input
          v-model="searchQuery"
          placeholder="Search users..."
          prefix-icon="el-icon-search"
          clearable
        />
        <el-select v-model="statusFilter" placeholder="Status" clearable>
          <el-option label="All" value="" />
          <el-option label="Active" value="active" />
          <el-option label="Pending" value="pending" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
      </div>
    </div>

    <el-table
      v-loading="loading"
      :data="filteredUsers"
      style="width: 100%"
      border
    >
      <el-table-column prop="username" label="Username" sortable>
        <template #default="{ row }">
          <div class="user-info">
            <el-avatar :size="32" :src="getUserAvatar(row.username)" />
            <span>{{ row.username }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column prop="status" label="Status" width="120">
        <template #default="{ row }">
          <el-tag :type="getStatusType(row.status)">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="lastLogin" label="Last Login" sortable>
        <template #default="{ row }">
          {{ formatDate(row.lastLogin) }}
        </template>
      </el-table-column>

      <el-table-column prop="homeDir" label="Home Directory" />

      <el-table-column label="Actions" width="200" fixed="right">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="viewUserDetails(row)"
              icon="el-icon-view"
            >
              View
            </el-button>
            <el-button
              size="small"
              type="danger"
              :disabled="!canRemoveUser(row)"
              @click="confirmRemoveUser(row)"
              icon="el-icon-delete"
            >
              Remove
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- User Details Dialog -->
    <el-dialog
      v-model="detailsDialog.visible"
      :title="'User Details: ' + (detailsDialog.user?.username || '')"
      width="600px"
    >
      <div v-if="detailsDialog.user" class="user-details">
        <el-descriptions border>
          <el-descriptions-item label="Username">
            {{ detailsDialog.user.username }}
          </el-descriptions-item>
          <el-descriptions-item label="Status">
            <el-tag :type="getStatusType(detailsDialog.user.status)">
              {{ detailsDialog.user.status }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Home Directory">
            {{ detailsDialog.user.homeDir }}
          </el-descriptions-item>
          <el-descriptions-item label="Mail Directory">
            {{ detailsDialog.user.mailDir }}
          </el-descriptions-item>
          <el-descriptions-item label="Last Login">
            {{ formatDate(detailsDialog.user.lastLogin) }}
          </el-descriptions-item>
          <el-descriptions-item label="System Info">
            {{ detailsDialog.user.userInfo }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';
import { format } from 'date-fns';

export default {
  name: 'UsersList',
  
  setup() {
    const users = ref([]);
    const loading = ref(false);
    const searchQuery = ref('');
    const statusFilter = ref('');
    const detailsDialog = ref({
      visible: false,
      user: null
    });

    const filteredUsers = computed(() => {
      return users.value.filter(user => {
        const matchesSearch = !searchQuery.value || 
          user.username.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = !statusFilter.value || 
          user.status.toLowerCase() === statusFilter.value.toLowerCase();
        return matchesSearch && matchesStatus;
      });
    });

    const fetchUsers = async () => {
      try {
        loading.value = true;
        const response = await axios.get('/api/users/system');
        users.value = response.data.users.map(user => ({
          ...user,
          status: determineUserStatus(user)
        }));
      } catch (error) {
        ElMessage.error('Failed to fetch users');
        console.error('Error fetching users:', error);
      } finally {
        loading.value = false;
      }
    };

    const determineUserStatus = (user) => {
      if (!user.lastLogin || user.lastLogin.includes('Never logged in')) {
        return 'pending';
      }
      // Add more status logic as needed
      return 'active';
    };

    const getStatusType = (status) => {
      const types = {
        active: 'success',
        pending: 'warning',
        inactive: 'info'
      };
      return types[status] || 'info';
    };

    const getUserAvatar = (username) => {
      return `https://ui-avatars.com/api/?name=${username}&background=random`;
    };

    const formatDate = (date) => {
      if (!date || date.includes('Never')) return 'Never';
      try {
        return format(new Date(date), 'PPp');
      } catch (error) {
        return date;
      }
    };

    const viewUserDetails = (user) => {
      detailsDialog.value = {
        visible: true,
        user
      };
    };

    const canRemoveUser = (user) => {
      // Add logic to determine if user can be removed
      return true;
    };

    const confirmRemoveUser = (user) => {
      ElMessageBox.confirm(
        `Are you sure you want to remove user ${user.username}? This action cannot be undone.`,
        'Warning',
        {
          confirmButtonText: 'Remove',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      ).then(() => {
        removeUser(user);
      }).catch(() => {});
    };

    const removeUser = async (user) => {
      try {
        loading.value = true;
        await axios.delete(`/api/users/system/${user.username}`);
        ElMessage.success(`User ${user.username} removed successfully`);
        await fetchUsers();
      } catch (error) {
        ElMessage.error('Failed to remove user');
        console.error('Error removing user:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      loading,
      searchQuery,
      statusFilter,
      filteredUsers,
      detailsDialog,
      getStatusType,
      getUserAvatar,
      formatDate,
      viewUserDetails,
      canRemoveUser,
      confirmRemoveUser
    };
  }
};
</script>

<style scoped>
.users-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-details {
  margin-top: 20px;
}

:deep(.el-table) {
  margin-top: 20px;
}

:deep(.el-avatar) {
  background-color: #f0f2f5;
}
</style>
