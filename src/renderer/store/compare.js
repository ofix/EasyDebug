import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export default useCompareStore = defineStore('compare', () => {
  // State
  const leftFile = ref(null)
  const rightFile = ref(null)
  const leftContent = ref('')
  const rightContent = ref('')
  const differences = ref([])
  const compareMode = ref('text') // text, json, xml

  // Getters
  const hasFiles = computed(() =>
    leftFile.value && rightFile.value
  )

  const differenceCount = computed(() => differences.value.length)

  const isIdentical = computed(() =>
    leftContent.value === rightContent.value
  )

  // Actions
  const setLeftFile = async (file) => {
    leftFile.value = file
    leftContent.value = await readFileContent(file)
    compareFiles()
  }

  const setRightFile = async (file) => {
    rightFile.value = file
    rightContent.value = await readFileContent(file)
    compareFiles()
  }

  const readFileContent = (file) => {
    return new Promise(resolve =>
      setTimeout(() => resolve(`// ${file.name} 的内容...`), 300)
    )
  }

  const compareFiles = () => {
    if (!leftContent.value || !rightContent.value) {
      differences.value = []
      return
    }

    // 简单的文本比较逻辑
    const leftLines = leftContent.value.split('\n')
    const rightLines = rightContent.value.split('\n')
    const diffs = []

    const maxLength = Math.max(leftLines.length, rightLines.length)

    for (let i = 0; i < maxLength; i++) {
      if (leftLines[i] !== rightLines[i]) {
        diffs.push({
          line: i + 1,
          left: leftLines[i] || '',
          right: rightLines[i] || '',
          type: leftLines[i] && rightLines[i] ? 'modified' :
            leftLines[i] ? 'deleted' : 'added'
        })
      }
    }

    differences.value = diffs
  }

  const clearFiles = () => {
    leftFile.value = null
    rightFile.value = null
    leftContent.value = ''
    rightContent.value = ''
    differences.value = []
  }

  const setCompareMode = (mode) => {
    compareMode.value = mode
    compareFiles() // 重新比较
  }

  return {
    // State
    leftFile,
    rightFile,
    leftContent,
    rightContent,
    differences,
    compareMode,

    // Getters
    hasFiles,
    differenceCount,
    isIdentical,

    // Actions
    setLeftFile,
    setRightFile,
    clearFiles,
    setCompareMode,
    compareFiles
  }
})