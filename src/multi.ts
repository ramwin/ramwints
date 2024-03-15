// 如果要导出，所有的重载签名都要导出
export function myadd(x: number): number
export function myadd(x: string): string




export function myadd(x: string | number) {
    if (typeof x ==    'number')
    {
        return x + 1;
    }
    if (typeof x === 'string') {
        return x + '1';
    }
    throw new Error("wrong type");
}
