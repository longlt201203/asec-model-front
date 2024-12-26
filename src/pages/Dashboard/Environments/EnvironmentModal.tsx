import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from "@mantine/core";
import { Environment } from "../../../types";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export interface EnvironmentModalProps extends ModalProps {
  environment: Environment;
  loading?: boolean;
  onEnvironmentModalSubmit: (environment: Environment) => void;
}

export default function EnvironmentModal(props: EnvironmentModalProps) {
  const form = useForm<Environment>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    form.setValues(props.environment);
  }, [props.opened]);

  return (
    <Modal
      {...props}
      title={props.environment.id ? "Update Environment" : "Create Environment"}
    >
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <TextInput
          placeholder="Enter environment name..."
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <Group justify="end" gap="xs">
          <Button size="xs" variant="light" color="red" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            size="xs"
            color="myColor"
            onClick={() => {
              props.onEnvironmentModalSubmit(form.getValues());
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
