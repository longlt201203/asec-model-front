import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
  Text,
} from "@mantine/core";
import { Factor } from "../../../types";

export interface DeleteFactorModalProps extends ModalProps {
  factor: Factor;
  onFactorDeleteConfirm: (factor: Factor) => void;
  loading?: boolean;
}

export default function DeleteFactorModal(props: DeleteFactorModalProps) {
  return (
    <Modal {...props} title="Delete Factor">
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <Text>
          Are you sure you want to delete factor{" "}
          <Text span fw="bold">
            {props.factor?.name}
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
            onClick={() => props.onFactorDeleteConfirm(props.factor)}
          >
            Confirm
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
