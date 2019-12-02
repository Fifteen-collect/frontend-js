const SETTINGS_KEY = 'options';

export interface Options {
    [option: string]: any,
}

export function getOptions(): Options {
    return <Options>(JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {});
}

export function getOption(option: string): any {
    return getOptions()[option];
}

export function saveOption(option: string, value: any) {
    const options = getOptions();

    options[option] = value;

    localStorage.setItem(SETTINGS_KEY, JSON.stringify(options));
}
