import ProjectsGrid from "~/components/projectsGrid";

export default async function Dashboard() { 


  return (
    <>
      <div
      className="flex flex-col space-y-5 m-4"
      >
        <h1 
        className=" text-4xl"
        >Your Projects</h1>
        <ProjectsGrid/>
      </div>
    </>
  );
}




