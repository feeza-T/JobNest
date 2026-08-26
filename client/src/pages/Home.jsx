import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import TabCategories from "../components/TabCategories";

const Home = () => {
  const jobs = useLoaderData();

  console.log("Jobs from backend:", jobs);

  return (
    <div>
      <Banner />
      <TabCategories />
    </div>
  );
};

export default Home;