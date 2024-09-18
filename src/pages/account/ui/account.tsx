import { Button, Text, Select, SimpleGrid, Stack, TextInput, InputBase } from "@mantine/core";
import { useRef } from "react";
import { useForm } from "@mantine/form";
import { IMaskInput } from "react-imask";
import classes from "./Account.module.css";

export const Account = () => {
  const phoneInputRef = useRef(null);

  const form = useForm({
    initialValues: {
      surname: "",
      name: "",
      email: "",
    },
    validate: {
      surname: value => value.trim().length < 2,
      name: value => value.trim().length < 2,
      email: value => !/^\S+@\S+$/.test(value),
    },
  });

  return (
    <div>
      <div style={{ padding: "30px 106px 57px" }}>
        <div className={classes.accountBox}>
          <Stack>
            <Text fz="24px" fw={600} lh="24px">
              Account
            </Text>
            <form onSubmit={form.onSubmit(() => {})}>
              <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl" style={{ columnGap: "32px", rowGap: "20px" }}>
                <TextInput
                  label="Familiya"
                  placeholder="Familiya kiriting"
                  name="surname"
                  variant="default"
                  {...form.getInputProps("surname")}
                />
                <TextInput label="Ism" placeholder="Ism kiriting" name="name" variant="default" {...form.getInputProps("name")} />
                <TextInput
                  label="Email"
                  placeholder="Email manzilini kiriting"
                  name="email"
                  variant="default"
                  {...form.getInputProps("email")}
                />
                <Select label="Jinsi" placeholder="Jinsni tanlang" data={["Ayol", "Erkak"]} withAsterisk />
                <InputBase
                  label="Telefon raqami"
                  component={IMaskInput}
                  mask="+998 00 000 00 00"
                  ref={phoneInputRef}
                  unmask={false}
                  {...form.getInputProps("phone")}
                  placeholder="+998 00 000 00 00"
                  withAsterisk
                />
              </SimpleGrid>
            </form>
            <Stack py="xl">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button w="156px" px="sm" variant="filled" color="indigo" radius="md">
                  Tahrirlash
                </Button>
              </div>
            </Stack>
          </Stack>
        </div>
      </div>
    </div>
  );
};
