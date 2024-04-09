import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus'
import type { MaybeRefOrGetter } from 'vue';

export function useCopy({ source, text = 'Copied to the clipboard', createToast = true }: { source?: MaybeRefOrGetter<string>; text?: string; createToast?: boolean } = {}) {
    const { copy, copied, ...rest } = useClipboard({
        source,
        legacy: true,
    });

    const message = ElMessage

    return {
        ...rest,
        isJustCopied: copied,
        async copy(content?: string, { notificationMessage }: { notificationMessage?: string } = {}) {
            if (source) {
                await copy();
            }
            else {
                await copy(content);
            }

            if (createToast) {
                message.success(notificationMessage ?? text);
            }
        },
    };
}