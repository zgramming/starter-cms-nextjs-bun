import {
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Box,
  Anchor,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { IconLogin } from "@tabler/icons-react";

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
    <Box
      display="flex"
      mih="100vh"
      style={{
        background: "linear-gradient(135deg, #22b573 0%, #148551 100%)",
      }}
    >
      {/* Left Side - Illustration */}
      <Box
        display="flex"
        p={rem(60)}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box ta="center" c="white">
          {/* Door Illustration with SVG */}
          <svg
            width="300"
            height="400"
            viewBox="0 0 300 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Wall */}
            <rect x="0" y="0" width="300" height="400" fill="#E8EFFE" />

            {/* Door Frame */}
            <rect x="80" y="80" width="140" height="280" fill="#B8C4E0" />

            {/* Door */}
            <rect
              x="100"
              y="100"
              width="100"
              height="260"
              fill="#5C6B8A"
              rx="4"
            />

            {/* Door Panels */}
            <rect
              x="110"
              y="110"
              width="80"
              height="100"
              fill="#4A5A75"
              rx="2"
            />
            <rect
              x="110"
              y="220"
              width="80"
              height="100"
              fill="#4A5A75"
              rx="2"
            />

            {/* Door Knob */}
            <circle cx="175" cy="250" r="6" fill="#2D3748" />
            <circle cx="175" y="270" r="3" fill="#2D3748" />

            {/* Person */}
            {/* Head */}
            <circle cx="240" y="200" r="25" fill="#8B7355" />
            {/* Hair */}
            <ellipse cx="240" cy="190" rx="27" ry="20" fill="#654321" />
            {/* Body */}
            <rect
              x="215"
              y="225"
              width="50"
              height="80"
              fill="#34495E"
              rx="8"
            />
            {/* Arms */}
            <rect
              x="180"
              y="240"
              width="45"
              height="15"
              fill="#34495E"
              rx="7"
              transform="rotate(-20 180 240)"
            />
            {/* Hand on door */}
            <circle cx="145" cy="200" r="12" fill="#D4A574" />
            {/* Legs */}
            <rect
              x="220"
              y="305"
              width="18"
              height="70"
              fill="#5D6D7E"
              rx="9"
            />
            <rect
              x="242"
              y="305"
              width="18"
              height="70"
              fill="#5D6D7E"
              rx="9"
            />
            {/* Shoes */}
            <ellipse cx="229" cy="380" rx="12" ry="8" fill="#2C3E50" />
            <ellipse cx="251" cy="380" rx="12" ry="8" fill="#2C3E50" />
          </svg>

          <Title
            order={1}
            mt="xl"
            size={rem(42)}
            fw={700}
            c="white"
            style={{
              textShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            Finexy
          </Title>
          <Text size="lg" mt="sm" c="rgba(255,255,255,0.9)" fw={500}>
            Modern Admin Dashboard
          </Text>
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        display="flex"
        bg="white"
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box w="100%" maw={rem(420)} p={rem(40)}>
          <Title order={2} size={rem(28)} fw={700} c="green.7" mb={rem(8)}>
            Login to Dashboard
          </Title>
          <Text size="sm" c="dimmed" mb="xl">
            Enter your credentials to access your account
          </Text>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Email Address"
              placeholder="example@email.com"
              size="md"
              required
              styles={{
                label: {
                  fontSize: rem(13),
                  fontWeight: 500,
                  color: "var(--mantine-color-gray-7)",
                  marginBottom: rem(8),
                },
                input: {
                  borderRadius: rem(8),
                  border: "1px solid var(--mantine-color-gray-3)",
                  padding: `${rem(12)} ${rem(16)}`,
                  fontSize: rem(14),
                  "&:focus": {
                    borderColor: "var(--mantine-color-green-5)",
                  },
                },
              }}
              {...form.getInputProps("email")}
            />

            <PasswordInput
              label="Password"
              placeholder="••••••••••"
              size="md"
              required
              mt="md"
              styles={{
                label: {
                  fontSize: rem(13),
                  fontWeight: 500,
                  color: "var(--mantine-color-gray-7)",
                  marginBottom: rem(8),
                },
                input: {
                  borderRadius: rem(8),
                  border: "1px solid var(--mantine-color-gray-3)",
                  padding: `${rem(12)} ${rem(16)}`,
                  fontSize: rem(14),
                  "&:focus": {
                    borderColor: "var(--mantine-color-green-5)",
                  },
                },
              }}
              {...form.getInputProps("password")}
            />

            <Box ta="right" mt="sm">
              <Anchor
                component="button"
                type="button"
                size="sm"
                c="green.5"
                fw={500}
              >
                Forgot password?
              </Anchor>
            </Box>

            <Button
              fullWidth
              size="md"
              mt="xl"
              type="submit"
              h={rem(48)}
              fz={rem(15)}
              fw={600}
              leftSection={<IconLogin size={20} />}
              style={{
                background: "linear-gradient(135deg, #22b573 0%, #148551 100%)",
                borderRadius: rem(8),
                boxShadow: "0 4px 12px rgba(34, 181, 115, 0.3)",
              }}
            >
              LOGIN
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
