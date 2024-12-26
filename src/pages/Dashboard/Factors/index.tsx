import {
  Button,
  Group,
  SimpleGrid,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import FactorModal from "./FactorModal";
import { useDisclosure } from "@mantine/hooks";
import DeleteFactorModal from "./DeleteFactorModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFactor,
  deleteFactor,
  getFactors,
  updateFactor,
} from "../../../queries/factor.queries";
import DashboardPageLoading from "../../../components/DashboardPageLoading";
import { useState } from "react";
import { Factor } from "../../../types";
import { toast } from "react-toastify";
import FactorCard from "./FactorCard";

const emptyFactor: Factor = {
  id: "",
  name: "",
};

export default function DashboardFactorsPage() {
  const [factorModalOpened, factorModalControls] = useDisclosure(false);
  const [deleteFactorModalOpened, deleteFactorModalControls] =
    useDisclosure(false);
  const [currentFactor, setCurrentFactor] = useState<Factor>(emptyFactor);

  const openFactorModal = (factor: Factor) => {
    setCurrentFactor(factor);
    factorModalControls.open();
  };

  const openDeleteFactorModal = (factor: Factor) => {
    setCurrentFactor(factor);
    deleteFactorModalControls.open();
  };

  const getFactorsInfo = useQuery({
    queryKey: ["factors"],
    queryFn: getFactors,
    retry: 3,
  });

  if (getFactorsInfo.isError) {
    toast.error("Failed to load factors");
  }

  const factorMutation = useMutation({
    mutationFn: async (factor: Factor) => {
      if (factor.id) {
        await updateFactor(factor);
      } else {
        await createFactor(factor);
      }
    },
    onSuccess: () => {
      toast.success("Factor saved successfully");
      factorModalControls.close();
      getFactorsInfo.refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to save factor");
    },
  });

  const deleteFactorMutation = useMutation({
    mutationFn: async (factor: Factor) => {
      await deleteFactor(factor.id);
    },
    onSuccess: () => {
      toast.success("Factor deleted successfully");
      deleteFactorModalControls.close();
      getFactorsInfo.refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete factor");
    },
  });

  return (
    <>
      <Stack>
        <Title order={1}>Factors</Title>
        <Group>
          <Button
            color="myColor"
            size="sm"
            onClick={() => openFactorModal(emptyFactor)}
          >
            Create
          </Button>
          <TextInput placeholder="Type something to search" />
        </Group>
        {getFactorsInfo.isLoading ? (
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
            {getFactorsInfo.data?.map((item) => (
              <FactorCard
                key={item.id}
                factor={item}
                onEdit={openFactorModal}
                onDelete={openDeleteFactorModal}
              />
            ))}
          </SimpleGrid>
        )}
      </Stack>
      <FactorModal
        loading={factorMutation.isLoading}
        factor={currentFactor}
        opened={factorModalOpened}
        onClose={factorModalControls.close}
        onFactorModalSubmit={factorMutation.mutate}
      />
      <DeleteFactorModal
        loading={deleteFactorMutation.isLoading}
        factor={currentFactor}
        opened={deleteFactorModalOpened}
        onClose={deleteFactorModalControls.close}
        onFactorDeleteConfirm={deleteFactorMutation.mutate}
      />
    </>
  );
}
