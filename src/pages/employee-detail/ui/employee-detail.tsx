import { useEffect, useRef, useState } from "react";
import { Box, Group, Image, InputBase, SimpleGrid, Stack, Tabs, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
// import { IconPencil } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import classes from "./Employee-detail.module.css";
import { Select } from "@mantine/core";
import { CustomBreadcrumbs } from "@/shared/ui";
import { useGetUserById } from "@/entities/user/model/user.get-by-id.queries.ts";
import { useParams } from "react-router-dom";
import { IMaskInput } from "react-imask";

export type Employee = {
  id: number;
  name: string;
  sectionName: string;
  position: string;
  number: string;
  image: string;
};

export const EmployeeDetail = () => {
  const [activeTab, setActiveTab] = useState<string | null>("information");
  const phoneInputRef = useRef(null);

  const { id = "" } = useParams();

  const { data } = useGetUserById(id);

  const form = useForm({
    initialValues: {
      surname: data?.surname,
      name: data?.name,
      date: "",
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender,
    },
    validate: {
      surname: value => value.trim().length < 2,
      name: value => value.trim().length < 2,
      email: value => !/^\S+@\S+$/.test(value),
    },
  });

  useEffect(() => {
    form.setValues({
      surname: data?.surname,
      name: data?.name,
      date: "",
      email: data?.email,
      phone: data?.phone,
      gender: data?.gender,
    });
  }, [data]);

  const breadcrumbsList = [{ title: "Employee", href: "/employee" }];

  return (
    <div>
      <CustomBreadcrumbs title="Employee information" breadcrumbsList={breadcrumbsList} />

      <Tabs
        defaultValue="information"
        orientation="vertical"
        placement="right"
        style={{ flexDirection: "row", columnGap: "48px" }}
        value={activeTab}
        onChange={setActiveTab}>
        <Tabs.List fz="16px" fw={600} lh="24px" style={{ outline: "none", gap: "14px" }}>
          <Tabs.Tab value="information" style={{ outline: "none" }}>
            Personal information
          </Tabs.Tab>
          {/*<Tabs.Tab value="documents" style={{ outline: "none" }}>Documents</Tabs.Tab>*/}
          {/*<Tabs.Tab value="holidays" style={{ outline: "none" }}>Holidays</Tabs.Tab>*/}
          {/*<Tabs.Tab value="position" style={{ outline: "none" }}>Position</Tabs.Tab>*/}
        </Tabs.List>

        <Tabs.Panel value="information" className={classes.informationBox}>
          <Box className={classes.informationBg}></Box>
          <Stack className={classes.informationStack}>
            <Group justify="space-between">
              <Image w={120} h={120} src={data?.photoUrl} className={classes.informationAvatar} />
              {/*<Button*/}
              {/*  variant="transparent"*/}
              {/*  style={{ outline: "none", color: "#2e90fa" }}*/}
              {/*  // leftIcon={<IconEdit size={16} />}*/}
              {/*>*/}
              {/*  <IconPencil />*/}
              {/*  Data editing*/}
              {/*</Button>*/}
            </Group>

            <form onSubmit={form.onSubmit(() => {})}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl" style={{ columnGap: "32px", rowGap: "20px" }}>
                <TextInput label="Surname" placeholder="Dariene" {...form.getInputProps("surname")} readOnly variant="unstyled" />
                <TextInput label="Name" placeholder="Robertson" {...form.getInputProps("name")} readOnly variant="unstyled" />
                <DateInput label="Date of birth" placeholder="29.11.2002" valueFormat="DD/MM/YYYY" readOnly variant="unstyled" />
                <Select
                  label="Gender"
                  data={[
                    { value: "FEMALE", label: "Female" },
                    { value: "MALE", label: "Male" },
                  ]}
                  {...form.getInputProps("gender")}
                  readOnly
                  variant="unstyled"
                />
                <InputBase
                  label="Phone number"
                  component={IMaskInput}
                  mask="{+998} 00 000 00 00"
                  unmask
                  ref={phoneInputRef}
                  {...form.getInputProps("phone")}
                  {...{ lazy: false, placeholderChar: " " }}
                  onAccept={value => {
                    if (typeof value === "string") form.getInputProps("phone").onChange(value, value.length === 13);
                  }}
                  readOnly
                  variant="unstyled"
                />
                <TextInput label="Email" placeholder="example@gmail.com" {...form.getInputProps("email")} readOnly variant="unstyled" />
              </SimpleGrid>
            </form>
          </Stack>
        </Tabs.Panel>
        {/*<Tabs.Panel value="documents">Documents tab content</Tabs.Panel>*/}
        {/*<Tabs.Panel value="holidays">Holidays tab content</Tabs.Panel>*/}
        {/*<Tabs.Panel value="position">Positions tab content</Tabs.Panel>*/}
      </Tabs>
    </div>
  );
};
