import React from "react";
import { BarCharts } from "../components/BarCharts";
import ContentWrapper from "../components/ContentWrapper";
import TrendsChart from "../components/TrendsChart";
import DistributionChart from "../components/DistributionChart";
import TrendsAreaChart from "../components/TrendsAreaChart";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
const Analysis = () => {
  const [chartsData, setChartsData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Fetch JSON with error handling
  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          "https://raw.githubusercontent.com/aftab-08khan/UAE_Rental_API/refs/heads/main/dubai_properties_small.json"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: expected array");
        }

        const validData = data.filter(
          (item) =>
            item &&
            item.City &&
            typeof item.Rent === "number" &&
            !isNaN(item.Rent)
        );

        if (validData.length === 0) {
          throw new Error("No valid property data found");
        }

        setChartsData(validData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to fetch data");
        setChartsData([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <ContentWrapper className="pt-8">
      <Link
        to="/"
        className="inline-flex pb-6 items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
      >
        <ArrowLeft size={16} /> Back to listings
      </Link>
      <div className=" flex flex-col gap-10">
        <BarCharts
          chartsData={chartsData}
          setChartsData={setChartsData}
          loading={loading}
          setLoading={setLoading}
          error={error}
          setError={setError}
        />
        <TrendsChart chartsData={chartsData} loading={loading} error={error} />
        <div className=" grid md:grid-cols-2 grid-cols-1 gap-6">
          <DistributionChart
            chartsData={chartsData}
            loading={loading}
            error={error}
          />
          <TrendsAreaChart
            chartsData={chartsData}
            loading={loading}
            error={error}
            setLoading={setLoading}
          />
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Analysis;
