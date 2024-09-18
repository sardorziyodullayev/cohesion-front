import { Button, Text, Select, SimpleGrid, Stack, TextInput, Box, Grid, ScrollArea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import classes from "./Employee-add.module.css";
import { CustomBreadcrumbs } from "@/shared/ui";
import { useGetAllDepartments } from "@/entities/department/model";
import { useGetAllPositions } from "@/entities/position/model";
import { z } from "zod";
import { useUserActions } from "@/entities/user/model";
import { notify } from "@/shared/lib/helpers";

const schema = z.object({
  surname: z.string().min(2, { message: "Surname must have at least 2 characters" }),
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  departmentId: z.string().min(1, { message: "Department is required" }),
  positionId: z.string().min(1, { message: "Position is required" }),
});

export const EmployeeAdd = () => {
  const { data: departments } = useGetAllDepartments();
  const { data: positions } = useGetAllPositions();

  const { addUser } = useUserActions();

  const form = useForm({
    initialValues: {
      surname: "",
      name: "",
      email: "",
      role: "",
      departmentId: 0,
      positionId: 0,
    },
    validate: zodResolver(schema),
  });

  const breadcrumbsList = [{ title: "Employee", href: "/employee" }];

  const handleSubmit = async values => {
    try {
      await addUser.mutateAsync(values).then(() => {
        notify("User successfully added", "lime");
        form.reset();
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box pos="relative" h="calc(100% - 10px)" style={{ overflow: "hidden" }}>
      <CustomBreadcrumbs title="Create a user" breadcrumbsList={breadcrumbsList} />
      <ScrollArea h="100%" w="100%">
        <Grid justify="center">
          <Grid.Col span={{ base: 12, md: 12, lg: 8 }}>
            <Stack className={classes.employeeAddBox}>
              <Text fz="24px" fw={600} lh="24px">
                Add an employee
              </Text>
              <Text fz="16px" fw={400} lh="24px">
                To add an employee, fill in the following information
              </Text>
              <form onSubmit={form.onSubmit(handleSubmit)}>
                <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl" style={{ columnGap: "32px", rowGap: "20px" }}>
                  <TextInput
                    withAsterisk
                    label="Surname"
                    placeholder="Enter last name"
                    name="surname"
                    variant="default"
                    {...form.getInputProps("surname")}
                  />
                  <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="Enter the name"
                    name="name"
                    variant="default"
                    {...form.getInputProps("name")}
                  />
                  <TextInput
                    withAsterisk
                    label="Email"
                    placeholder="Enter the employee's email"
                    name="email"
                    variant="default"
                    {...form.getInputProps("email")}
                  />
                  <Select
                    label="Role"
                    placeholder="Select the role of the employee"
                    data={["HR", "HEAD", "DIRECTOR", "EMPLOYEE"]}
                    {...form.getInputProps("role")}
                  />
                  <Select
                    withAsterisk
                    label="Department"
                    placeholder="Select a department"
                    data={departments?.map(item => ({ value: `${item.id}`, label: item.name }))}
                    {...form.getInputProps("departmentId")}
                  />
                  <Select
                    withAsterisk
                    label="Position"
                    placeholder="Position"
                    data={positions?.map(item => ({ value: `${item.id}`, label: item.name }))}
                    {...form.getInputProps("positionId")}
                  />
                </SimpleGrid>
                <Stack py="xl">
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button type="submit" variant="filled" radius="md" loading={addUser.isPending}>
                      Submit a request
                    </Button>
                  </div>
                </Stack>
              </form>
            </Stack>
          </Grid.Col>
        </Grid>
      </ScrollArea>
    </Box>
  );
};
