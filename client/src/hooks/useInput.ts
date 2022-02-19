import React, {useState} from "react";

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const clear = () => {
        setValue('');
    };

    return {value, onChange, clear};
};

export type hookedInput = ReturnType<typeof useInput>;
