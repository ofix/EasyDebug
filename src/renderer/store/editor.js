import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default useEditorStore = defineStore('editor', () => {
  // State
  const currentFile = ref(null)
  const content = ref('')
  const isDirty = ref(false)
  const cursorPosition = ref({ line: 1, column: 1 })
  const language = ref('plaintext')
  const findText = ref('')
  const replaceText = ref('')

  // Getters
  const fileName = computed(() =>
    currentFile.value?.name || '未命名文件'
  )

  const fileExtension = computed(() =>
    fileName.value.split('.').pop() || ''
  )

  const wordCount = computed(() =>
    content.value.trim() ? content.value.split(/\s+/).length : 0
  )

  const lineCount = computed(() =>
    content.value ? content.value.split('\n').length : 1
  )

  // Actions
  const newFile = () => {
    currentFile.value = null
    content.value = ''
    isDirty.value = false
    language.value = 'plaintext'
  }

  const openFile = async (file) => {
    // 模拟文件读取
    const fileContent = await new Promise(resolve =>
      setTimeout(() => resolve(`// ${file.name}\n// 文件内容...`), 500)
    )

    currentFile.value = file
    content.value = fileContent
    isDirty.value = false

    // 根据文件扩展名设置语言
    setLanguageByExtension(file.name.split('.').pop())
  }

  const saveFile = async () => {
    if (!currentFile.value) {
      // 弹出保存对话框
      return false
    }

    // 模拟保存
    await new Promise(resolve => setTimeout(resolve, 500))
    isDirty.value = false
    return true
  }

  const updateContent = (newContent) => {
    content.value = newContent
    isDirty.value = true
  }

  const setCursorPosition = (position) => {
    cursorPosition.value = position
  }

  const setLanguageByExtension = (ext) => {
    const languageMap = {
      'js': 'javascript',
      'ts': 'typescript',
      'vue': 'vue',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'py': 'python'
    }
    language.value = languageMap[ext] || 'plaintext'
  }

  const findInContent = (text) => {
    findText.value = text
    if (!text) return []

    const lines = content.value.split('\n')
    const results = []

    lines.forEach((line, index) => {
      if (line.includes(text)) {
        results.push({ line: index + 1, content: line })
      }
    })

    return results
  }

  const replaceInContent = (find, replace) => {
    if (!find) return

    const newContent = content.value.replace(
      new RegExp(find, 'g'),
      replace
    )
    updateContent(newContent)
  }

  return {
    // State
    currentFile,
    content,
    isDirty,
    cursorPosition,
    language,
    findText,
    replaceText,

    // Getters
    fileName,
    fileExtension,
    wordCount,
    lineCount,

    // Actions
    newFile,
    openFile,
    saveFile,
    updateContent,
    setCursorPosition,
    setLanguageByExtension,
    findInContent,
    replaceInContent
  }
})