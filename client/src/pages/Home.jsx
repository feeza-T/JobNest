import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import TabCategories from "../components/TabCategories";
import WhyJobNest from "../components/WhyJobNest";

const Home = () => {
  const jobs = useLoaderData();

  console.log("Jobs from backend:", jobs);

  return (
    <div>
      <Banner />
      <TabCategories />
      <WhyJobNest></WhyJobNest>
      
    </div>
  );
};

export default Home;