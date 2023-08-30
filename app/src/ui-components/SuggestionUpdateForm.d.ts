/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Suggestion } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SuggestionUpdateFormInputValues = {
    businessName?: string;
    suggestion?: string;
    verified?: boolean;
    icon?: string;
    unique?: boolean;
    show?: boolean;
    feature?: boolean;
    compliment?: boolean;
};
export declare type SuggestionUpdateFormValidationValues = {
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
export declare type SuggestionUpdateFormOverridesProps = {
    SuggestionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    businessName?: PrimitiveOverrideProps<TextFieldProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    verified?: PrimitiveOverrideProps<SwitchFieldProps>;
    icon?: PrimitiveOverrideProps<TextFieldProps>;
    unique?: PrimitiveOverrideProps<SwitchFieldProps>;
    show?: PrimitiveOverrideProps<SwitchFieldProps>;
    feature?: PrimitiveOverrideProps<SwitchFieldProps>;
    compliment?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type SuggestionUpdateFormProps = React.PropsWithChildren<{
    overrides?: SuggestionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    suggestion?: Suggestion;
    onSubmit?: (fields: SuggestionUpdateFormInputValues) => SuggestionUpdateFormInputValues;
    onSuccess?: (fields: SuggestionUpdateFormInputValues) => void;
    onError?: (fields: SuggestionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SuggestionUpdateFormInputValues) => SuggestionUpdateFormInputValues;
    onValidate?: SuggestionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SuggestionUpdateForm(props: SuggestionUpdateFormProps): React.ReactElement;
