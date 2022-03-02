import React, {useState} from "react";

export const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    return {value, onChange};
};

export type hookedInput = ReturnType<typeof useInput>;
