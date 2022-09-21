import { ElMessageBox, ElLoading } from 'element-plus';

let loadingInstance: ReturnType<typeof ElLoading.service>;

// 确认窗体
export const ElModalConfirm = (content: string) => {
    return ElMessageBox.confirm(content, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    });
};
// 提交内容
export const ElModalPrompt = (content: string) => {
    return ElMessageBox.prompt(content, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    });
};
// 打开遮罩层
export const ElModalLoading = (content: string) => {
    loadingInstance = ElLoading.service({
        lock: true,
        text: content,
        background: 'rgba(0, 0, 0, 0.7)',
    });
};
// 关闭遮罩层
export const ElModalCloseLoading = () => {
    loadingInstance.close();
};
