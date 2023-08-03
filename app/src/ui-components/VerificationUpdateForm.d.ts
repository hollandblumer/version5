/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Verification } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type VerificationUpdateFormInputValues = {
    suggestion?: string;
    milestone?: string;
    userApprovalName?: string;
    isVerified?: boolean;
    filePathApproval?: string;
    brandName?: string;
    userDisapprovalName?: string;
    filePathDisapproval?: string;
};
export declare type VerificationUpdateFormValidationValues = {
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
export declare type VerificationUpdateFormOverridesProps = {
    VerificationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    milestone?: PrimitiveOverrideProps<TextFieldProps>;
    userApprovalName?: PrimitiveOverrideProps<TextFieldProps>;
    isVerified?: PrimitiveOverrideProps<SwitchFieldProps>;
    filePathApproval?: PrimitiveOverrideProps<TextFieldProps>;
    brandName?: PrimitiveOverrideProps<TextFieldProps>;
    userDisapprovalName?: PrimitiveOverrideProps<TextFieldProps>;
    filePathDisapproval?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type VerificationUpdateFormProps = React.PropsWithChildren<{
    overrides?: VerificationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    verification?: Verification;
    onSubmit?: (fields: VerificationUpdateFormInputValues) => VerificationUpdateFormInputValues;
    onSuccess?: (fields: VerificationUpdateFormInputValues) => void;
    onError?: (fields: VerificationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: VerificationUpdateFormInputValues) => VerificationUpdateFormInputValues;
    onValidate?: VerificationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function VerificationUpdateForm(props: VerificationUpdateFormProps): React.ReactElement;
