/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VerificationCreateFormInputValues = {
    suggestion?: string;
    milestone?: string;
    userApprovalName?: string;
    isVerified?: boolean;
    filePathApproval?: string;
    brandName?: string;
    userDisapprovalName?: string;
    filePathDisapproval?: string;
};
export declare type VerificationCreateFormValidationValues = {
    suggestion?: ValidationFunction<string>;
    milestone?: ValidationFunction<string>;
    userApprovalName?: ValidationFunction<string>;
    isVerified?: ValidationFunction<boolean>;
    filePathApproval?: ValidationFunction<string>;
    brandName?: ValidationFunction<string>;
    userDisapprovalName?: ValidationFunction<string>;
    filePathDisapproval?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type VerificationCreateFormOverridesProps = {
    VerificationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    milestone?: PrimitiveOverrideProps<TextFieldProps>;
    userApprovalName?: PrimitiveOverrideProps<TextFieldProps>;
    isVerified?: PrimitiveOverrideProps<SwitchFieldProps>;
    filePathApproval?: PrimitiveOverrideProps<TextFieldProps>;
    brandName?: PrimitiveOverrideProps<TextFieldProps>;
    userDisapprovalName?: PrimitiveOverrideProps<TextFieldProps>;
    filePathDisapproval?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VerificationCreateFormProps = React.PropsWithChildren<{
    overrides?: VerificationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: VerificationCreateFormInputValues) => VerificationCreateFormInputValues;
    onSuccess?: (fields: VerificationCreateFormInputValues) => void;
    onError?: (fields: VerificationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VerificationCreateFormInputValues) => VerificationCreateFormInputValues;
    onValidate?: VerificationCreateFormValidationValues;
} & React.CSSProperties>;
export default function VerificationCreateForm(props: VerificationCreateFormProps): React.ReactElement;
