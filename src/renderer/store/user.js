import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default useUserStore = defineStore('user', () => {
  // State
  const userInfo = ref(null)
  const token = ref('')
  const permissions = ref([])
  const recentFiles = ref([])
  const favorites = ref([])

  // Getters
  const isLoggedIn = computed(() => !!token.value)

  const userName = computed(() => userInfo.value?.name || '游客')

  const userAvatar = computed(() => userInfo.value?.avatar || '')

  const canEdit = computed(() =>
    permissions.value.includes('edit') || !isLoggedIn.value
  )

  // Actions
  const login = async (loginData) => {
    // 模拟登录
    const response = await new Promise(resolve =>
      setTimeout(() => resolve({
        user: { id: 1, name: '用户', avatar: '' },
        token: 'mock-token',
        permissions: ['edit', 'view']
      }), 1000)
    )

    userInfo.value = response.user
    token.value = response.token
    permissions.value = response.permissions

    return response
  }

  const logout = () => {
    userInfo.value = null
    token.value = ''
    permissions.value = []
    localStorage.removeItem('user-token')
  }

  const addRecentFile = (file) => {
    const exists = recentFiles.value.find(f => f.path === file.path)
    if (exists) {
      // 移到最前面
      recentFiles.value = recentFiles.value.filter(f => f.path !== file.path)
    }
    recentFiles.value.unshift(file)

    // 只保留最近10个文件
    if (recentFiles.value.length > 10) {
      recentFiles.value = recentFiles.value.slice(0, 10)
    }
  }

  const toggleFavorite = (file) => {
    const exists = favorites.value.find(f => f.path === file.path)
    if (exists) {
      favorites.value = favorites.value.filter(f => f.path !== file.path)
    } else {
      favorites.value.push(file)
    }
  }

  return {
    // State
    userInfo,
    token,
    permissions,
    recentFiles,
    favorites,

    // Getters
    isLoggedIn,
    userName,
    userAvatar,
    canEdit,

    // Actions
    login,
    logout,
    addRecentFile,
    toggleFavorite
  }
})