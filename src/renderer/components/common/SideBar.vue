<template>
    <div class="side-bar" :class="{ collapsed }">
        <!-- Logo 区域 -->
        <div class="logo" @click="$emit('toggle')">
            <el-icon v-if="collapsed">
                <ElementPlus />
            </el-icon>
            <span v-else>EasyDebug</span>
        </div>

        <!-- 工具按钮 -->
        <div class="tool-icon-btns">
            <div v-for="btn in toolIconBtns" :key="btn.id" class="tool-item" :class="{ active: activeTool === tool.id }"
                @click="onToolBtnClick(btn)">
                <el-tooltip :content="btn.name" placement="right" :disabled="!collapsed">
                    <div class="tool-content">
                        <el-icon>
                            <component :is="tool.icon" />
                        </el-icon>
                        <span v-if="!collapsed">{{ btn.name }}</span>
                    </div>
                </el-tooltip>
            </div>
        </div>

        <!-- 底部设置 -->
        <div class="bottom">
            <div class="tool-item" @click="$router.push('/settings')">
                <el-tooltip content="设置" placement="right" :disabled="!collapsed">
                    <div class="tool-content">
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span v-if="!collapsed">设置</span>
                    </div>
                </el-tooltip>
            </div>
        </div>
    </div>
</template>

<script>
import { ElementPlus, Setting } from '@element-plus/icons-vue'

export default {
    name: 'SideBar',
    components: { ElementPlus, Setting },
    props: {
        collapsed: Boolean,
        activeTool: String
    },
    emits: ['tool-btn-change', 'toggle'],
    data() {
        return {
            toolIconBtns: [
                { id: 'editor', name: '文件编辑', icon: 'Edit', component: 'FileEditor' },
                { id: 'compare', name: '文件比对', icon: 'CopyDocument', component: 'FileCompare' },
                { id: 'search', name: '搜索替换', icon: 'Search', component: 'SearchReplace' },
                { id: 'generate', name: '代码生成', icon: 'MagicStick', component: 'CodeGenerator' },
                { id: 'debug', name: '调试工具', icon: 'Setting', component: 'DebugTool' }
            ]
        }
    },
    methods: {
        onToolBtnClick(tool) {
            this.$emit('tool-btn-change', tool)
        }
    }
}
</script>

<style lang="scss" scoped>
.side-bar {
    width: 200px;
    height: 100vh;
    background: #2d2d30;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #3e3e42;
    transition: width 0.3s ease;

    &.collapsed {
        width: 50px;
    }

    .logo {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ccc;
        font-weight: bold;
        cursor: pointer;
        border-bottom: 1px solid #3e3e42;
        transition: background 0.2s;

        &:hover {
            background: #3c3c3c;
        }

        span {
            font-size: 16px;
        }
    }

    .tool-icon-btns {
        flex: 1;
        padding: 10px 0;
    }

    .tool-item {
        margin: 0 8px 4px;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            background: #2a2d2e;
        }

        &.active {
            background: #37373d;
            border-left: 2px solid #007acc;
        }

        .tool-content {
            display: flex;
            align-items: center;
            padding: 10px 12px;
            color: #ccc;
            gap: 10px;

            span {
                font-size: 13px;
                white-space: nowrap;
            }
        }
    }

    .bottom {
        padding: 10px 0;
        border-top: 1px solid #3e3e42;
    }
}
</style>