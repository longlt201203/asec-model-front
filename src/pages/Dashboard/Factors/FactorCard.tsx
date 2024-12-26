import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ActionIcon, Card, Group, Text } from "@mantine/core";
import { Factor } from "../../../types";

export interface FactorCardProps {
  factor: Factor;
  onEdit?: (factor: Factor) => void;
  onDelete?: (factor: Factor) => void;
}

export default function FactorCard({
  factor,
  onEdit,
  onDelete,
}: FactorCardProps) {
  return (
    <Card shadow="sm">
      <Group justify="space-between">
        <Text>{factor.name}</Text>
        <Group gap="xs">
          <ActionIcon
            size="sm"
            variant="transparent"
            color="myColor"
            onClick={() => onEdit && onEdit(factor)}
          >
            <PencilSquareIcon className="size-4" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            variant="transparent"
            color="red"
            onClick={() => onDelete && onDelete(factor)}
          >
            <TrashIcon className="size-4" />
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}
