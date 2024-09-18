import { Box, Button, Grid, Group, Select, Stack, Text, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { z } from "zod";
import { useForm, zodResolver } from "@mantine/form";
import classes from "./Holidays-add.module.css";
import { CustomBreadcrumbs } from "@/shared/ui";
import { getSession, notify } from "@/shared/lib/helpers";
import { useEffect, useState } from "react";
import { calculateDaysBetween } from "@/features/holidays";
import { useHolidaysActions } from "@/entities/holidays/model/holidays.actions.queries.ts";

const holidaysAddSchema = z.object({
  employeeId: z.number().min(1, "Employee is required"),
  type: z.string().min(2, "Holiday type is required"),
  startDate: z.date({ invalid_type_error: "Invalid start date" }),
  endDate: z.date({ invalid_type_error: "Invalid end date" }),
  reason: z.string().min(2, "Reason is required"),
});
export const HolidaysAdd = () => {
  const [availableDays, setAvailableDays] = useState<number>();
  const session = getSession();

  const { addHoliday } = useHolidaysActions();

  const form = useForm({
    initialValues: {
      employeeId: session?.id,
      type: "",
      startDate: null,
      endDate: null,
      reason: "",
    },
    validate: zodResolver(holidaysAddSchema),
  });

  useEffect(() => {
    if (form.getInputProps("startDate").value && form.getInputProps("endDate").value) {
      const availableDays = calculateDaysBetween(form.getInputProps("startDate").value, form.getInputProps("endDate").value);
      setAvailableDays(availableDays);
    }
  }, [form]);

  const formatStartTime = (startTime: string | null): string | null => {
    return startTime ? new Date(startTime).toISOString() : null;
  };

  const handleSubmit = async (values: typeof form.values) => {
    const requestData = {
      ...values,
      startDate: formatStartTime(values.startDate),
      endDate: formatStartTime(values.endDate),
    };

    try {
      await addHoliday.mutateAsync(requestData).then(e => {
        if (e.statusCode === 200) {
          notify(e?.message, "lime");
          form.reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const breadcrumbsList = [{ title: "Holidays", href: "/holidays" }];

  return (
    <Box pos="relative" h="calc(100% - 10px)" style={{ overflow: "hidden" }}>
      <CustomBreadcrumbs title="Create a meeting" breadcrumbsList={breadcrumbsList} />

      <Grid align="start">
        <Grid.Col span={9}>
          <Stack className={classes.holidaysAddBox}>
            <Text fz="24px" fw="500" lh="32px">
              Add vacation
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack>
                <Textarea
                  withAsterisk
                  label="Reason for leave"
                  placeholder="Write the reason for the leave"
                  {...form.getInputProps("reason")}
                />
                <Group grow>
                  <DateInput
                    withAsterisk
                    clearable
                    label="Vacation start date"
                    placeholder="Vacation start date"
                    maxDate={form.getInputProps("endDate").value}
                    {...form.getInputProps("startDate")}
                  />
                  <DateInput
                    withAsterisk
                    clearable
                    label="Vacation end date"
                    placeholder="Vacation end date"
                    minDate={form.getInputProps("startDate").value}
                    {...form.getInputProps("endDate")}
                  />
                </Group>
                <Group grow>
                  <Select
                    withAsterisk
                    clearable
                    label="Total days of vacation"
                    data={[
                      { value: "VACATION", label: "Vacation" },
                      {
                        value: "SICK",
                        label: "Sick",
                      },
                      { value: "PERSONAL", label: "Personal" },
                      { value: "UNPAID", label: "Unpaid" },
                      {
                        value: "OTHER",
                        label: "Other",
                      },
                    ]}
                    placeholder="Select the type"
                    {...form.getInputProps("type")}
                  />
                </Group>
                <Button ta="center" type="submit" loading={addHoliday.isPending}>
                  Setting a vacation
                </Button>
              </Stack>
            </form>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          <Stack>
            <Stack className={classes.holidayBox}>
              <Text fs="14px" fw={500}>
                Available days
              </Text>
              <Text fz="24px" fw={500} c="#2E90FA">
                {availableDays} day
              </Text>
            </Stack>
            <Stack className={classes.holidayBox}>
              <Text fs="14px" fw={500}>
                Balance
              </Text>
              <Text fz="24px" fw={500} c="#2E90FA">
                0 sum
              </Text>
            </Stack>
          </Stack>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
