// here exists some error I thought eslint should discover
export function myadd(x: number): number
export function myadd(x: string): string

// too many blank lines






export function myadd(x: string | number) {
    // use === instead of ==
    // only one space around ==
    // bracket { should not start a new line
    if (typeof x ==    'number')
    {
        return x + 1;
    }
    if (typeof x === 'string') {
        return x + '1';
    }
    throw new Error("wrong type");
}
