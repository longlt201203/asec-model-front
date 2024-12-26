import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Text,
} from "@mantine/core";
import { Environment } from "../../../types";

export interface DeleteEnvironmentModalProps extends ModalProps {
  environment: Environment;
  onEnvironmentDeleteConfirm: (environment: Environment) => void;
  loading?: boolean;
}

export default function DeleteEnvironmentModal(
  props: DeleteEnvironmentModalProps
) {
  return (
    <Modal {...props} title="Delete Environment">
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <Text>
          Are you sure you want to delete environment{" "}
          <Text span fw="bold">
            {props.environment?.name}
          </Text>
          ?
        </Text>
        <Group justify="end" gap="xs">
          <Button
            size="xs"
            variant="light"
            color="myColor"
            onClick={props.onClose}
          >
            Cancel
          </Button>
          <Button
            size="xs"
            color="red"
            onClick={() => props.onEnvironmentDeleteConfirm(props.environment)}
          >
            Confirm
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
