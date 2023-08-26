/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Suggestion } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function SuggestionUpdateForm(props) {
  const {
    id: idProp,
    suggestion: suggestionModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    businessName: "",
    suggestion: "",
    verified: false,
    icon: "",
    unique: false,
    show: false,
    compliment: false,
  };
  const [businessName, setBusinessName] = React.useState(
    initialValues.businessName
  );
  const [suggestion, setSuggestion] = React.useState(initialValues.suggestion);
  const [verified, setVerified] = React.useState(initialValues.verified);
  const [icon, setIcon] = React.useState(initialValues.icon);
  const [unique, setUnique] = React.useState(initialValues.unique);
  const [show, setShow] = React.useState(initialValues.show);
  const [compliment, setCompliment] = React.useState(initialValues.compliment);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = suggestionRecord
      ? { ...initialValues, ...suggestionRecord }
      : initialValues;
    setBusinessName(cleanValues.businessName);
    setSuggestion(cleanValues.suggestion);
    setVerified(cleanValues.verified);
    setIcon(cleanValues.icon);
    setUnique(cleanValues.unique);
    setShow(cleanValues.show);
    setCompliment(cleanValues.compliment);
    setErrors({});
  };
  const [suggestionRecord, setSuggestionRecord] =
    React.useState(suggestionModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Suggestion, idProp)
        : suggestionModelProp;
      setSuggestionRecord(record);
    };
    queryData();
  }, [idProp, suggestionModelProp]);
  React.useEffect(resetStateValues, [suggestionRecord]);
  const validations = {
    businessName: [],
    suggestion: [],
    verified: [],
    icon: [],
    unique: [],
    show: [],
    compliment: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          businessName,
          suggestion,
          verified,
          icon,
          unique,
          show,
          compliment,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(
            Suggestion.copyOf(suggestionRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SuggestionUpdateForm")}
      {...rest}
    >
      <TextField
        label="Business name"
        isRequired={false}
        isReadOnly={false}
        value={businessName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              businessName: value,
              suggestion,
              verified,
              icon,
              unique,
              show,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.businessName ?? value;
          }
          if (errors.businessName?.hasError) {
            runValidationTasks("businessName", value);
          }
          setBusinessName(value);
        }}
        onBlur={() => runValidationTasks("businessName", businessName)}
        errorMessage={errors.businessName?.errorMessage}
        hasError={errors.businessName?.hasError}
        {...getOverrideProps(overrides, "businessName")}
      ></TextField>
      <TextField
        label="Suggestion"
        isRequired={false}
        isReadOnly={false}
        value={suggestion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion: value,
              verified,
              icon,
              unique,
              show,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.suggestion ?? value;
          }
          if (errors.suggestion?.hasError) {
            runValidationTasks("suggestion", value);
          }
          setSuggestion(value);
        }}
        onBlur={() => runValidationTasks("suggestion", suggestion)}
        errorMessage={errors.suggestion?.errorMessage}
        hasError={errors.suggestion?.hasError}
        {...getOverrideProps(overrides, "suggestion")}
      ></TextField>
      <SwitchField
        label="Verified"
        defaultChecked={false}
        isDisabled={false}
        isChecked={verified}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion,
              verified: value,
              icon,
              unique,
              show,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.verified ?? value;
          }
          if (errors.verified?.hasError) {
            runValidationTasks("verified", value);
          }
          setVerified(value);
        }}
        onBlur={() => runValidationTasks("verified", verified)}
        errorMessage={errors.verified?.errorMessage}
        hasError={errors.verified?.hasError}
        {...getOverrideProps(overrides, "verified")}
      ></SwitchField>
      <TextField
        label="Icon"
        isRequired={false}
        isReadOnly={false}
        value={icon}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion,
              verified,
              icon: value,
              unique,
              show,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.icon ?? value;
          }
          if (errors.icon?.hasError) {
            runValidationTasks("icon", value);
          }
          setIcon(value);
        }}
        onBlur={() => runValidationTasks("icon", icon)}
        errorMessage={errors.icon?.errorMessage}
        hasError={errors.icon?.hasError}
        {...getOverrideProps(overrides, "icon")}
      ></TextField>
      <SwitchField
        label="Unique"
        defaultChecked={false}
        isDisabled={false}
        isChecked={unique}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion,
              verified,
              icon,
              unique: value,
              show,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.unique ?? value;
          }
          if (errors.unique?.hasError) {
            runValidationTasks("unique", value);
          }
          setUnique(value);
        }}
        onBlur={() => runValidationTasks("unique", unique)}
        errorMessage={errors.unique?.errorMessage}
        hasError={errors.unique?.hasError}
        {...getOverrideProps(overrides, "unique")}
      ></SwitchField>
      <SwitchField
        label="Show"
        defaultChecked={false}
        isDisabled={false}
        isChecked={show}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion,
              verified,
              icon,
              unique,
              show: value,
              compliment,
            };
            const result = onChange(modelFields);
            value = result?.show ?? value;
          }
          if (errors.show?.hasError) {
            runValidationTasks("show", value);
          }
          setShow(value);
        }}
        onBlur={() => runValidationTasks("show", show)}
        errorMessage={errors.show?.errorMessage}
        hasError={errors.show?.hasError}
        {...getOverrideProps(overrides, "show")}
      ></SwitchField>
      <SwitchField
        label="Compliment"
        defaultChecked={false}
        isDisabled={false}
        isChecked={compliment}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              businessName,
              suggestion,
              verified,
              icon,
              unique,
              show,
              compliment: value,
            };
            const result = onChange(modelFields);
            value = result?.compliment ?? value;
          }
          if (errors.compliment?.hasError) {
            runValidationTasks("compliment", value);
          }
          setCompliment(value);
        }}
        onBlur={() => runValidationTasks("compliment", compliment)}
        errorMessage={errors.compliment?.errorMessage}
        hasError={errors.compliment?.hasError}
        {...getOverrideProps(overrides, "compliment")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || suggestionModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || suggestionModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
