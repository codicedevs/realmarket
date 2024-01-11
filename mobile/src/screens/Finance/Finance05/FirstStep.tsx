import React from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  StyleService,
  useStyleSheet,
  Input,
  Datepicker,
  Button,
} from "@ui-kitten/components";
// ----------------------------- Components && Elements -----------------------
import dayjs from "dayjs";
import { Formik } from "formik";
import { LayoutCustom, Text } from "components";

// ----------------------------- Types ---------------------------------------
type FormikForm = {
  goal_name: string;
  start_date?: Date | undefined;
  completion_date?: Date | undefined;
};

const FirstStep = React.memo(({ onNext }: { onNext(): void }) => {
  const styles = useStyleSheet(themedStyles);

  const initValues: FormikForm = {
    goal_name: "",
    start_date: undefined,
    completion_date: undefined,
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={(values) => {
        console.log(values);
        onNext();
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values }) => {
        return (
          <>
            <LayoutCustom style={styles.container}>
              <LayoutCustom>
                <Text category="t4" marginVertical={24}>
                  Goal Detail
                </Text>
                <LayoutCustom gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    Goal Name
                  </Text>
                  <Input
                    placeholder="Enter goal name"
                    style={styles.input}
                    value={values.goal_name}
                    onBlur={handleBlur("goal_name")}
                    onChangeText={handleChange("goal_name")}
                  />
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    start date
                  </Text>
                  <Datepicker
                    placeholder="Select start date"
                    style={styles.input}
                    date={values.start_date}
                    status={
                      values.start_date === undefined ? "basic" : "primary"
                    }
                    onSelect={(date) =>
                      setFieldValue("start_date", new Date(date))
                    }
                  />
                </LayoutCustom>
                <LayoutCustom mt={16} gap={4}>
                  <Text category="c1" capitalize status="grey" marginLeft={8}>
                    completion date
                  </Text>
                  <Datepicker
                    placeholder="Select completion date"
                    style={styles.input}
                    date={values.completion_date}
                    min={values.start_date ? new Date(values.start_date) : null}
                    status={
                      values.completion_date === undefined ? "basic" : "primary"
                    }
                    onSelect={(date) =>
                      setFieldValue("completion_date", new Date(date))
                    }
                  />
                </LayoutCustom>
              </LayoutCustom>
              <Button children={"Next Step"} onPress={() => handleSubmit()} />
            </LayoutCustom>
          </>
        );
      }}
    </Formik>
  );
});

export default FirstStep;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    flexGrow: 1,
    justifyContent: "space-between",
  },
  content: {},
  input: {
    flex: 1,
  },
});
