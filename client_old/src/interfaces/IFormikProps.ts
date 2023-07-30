export interface initialLoginProps {
    email: string;
    password: string;
}

export interface initialRegisterProps extends initialLoginProps {
    repeat_password: string;
}

export interface initialAddCategoriesProps {
    name: string;
    file: null | string | ArrayBuffer;
}
