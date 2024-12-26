import {
  Autocomplete,
  LoadingOverlay,
  Modal,
  ModalProps,
  Stack,
} from "@mantine/core";
import {
  UpdateEnvironmentImplementedFactorDto,
  UpdateEnvironmentImplementedFactorRequestOperationEnum,
} from "../../../../types";

export interface UpdateEnvironmentImplementedFactorModalProps
  extends ModalProps {
  dto: UpdateEnvironmentImplementedFactorDto;
  loading?: boolean;
}

export default function UpdateEnvironmentImplementedFactorModal(
  props: UpdateEnvironmentImplementedFactorModalProps
) {
  let title = "";
  switch (props.dto.operation) {
    case UpdateEnvironmentImplementedFactorRequestOperationEnum.ADD:
      title = "Add Factor";
      break;
    case UpdateEnvironmentImplementedFactorRequestOperationEnum.REMOVE:
      title = "Remove Factor";
      break;
    case UpdateEnvironmentImplementedFactorRequestOperationEnum.UPDATE:
      title = "Update Factor";
      break;
  }

  return (
    <Modal {...props} title={title}>
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <Autocomplete placeholder="Select factor" />
      </Stack>
    </Modal>
  );
}
