import { ChangeEvent, useState } from 'react';

export function useTextInput<T>(initValue: T) {
    const [value, setValue] = useState<T>(initValue);

    function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value as unknown as T);
    }

    return [value, onChangeHandler] as const;
} 