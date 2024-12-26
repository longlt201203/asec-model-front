import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Factor } from "../../../types";
import { useEffect } from "react";

export interface FactorModalProps extends ModalProps {
  factor: Factor;
  onFactorModalSubmit: (factor: Factor) => void;
  loading?: boolean;
}

export default function FactorModal(props: FactorModalProps) {
  const form = useForm<Factor>({
    mode: "uncontrolled",
  });

  useEffect(() => {
    form.setValues(props.factor);
  }, [props.opened]);

  return (
    <Modal
      {...props}
      title={props.factor.id ? "Update Factor" : "Create Factor"}
    >
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <TextInput
          placeholder="Enter factor name..."
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
              props.onFactorModalSubmit(form.getValues());
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
