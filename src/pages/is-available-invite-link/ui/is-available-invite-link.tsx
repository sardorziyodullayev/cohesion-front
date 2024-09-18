import { Flex } from "@mantine/core";
import { TLoaderOverlay } from "@/shared/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAvailableInviteLink } from "@/entities/invite-link/model";

export const IsAvailableInviteLink = () => {
  const { inviteId = "" } = useParams();
  const navigate = useNavigate();

  const { data } = useGetAvailableInviteLink(inviteId);

  console.log(data);

  if (data?.statusCode === 200) {
    navigate(`signup/${inviteId}`);
  } else {
    navigate("signin");
  }

  return (
    <Flex h="100vh">
      <TLoaderOverlay />
    </Flex>
  );
};
