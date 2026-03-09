// 获取assets静态资源
export const getAssetsFile = (url: string) => {
    return new URL(`../assets/images/${url}`, import.meta.url).href;
};


export function replaceWithAsterisks(value:string) {
    if (typeof value !== 'string') {
        throw new Error('输入必须是数值或字符串');
    }
    
    // 将输入转换为字符串，并将每个字符替换为星号
    const stringValue = value.toString();
    return '*'.repeat(stringValue.length);
}

export const FORM_RULES =[(value: string) => !!value || 'Field is required']
  
  

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;

    return function(...args: Parameters<T>) {
        const context = this;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}