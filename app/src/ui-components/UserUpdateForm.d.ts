/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { User } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserUpdateFormInputValues = {
    name?: string;
    email?: string;
    update?: string;
    filePath?: string;
    strength?: number;
    isBusiness?: boolean;
    location?: string;
    bio?: string;
    parentBrand?: string;
    isVerified?: boolean;
    hasCompletedForm?: boolean;
    industry?: string;
};
export declare type UserUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    update?: ValidationFunction<string>;
    filePath?: ValidationFunction<string>;
    strength?: ValidationFunction<number>;
    isBusiness?: ValidationFunction<boolean>;
    location?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    parentBrand?: ValidationFunction<string>;
    isVerified?: ValidationFunction<boolean>;
    hasCompletedForm?: ValidationFunction<boolean>;
    industry?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserUpdateFormOverridesProps = {
    UserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    update?: PrimitiveOverrideProps<TextFieldProps>;
    filePath?: PrimitiveOverrideProps<TextFieldProps>;
    strength?: PrimitiveOverrideProps<TextFieldProps>;
    isBusiness?: PrimitiveOverrideProps<SwitchFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    parentBrand?: PrimitiveOverrideProps<TextFieldProps>;
    isVerified?: PrimitiveOverrideProps<SwitchFieldProps>;
    hasCompletedForm?: PrimitiveOverrideProps<SwitchFieldProps>;
    industry?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    user?: User;
    onSubmit?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onSuccess?: (fields: UserUpdateFormInputValues) => void;
    onError?: (fields: UserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserUpdateFormInputValues) => UserUpdateFormInputValues;
    onValidate?: UserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserUpdateForm(props: UserUpdateFormProps): React.ReactElement;
