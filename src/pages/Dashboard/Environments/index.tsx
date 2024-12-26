import {
  Button,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import DashboardPageLoading from "../../../components/DashboardPageLoading";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createEnvironment,
  getEnvironments,
} from "../../../queries/environment.query";
import EnvironmentCard from "./EnvironmentCard";
import EnvironmentModal from "./EnvironmentModal";
import { Environment } from "../../../types";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";

const emptyEnvironment: Environment = {
  id: "",
  name: "",
  implementedFactors: [],
};

export default function DashboardEnvironmentsPage() {
  const [environmentModalOpened, environmentModalControls] =
    useDisclosure(false);
  const [currentEnvironment, setCurrentEnvironment] =
    useState<Environment>(emptyEnvironment);

  const openEnvironmentModal = (environment: Environment) => {
    setCurrentEnvironment(environment);
    environmentModalControls.open();
  };

  const getEnvironmentsInfo = useQuery({
    queryKey: ["getEnvironments"],
    queryFn: getEnvironments,
  });
  const createEnvironmentMutation = useMutation({
    mutationFn: async (environment: Environment) => {
      await createEnvironment(environment);
    },
    onSuccess: () => {
      toast.success("Environment created successfully");
      environmentModalControls.close();
      getEnvironmentsInfo.refetch();
    },
    onError: () => {
      toast.error("Failed to create environment");
    },
  });

  return (
    <>
      <Stack>
        <Title order={1}>Environments</Title>
        <Group>
          <Button
            color="myColor"
            size="sm"
            onClick={() => openEnvironmentModal(emptyEnvironment)}
          >
            Create
          </Button>
          <TextInput placeholder="Type something to search" />
        </Group>
        {getEnvironmentsInfo.isLoading ? (
          <DashboardPageLoading />
        ) : (
          <SimpleGrid
            cols={{ xs: 2, md: 3, lg: 4, xl: 5 }}
            spacing={{
              base: "xs",
              md: "sm",
              lg: "md",
            }}
            verticalSpacing="xs"
          >
            {getEnvironmentsInfo.data?.map((item) => (
              <EnvironmentCard key={item.id} environment={item} />
            ))}
          </SimpleGrid>
        )}
      </Stack>
      <EnvironmentModal
        opened={environmentModalOpened}
        onClose={environmentModalControls.close}
        environment={currentEnvironment}
        onEnvironmentModalSubmit={createEnvironmentMutation.mutate}
        loading={createEnvironmentMutation.isLoading}
      />
    </>
  );
}
