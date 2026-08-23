import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";

const TabCategories = ({jobs}) => {
  return (
    <Tabs>
      <div className="container mx-auto px-6 py-10">

        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web</Tab>
            <Tab>Graphics</Tab>
            <Tab>Digital</Tab>
          </TabList>
        </div>

        {/* Web Development */}
        <TabPanel>
          <JobCard />
        </TabPanel>

        {/* Graphics Design */}
        <TabPanel>
          <JobCard />
        </TabPanel>

        {/* Digital Marketing */}
        <TabPanel>
          <JobCard />
        </TabPanel>

      </div>
    </Tabs>
  );
};

export default TabCategories;