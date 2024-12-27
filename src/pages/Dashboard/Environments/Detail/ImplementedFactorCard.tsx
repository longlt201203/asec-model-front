import {
  ActionIcon,
  Card,
  Group,
  Progress,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { ImplementedFactor } from "../../../../types";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

export interface ImplementedFactorCardProps {
  implementedFactor: ImplementedFactor;
  onEdit?: (implementedFactor: ImplementedFactor) => void;
  onDelete?: (implementedFactor: ImplementedFactor) => void;
}

export default function ImplementedFactorCard({
  implementedFactor,
  onDelete,
  onEdit,
}: ImplementedFactorCardProps) {
  return (
    <Card shadow="sm">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text>{implementedFactor.factor?.name}</Text>
          <Group gap="xs">
            <ActionIcon
              size="sm"
              variant="transparent"
              color="myColor"
              onClick={() => onEdit && onEdit(implementedFactor)}
            >
              <PencilSquareIcon className="size-4" />
            </ActionIcon>
            <ActionIcon
              size="sm"
              variant="transparent"
              color="red"
              onClick={() => onDelete && onDelete(implementedFactor)}
            >
              <TrashIcon className="size-4" />
            </ActionIcon>
          </Group>
        </Group>
        <Tooltip label={`Affect value: ${implementedFactor.value}`}>
          <Progress
            color="myColor"
            size="sm"
            value={(implementedFactor.value + 100) / 2}
            radius="xl"
          />
        </Tooltip>
      </Stack>
    </Card>
  );
}
