<template>
    <div class="default-layout">
        <!-- 侧边栏 -->
        <SideBar :collapsed="sidebarCollapsed" :active-tool="activeToolBtn" @tool-btn-change="onToolBtnChange"
            @toggle="toggleSidebar" />

        <!-- 主内容区 -->
        <div class="main-content" :class="{ collapsed: sidebarCollapsed }">
            <!-- 标签栏 -->
            <div class="tab-bar" v-if="tabs.length">
                <div v-for="tab in tabs" :key="tab.id" class="tab-item" :class="{ active: activeTab === tab.id }"
                    @click="switchTab(tab.id)" @contextmenu.prevent="showContextMenu(tab, $event)">
                    <el-icon>
                        <component :is="tab.icon" />
                    </el-icon>
                    <span>{{ tab.name }}</span>
                    <el-icon class="close-btn" @click.stop="closeTab(tab.id)">
                        <Close />
                    </el-icon>
                </div>
            </div>

            <!-- 内容区域 -->
            <div class="content-area">
                <component :is="currentComponent" />
            </div>
        </div>
    </div>
</template>

<script>
import { Close } from '@element-plus/icons-vue'
import SideBar from './SideBar.vue'

// 动态导入组件
const components = {
    FileEditor: () => import('@/views/editor/FileEditor'),
    FileCompare: () => import('@/views/compare/FileCompare.vue'),
    CodeGenerator: () => import('@/views/generator/CodeGenerator.vue'),
}

export default {
    name: 'DefaultLayout',
    components: { SideBar, Close },
    data() {
        return {
            sidebarCollapsed: false,
            activeToolBtn: 'editor',
            activeTab: 'editor',
            tabs: [
                { id: 'editor', name: '文件编辑', icon: 'Edit', component: 'FileEditor' }
            ]
        }
    },
    computed: {
        currentComponent() {
            const tab = this.tabs.find(t => t.id === this.activeTab)
            return tab ? components[tab.component] : components.FileEditor
        }
    },
    methods: {
        onToolBtnChange(tool) {
            this.activeToolBtn = tool.id

            // 添加或激活标签
            const existingTab = this.tabs.find(t => t.id === tool.id)
            if (!existingTab) {
                this.tabs.push({
                    id: tool.id,
                    name: tool.name,
                    icon: tool.icon,
                    component: tool.component
                })
            }

            this.activeTab = tool.id
        },

        switchTab(tabId) {
            this.activeTab = tabId
            this.activeToolBtn = tabId
        },

        closeTab(tabId) {
            if (this.tabs.length <= 1) return

            const index = this.tabs.findIndex(t => t.id === tabId)
            this.tabs.splice(index, 1)

            if (this.activeTab === tabId) {
                this.activeTab = this.tabs[Math.max(0, index - 1)].id
                this.activeToolBtn = this.activeTab
            }
        },

        toggleSidebar() {
            this.sidebarCollapsed = !this.sidebarCollapsed
        },

        showContextMenu(tab, event) {
            // 可以在这里实现右键菜单
            console.log('右键菜单:', tab, event)
        }
    }
}
</script>

<style lang="scss" scoped>
.default-layout {
    display: flex;
    height: 100vh;
    background: #1e1e1e;
}

.main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 200px;
    transition: margin-left 0.3s ease;

    &.collapsed {
        margin-left: 50px;
    }
}

.tab-bar {
    display: flex;
    background: #2d2d30;
    border-bottom: 1px solid #3e3e42;
    min-height: 36px;
}

.tab-item {
    display: flex;
    align-items: center;
    padding: 0 16px;
    background: #2d2d30;
    color: #ccc;
    cursor: pointer;
    border-right: 1px solid #3e3e42;
    gap: 8px;
    transition: all 0.2s;
    font-size: 13px;

    &:hover {
        background: #2a2d2e;
        color: #fff;

        .close-btn {
            opacity: 1;
        }
    }

    &.active {
        background: #1e1e1e;
        color: #fff;
    }

    .close-btn {
        opacity: 0;
        transition: opacity 0.2s;
        margin-left: 4px;

        &:hover {
            background: #464647;
            border-radius: 2px;
        }
    }
}

.content-area {
    flex: 1;
    background: #1e1e1e;
    overflow: hidden;
}
</style>