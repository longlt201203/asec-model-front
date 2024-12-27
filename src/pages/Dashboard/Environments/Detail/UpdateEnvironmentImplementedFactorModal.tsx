import {
  Autocomplete,
  Button,
  Flex,
  Group,
  InputLabel,
  LoadingOverlay,
  Modal,
  ModalProps,
  Slider,
  Stack,
} from "@mantine/core";
import {
  Factor,
  ImplementedFactorDto,
  UpdateEnvironmentImplementedFactorDto,
  UpdateEnvironmentImplementedFactorRequestOperationEnum,
} from "../../../../types";
import { getFactors } from "../../../../queries/factor.queries";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

export interface UpdateEnvironmentImplementedFactorModalProps
  extends ModalProps {
  dto: UpdateEnvironmentImplementedFactorDto;
  loading?: boolean;
  onEnvironmentImplementedFactorUpdate: (
    dto: UpdateEnvironmentImplementedFactorDto
  ) => void;
}

export default function UpdateEnvironmentImplementedFactorModal(
  props: UpdateEnvironmentImplementedFactorModalProps
) {
  const form = useForm<ImplementedFactorDto>({
    mode: "uncontrolled",
  });

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

  const getFactorsInfo = useQuery({
    queryKey: ["factors"],
    queryFn: getFactors,
  });
  const dataMapByName: Record<string, Factor> = {};
  const dataMapById: Record<string, Factor> = {};
  getFactorsInfo.data?.forEach((item) => {
    dataMapByName[item.name] = item;
    dataMapById[item.id] = item;
  });

  useEffect(() => {
    form.setValues(props.dto.implementedFactor);
    if (dataMapById[props.dto.implementedFactor.factor])
      form.setFieldValue(
        "factor",
        dataMapById[props.dto.implementedFactor.factor].name
      );
  }, [props.opened]);

  useEffect(() => {
    if (getFactorsInfo.data) {
      getFactorsInfo.data.forEach((item) => {
        dataMapByName[item.name] = item;
        dataMapById[item.id] = item;
      });
    }
  }, [getFactorsInfo.data]);

  return (
    <Modal {...props} title={title}>
      <LoadingOverlay visible={props.loading} />
      <Stack>
        <Autocomplete
          placeholder="Select factor"
          disabled={getFactorsInfo.isLoading}
          data={Object.keys(dataMapByName)}
          maxDropdownHeight={200}
          label="Factor"
          onChange={(v) => {
            if (dataMapByName[v])
              form.setFieldValue("factor", dataMapByName[v].id);
          }}
        />
        <Flex direction="column">
          <InputLabel>Affect value</InputLabel>
          <Slider
            color="myColor"
            min={-100}
            max={100}
            defaultValue={0}
            key={form.key("value")}
            {...form.getInputProps("value")}
          />
        </Flex>
        <Group justify="end" gap="xs">
          <Button size="xs" variant="light" color="red" onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            size="xs"
            color="myColor"
            onClick={() => {
              props.onEnvironmentImplementedFactorUpdate({
                ...props.dto,
                implementedFactor: form.getValues(),
              });
            }}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
