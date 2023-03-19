import { Card, Navbar } from "../Components";

export const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-[calc(100vh-66px)] flex-wrap items-center justify-center gap-8 bg-neutral p-8">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
