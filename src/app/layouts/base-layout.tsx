// import { useUser } from "@/entities/user/model/user.queries";
// import { setUser } from "@/entities/user/model/userSlice";
// import { getSession } from "@/shared/lib/helpers/storage";
import { Announcement } from "@/shared/ui/announcement/announcement";
import { Layout } from "@/shared/ui/layout/layout";
import { Header } from "@/widgets/header";
import { Sidebar } from "@/widgets/sidebar";
// import { LoadingOverlay } from "@mantine/core";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

export const BaseLayout = () => {
  // const session = getSession();
  //
  // const { data, isLoading } = useUser(session?.userId || "");
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   if (data) {
  //     dispatch(setUser(data));
  //   }
  // }, [data, dispatch]);

  return (
    <>
      {/*<LoadingOverlay*/}
      {/*  visible={isLoading}*/}
      {/*  zIndex={1000}*/}
      {/*  overlayProps={{ blur: 1 }}*/}
      {/*/>*/}
      <Layout
        announcementSlot={
          <Announcement>
            <span>🚀&nbsp;&nbsp;An&nbsp;open source frontend application built with React and Feature-Sliced&nbsp;Design.</span>
          </Announcement>
        }
        sidebarSlot={<Sidebar />}
        headerSlot={<Header />}
      />
    </>
  );
};
