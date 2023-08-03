/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MilestoneCreateFormInputValues = {
    suggestion?: string;
    milestone?: string;
    brandName?: string;
};
export declare type MilestoneCreateFormValidationValues = {
    suggestion?: ValidationFunction<string>;
    milestone?: ValidationFunction<string>;
    brandName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MilestoneCreateFormOverridesProps = {
    MilestoneCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    milestone?: PrimitiveOverrideProps<TextFieldProps>;
    brandName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MilestoneCreateFormProps = React.PropsWithChildren<{
    overrides?: MilestoneCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MilestoneCreateFormInputValues) => MilestoneCreateFormInputValues;
    onSuccess?: (fields: MilestoneCreateFormInputValues) => void;
    onError?: (fields: MilestoneCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MilestoneCreateFormInputValues) => MilestoneCreateFormInputValues;
    onValidate?: MilestoneCreateFormValidationValues;
} & React.CSSProperties>;
export default function MilestoneCreateForm(props: MilestoneCreateFormProps): React.ReactElement;
