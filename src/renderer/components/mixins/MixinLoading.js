
import { ElLoading } from 'element-plus'

let loadingInstance = null;
const MixinLoading = {
  methods: {
    showLoadingBar () {
      loadingInstance = ElLoading.service({
        lock: true,
        text: "加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true,
      });
    },
    hideLoadingBar () {
      if (loadingInstance) {
        loadingInstance.close();
      }
    },
  },
};

export default MixinLoading;
