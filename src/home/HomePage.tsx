import { Footer, Nav, TestConfiguration, WritingTest } from "../components";

export const HomePage = () => {
  return (
    <div className="container mx-auto flex flex-col h-screen px-5 md:px-0">
      <header className=" flex flex-col justify-center ">
        <Nav />
        <TestConfiguration />
      </header>
      <main>
       <WritingTest/>
      </main>
      <Footer/>
    </div>
  );
};
