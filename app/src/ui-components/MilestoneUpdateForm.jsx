/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Milestone } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MilestoneUpdateForm(props) {
  const {
    id: idProp,
    milestone: milestoneModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    suggestion: "",
    milestone: "",
    brandName: "",
  };
  const [suggestion, setSuggestion] = React.useState(initialValues.suggestion);
  const [milestone, setMilestone] = React.useState(initialValues.milestone);
  const [brandName, setBrandName] = React.useState(initialValues.brandName);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = milestoneRecord
      ? { ...initialValues, ...milestoneRecord }
      : initialValues;
    setSuggestion(cleanValues.suggestion);
    setMilestone(cleanValues.milestone);
    setBrandName(cleanValues.brandName);
    setErrors({});
  };
  const [milestoneRecord, setMilestoneRecord] =
    React.useState(milestoneModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Milestone, idProp)
        : milestoneModelProp;
      setMilestoneRecord(record);
    };
    queryData();
  }, [idProp, milestoneModelProp]);
  React.useEffect(resetStateValues, [milestoneRecord]);
  const validations = {
    suggestion: [],
    milestone: [],
    brandName: [],
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
          suggestion,
          milestone,
          brandName,
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Milestone.copyOf(milestoneRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MilestoneUpdateForm")}
      {...rest}
    >
      <TextField
        label="Suggestion"
        isRequired={false}
        isReadOnly={false}
        value={suggestion}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion: value,
              milestone,
              brandName,
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
      <TextField
        label="Milestone"
        isRequired={false}
        isReadOnly={false}
        value={milestone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone: value,
              brandName,
            };
            const result = onChange(modelFields);
            value = result?.milestone ?? value;
          }
          if (errors.milestone?.hasError) {
            runValidationTasks("milestone", value);
          }
          setMilestone(value);
        }}
        onBlur={() => runValidationTasks("milestone", milestone)}
        errorMessage={errors.milestone?.errorMessage}
        hasError={errors.milestone?.hasError}
        {...getOverrideProps(overrides, "milestone")}
      ></TextField>
      <TextField
        label="Brand name"
        isRequired={false}
        isReadOnly={false}
        value={brandName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              suggestion,
              milestone,
              brandName: value,
            };
            const result = onChange(modelFields);
            value = result?.brandName ?? value;
          }
          if (errors.brandName?.hasError) {
            runValidationTasks("brandName", value);
          }
          setBrandName(value);
        }}
        onBlur={() => runValidationTasks("brandName", brandName)}
        errorMessage={errors.brandName?.errorMessage}
        hasError={errors.brandName?.hasError}
        {...getOverrideProps(overrides, "brandName")}
      ></TextField>
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
          isDisabled={!(idProp || milestoneModelProp)}
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
              !(idProp || milestoneModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
