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
export declare type SuggestionCreateFormInputValues = {
    businessName?: string;
    suggestion?: string;
    verified?: boolean;
    icon?: string;
    unique?: boolean;
    show?: boolean;
    feature?: boolean;
    compliment?: boolean;
};
export declare type SuggestionCreateFormValidationValues = {
    businessName?: ValidationFunction<string>;
    suggestion?: ValidationFunction<string>;
    verified?: ValidationFunction<boolean>;
    icon?: ValidationFunction<string>;
    unique?: ValidationFunction<boolean>;
    show?: ValidationFunction<boolean>;
    feature?: ValidationFunction<boolean>;
    compliment?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SuggestionCreateFormOverridesProps = {
    SuggestionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    businessName?: PrimitiveOverrideProps<TextFieldProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    verified?: PrimitiveOverrideProps<SwitchFieldProps>;
    icon?: PrimitiveOverrideProps<TextFieldProps>;
    unique?: PrimitiveOverrideProps<SwitchFieldProps>;
    show?: PrimitiveOverrideProps<SwitchFieldProps>;
    feature?: PrimitiveOverrideProps<SwitchFieldProps>;
    compliment?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SuggestionCreateFormProps = React.PropsWithChildren<{
    overrides?: SuggestionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SuggestionCreateFormInputValues) => SuggestionCreateFormInputValues;
    onSuccess?: (fields: SuggestionCreateFormInputValues) => void;
    onError?: (fields: SuggestionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SuggestionCreateFormInputValues) => SuggestionCreateFormInputValues;
    onValidate?: SuggestionCreateFormValidationValues;
} & React.CSSProperties>;
export default function SuggestionCreateForm(props: SuggestionCreateFormProps): React.ReactElement;
