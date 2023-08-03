/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Milestone } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MilestoneUpdateFormInputValues = {
    suggestion?: string;
    milestone?: string;
    brandName?: string;
};
export declare type MilestoneUpdateFormValidationValues = {
    suggestion?: ValidationFunction<string>;
    milestone?: ValidationFunction<string>;
    brandName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MilestoneUpdateFormOverridesProps = {
    MilestoneUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    suggestion?: PrimitiveOverrideProps<TextFieldProps>;
    milestone?: PrimitiveOverrideProps<TextFieldProps>;
    brandName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MilestoneUpdateFormProps = React.PropsWithChildren<{
    overrides?: MilestoneUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    milestone?: Milestone;
    onSubmit?: (fields: MilestoneUpdateFormInputValues) => MilestoneUpdateFormInputValues;
    onSuccess?: (fields: MilestoneUpdateFormInputValues) => void;
    onError?: (fields: MilestoneUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MilestoneUpdateFormInputValues) => MilestoneUpdateFormInputValues;
    onValidate?: MilestoneUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MilestoneUpdateForm(props: MilestoneUpdateFormProps): React.ReactElement;
