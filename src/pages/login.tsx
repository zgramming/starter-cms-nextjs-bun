import {
  Paper,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Container,
  Group,
  Anchor,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import classes from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email tidak valid"),
      password: (value) =>
        value.length < 6 ? "Password minimal 6 karakter" : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    // Implement login logic here
    console.log("Login:", values);

    // Simulate successful login and redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Selamat Datang!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Masuk ke akun Anda untuk melanjutkan
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email"
              placeholder="anda@email.com"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Password Anda"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Group justify="space-between" mt="lg">
              <Anchor component="button" type="button" c="dimmed" size="sm">
                Lupa password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Masuk
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
