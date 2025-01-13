import AddProject from "~/components/addProject";
import ProjectsGrid from "~/components/projectsGrid";
import { HydrateClient } from "~/trpc/server";

export default async function Dashboard() {  

  return (
    <>
    <HydrateClient>
      <div
      className="flex flex-col space-y-5 m-4"
      >
        <h1 
        className=" text-4xl"
        >Your Projects</h1>
        <AddProject/>
        <ProjectsGrid/>

      </div>

    </HydrateClient>
    </>
  );
}




