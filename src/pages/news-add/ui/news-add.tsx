import { Button, MultiSelect, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { z } from "zod";
import classes from "./News-add.module.css";
import { useForm, zodResolver } from "@mantine/form";
import { CustomBreadcrumbs } from "@/shared/ui";
import { useGetAllDepartments } from "@/entities/department/model";
import { useNewsActions } from "@/entities/news/model/new.actions.queries.ts";
import { notify } from "@/shared/lib/helpers";

const newsSchema = z.object({
  title: z.string().min(5, "News name must be at least 5 characters long."),
  type: z.enum(["ALL", "BY_DEPARTMENT"], {
    errorMap: () => ({ message: "Please select a type." }),
  }),
  content: z.string().min(20, "Full information about the news should be at least 20 characters."),
});

export const NewsAdd = () => {
  const { data } = useGetAllDepartments();

  const { addNews } = useNewsActions();

  const form = useForm({
    validate: zodResolver(newsSchema),
    initialValues: {
      title: "",
      content: "",
      type: "",
      departmentIds: [],
    },
  });

  const processDepartmentIds = (values: typeof form.values) => {
    if (values.departmentIds.length > 0) {
      return values.departmentIds;
    }
    return undefined;
  };

  const handleSubmit = async (values: typeof form.values) => {
    const submissionData = {
      ...values,
      departmentIds: processDepartmentIds(values),
    };

    if (!submissionData.departmentIds) {
      delete submissionData.departmentIds;
    }

    try {
      await addNews.mutateAsync(values).then(e => {
        if (e.statusCode === 200) {
          notify(e?.message, "lime");
          form.reset();
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const breadcrumbsList = [{ title: "News", href: "/news" }];

  return (
    <div>
      <CustomBreadcrumbs title="Add news" breadcrumbsList={breadcrumbsList} />

      <Stack className={classes.newsAddBox}>
        <Text fz="24px" fw="500" lh="32px">
          Add news
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput withAsterisk label="News name" placeholder="Enter the name of the news..." {...form.getInputProps("title")} />
            <Select
              withAsterisk
              clearable
              label="Type of news"
              placeholder="Choose"
              data={[
                { value: "ALL", label: "All" },
                { value: "BY_DEPARTMENT", label: "By department" },
              ]}
              {...form.getInputProps("type")}
            />
            {form.getInputProps("type").value === "BY_DEPARTMENT" && (
              <MultiSelect
                clearable
                label="Department"
                placeholder="Select a department"
                data={data?.map((item: { name: string; id: number }) => ({
                  label: item.name,
                  value: `${item.id}`,
                }))}
                hidePickedOptions
                {...form.getInputProps("departmentIds")}
              />
            )}
            <Textarea
              withAsterisk
              label="About the news"
              placeholder="Write about the news..."
              rows={4}
              {...form.getInputProps("content")}
            />

            <Button type="submit" loading={addNews.isPending}>
              Add news
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};
