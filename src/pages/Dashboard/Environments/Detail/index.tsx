import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEnvironment,
  getEnvironment,
  updateEnvironment,
  updateEnvironmentImplementedFactor,
} from "../../../../queries/environment.query";
import {
  ActionIcon,
  Button,
  Group,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
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
import ImplementedFactorCard from "./ImplementedFactorCard";

const emptyImplemetedFactorDto: UpdateEnvironmentImplementedFactorDto = {
  operation: UpdateEnvironmentImplementedFactorRequestOperationEnum.ADD,
  implementedFactor: {
    factor: "",
    value: 0,
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

  const openUpdateImplementedFactorModal = (
    dto: UpdateEnvironmentImplementedFactorDto
  ) => {
    setImplementedFactorDto(dto);
    updateEnvironmentImplementedFactorModalControls.open();
  };

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
  const updateEnvironmentImplementedFactorMutation = useMutation({
    mutationFn: async (dto: UpdateEnvironmentImplementedFactorDto) => {
      if (!id) return;
      await updateEnvironmentImplementedFactor(id, dto);
    },
    onSuccess: () => {
      toast.success("Factor updated successfully");
      updateEnvironmentImplementedFactorModalControls.close();
      getEnvironmentInfo.refetch();
    },
    onError: () => {
      toast.error("Failed to update factor");
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
              <SimpleGrid
                cols={{ xs: 2, md: 3, lg: 4, xl: 5 }}
                spacing={{
                  base: "xs",
                  md: "sm",
                  lg: "md",
                }}
                verticalSpacing="xs"
              >
                {environment.implementedFactors.map((item) => (
                  <ImplementedFactorCard
                    key={item.id}
                    implementedFactor={item}
                    onEdit={(implementedFactor) =>
                      openUpdateImplementedFactorModal({
                        operation:
                          UpdateEnvironmentImplementedFactorRequestOperationEnum.UPDATE,
                        implementedFactor: {
                          factor: implementedFactor.factor?.id || "",
                          value: implementedFactor.value,
                        },
                      })
                    }
                    onDelete={(implementedFactor) => {}}
                  />
                ))}
              </SimpleGrid>
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
              onEnvironmentImplementedFactorUpdate={
                updateEnvironmentImplementedFactorMutation.mutate
              }
            />
          </>
        )
      )}
    </>
  );
}
