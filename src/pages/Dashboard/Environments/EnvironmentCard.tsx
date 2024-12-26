import { Card, Group, Text } from "@mantine/core";
import { Environment } from "../../../types";
import { Link } from "react-router-dom";

export interface EnvironmentCardProps {
  environment: Environment;
  onEdit?: (environment: Environment) => void;
  onDelete?: (environment: Environment) => void;
}

export default function EnvironmentCard({ environment }: EnvironmentCardProps) {
  return (
    <Card shadow="sm" component={Link} to={`/environments/${environment.id}`}>
      <Group justify="space-between">
        <Text>{environment.name}</Text>
      </Group>
    </Card>
  );
}
