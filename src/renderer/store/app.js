import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default useAppStore = defineStore('app', () => {
  // State
  const sidebarCollapsed = ref(false)
  const activeTool = ref('editor')
  const activeTab = ref('editor')
  const theme = ref('dark')
  const loading = ref(false)

  // 标签页数据
  const tabs = ref([
    { id: 'editor', name: '文件编辑', icon: 'Edit' }
  ])

  // Getters
  const sidebarWidth = computed(() =>
    sidebarCollapsed.value ? 50 : 200
  )

  const currentTheme = computed(() => theme.value)

  const tabCount = computed(() => tabs.value.length)

  // Actions
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const setActiveTool = (toolId) => {
    activeTool.value = toolId
    activeTab.value = toolId
  }

  const addTab = (tab) => {
    const exists = tabs.value.find(t => t.id === tab.id)
    if (!exists) {
      tabs.value.push(tab)
    }
    setActiveTool(tab.id)
  }

  const removeTab = (tabId) => {
    if (tabs.value.length <= 1) return

    const index = tabs.value.findIndex(t => t.id === tabId)
    tabs.value.splice(index, 1)

    if (activeTab.value === tabId) {
      activeTab.value = tabs.value[Math.max(0, index - 1)].id
      activeTool.value = activeTab.value
    }
  }

  const switchTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme.value)
  }

  const setLoading = (isLoading) => {
    loading.value = isLoading
  }

  return {
    // State
    sidebarCollapsed,
    activeTool,
    activeTab,
    theme,
    loading,
    tabs,

    // Getters
    sidebarWidth,
    currentTheme,
    tabCount,

    // Actions
    toggleSidebar,
    setActiveTool,
    addTab,
    removeTab,
    switchTheme,
    setLoading
  }
})