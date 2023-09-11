/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type FollowCreateFormInputValues = {};
export declare type FollowCreateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type FollowCreateFormOverridesProps = {
    FollowCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type FollowCreateFormProps = React.PropsWithChildren<{
    overrides?: FollowCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: FollowCreateFormInputValues) => FollowCreateFormInputValues;
    onSuccess?: (fields: FollowCreateFormInputValues) => void;
    onError?: (fields: FollowCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: FollowCreateFormInputValues) => FollowCreateFormInputValues;
    onValidate?: FollowCreateFormValidationValues;
} & React.CSSProperties>;
export default function FollowCreateForm(props: FollowCreateFormProps): React.ReactElement;
