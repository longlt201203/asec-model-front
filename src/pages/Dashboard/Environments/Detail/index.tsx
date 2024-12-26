import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEnvironment,
  getEnvironment,
  updateEnvironment,
} from "../../../../queries/environment.query";
import { ActionIcon, Button, Group, Stack, Title } from "@mantine/core";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import EnvironmentModal from "../EnvironmentModal";
import { useDisclosure } from "@mantine/hooks";
import DashboardPageLoading from "../../../../components/DashboardPageLoading";
import DeleteEnvironmentModal from "../DeleteEnvironmentModal";
import {
  Environment,
  UpdateEnvironmentImplementedFactorDto,
  UpdateEnvironmentImplementedFactorRequestOperationEnum,
} from "../../../../types";
import { toast } from "react-toastify";
import UpdateEnvironmentImplementedFactorModal from "./UpdateEnvironmentImplementedFactorModal";
import { useState } from "react";

const emptyImplemetedFactorDto: UpdateEnvironmentImplementedFactorDto = {
  operation: UpdateEnvironmentImplementedFactorRequestOperationEnum.ADD,
  implementedFactor: {
    factor: "",
  },
};

export default function DashboardEnvironmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [environmentModalOpened, environmentModalControls] =
    useDisclosure(false);
  const [deleteEnvironmentModalOpened, deleteEnvironmentModalControls] =
    useDisclosure(false);
  const [
    updateEnvironmentImplementedFactorModalOpened,
    updateEnvironmentImplementedFactorModalControls,
  ] = useDisclosure(false);

  const [implemtedFactorDto, setImplementedFactorDto] = useState(
    emptyImplemetedFactorDto
  );

  const getEnvironmentInfo = useQuery({
    queryKey: ["environment", id],
    queryFn: async () => {
      if (!id) return undefined;
      return await getEnvironment(id);
    },
  });
  const environment = getEnvironmentInfo.data;

  const updateEnvironmentMutation = useMutation({
    mutationFn: updateEnvironment,
    onSuccess: () => {
      toast.success("Environment updated successfully");
      environmentModalControls.close();
      getEnvironmentInfo.refetch();
    },
    onError: () => {
      toast.error("Failed to update environment");
    },
  });
  const deleteEnvironmentMutation = useMutation({
    mutationFn: async (environment: Environment) => {
      deleteEnvironment(environment.id);
    },
    onSuccess: () => {
      toast.success("Environment deleted successfully");
      deleteEnvironmentModalControls.close();
      navigate("/environments");
    },
    onError: () => {
      toast.error("Failed to delete environment");
    },
  });

  return (
    <>
      {getEnvironmentInfo.isLoading ? (
        <DashboardPageLoading />
      ) : (
        environment && (
          <>
            <Stack>
              <Group>
                <Title order={1}>{environment.name}</Title>
                <Group gap="xs">
                  <ActionIcon
                    variant="outline"
                    color="myColor"
                    onClick={environmentModalControls.open}
                  >
                    <PencilSquareIcon className="size-4" />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
                    color="red"
                    onClick={deleteEnvironmentModalControls.open}
                  >
                    <TrashIcon className="size-4" />
                  </ActionIcon>
                </Group>
              </Group>
              <Group>
                <Button
                  color="myColor"
                  onClick={updateEnvironmentImplementedFactorModalControls.open}
                >
                  Add Factor
                </Button>
              </Group>
            </Stack>
            <EnvironmentModal
              environment={environment}
              opened={environmentModalOpened}
              onClose={environmentModalControls.close}
              onEnvironmentModalSubmit={updateEnvironmentMutation.mutate}
            />
            <DeleteEnvironmentModal
              environment={environment}
              opened={deleteEnvironmentModalOpened}
              onClose={deleteEnvironmentModalControls.close}
              onEnvironmentDeleteConfirm={deleteEnvironmentMutation.mutate}
            />
            <UpdateEnvironmentImplementedFactorModal
              dto={implemtedFactorDto}
              opened={updateEnvironmentImplementedFactorModalOpened}
              onClose={updateEnvironmentImplementedFactorModalControls.close}
            />
          </>
        )
      )}
    </>
  );
}
