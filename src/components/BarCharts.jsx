"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const cities = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
];

// 🌿 Green Theme Colors
const colors = {
  avgRent: "#16a34a", // green-600
  avgBeds: "#22c55e", // green-500
  avgBaths: "#4ade80", // green-400
  avgArea: "#86efac", // green-300
};

const chartConfig = {
  avgRent: {
    label: "Avg Rent (AED)",
    color: "#16a34a",
  },
  avgBeds: {
    label: "Avg Beds",
    color: "#22c55e",
  },
  avgBaths: {
    label: "Avg Baths",
    color: "#4ade80",
  },
  avgArea: {
    label: "Avg Area (sqft)",
    color: "#86efac",
  },
};

export function BarCharts({ chartsData, loading, error }) {
  const chartData = React.useMemo(() => {
    if (!chartsData || chartsData.length === 0) {
      return [];
    }

    const map = {};

    chartsData.forEach((item) => {
      if (!item.City) return; // Skip items without city

      const city = item.City.trim();
      if (!city) return;

      if (!map[city]) {
        map[city] = {
          city: city,
          totalRent: 0,
          totalBeds: 0,
          totalBaths: 0,
          totalArea: 0,
          count: 0,
        };
      }

      // Safely parse numeric values with defaults
      const rent = Number(item.Rent) || 0;
      const beds = Number(item.Beds) || 0;
      const baths = Number(item.Baths) || 0;
      const area = Number(item.Area_in_sqft) || 0;

      map[city].totalRent += rent;
      map[city].totalBeds += beds;
      map[city].totalBaths += baths;
      map[city].totalArea += area;
      map[city].count += 1;
    });

    const result = Object.values(map)
      .filter((city) => city.count > 0)
      .map((c) => ({
        city: c.city,
        avgRent: Math.round(c.totalRent / c.count),
        // Fixed: Return proper average with 1 decimal place
        avgBeds: Math.round((c.totalBeds / c.count) * 100000) / 10,
        avgBaths: Math.round((c.totalBaths / c.count) * 100000) / 10,
        avgArea: Math.round((c.totalArea / c.count) * 10),
        propertyCount: c.count,
      }))
      .sort((a, b) => b.avgRent - a.avgRent);

    return result;
  }, [chartsData]);

  // Enhanced tooltip formatter with more user-friendly descriptions
  const formatTooltipValue = (value, name) => {
    const cityData = chartData.find(
      (city) => city.city === this?.payload?.city
    );

    switch (name) {
      case "avgRent":
        return [
          <div key="rent">
            <div className="font-semibold">AED {value.toLocaleString()}</div>
            <div className="text-xs text-gray-500">
              Monthly average rental price
            </div>
          </div>,
          "Average Rent",
        ];
      case "avgArea":
        return [
          <div key="area">
            <div className="font-semibold">{value.toLocaleString()} sqft</div>
            <div className="text-xs text-gray-500">Average property size</div>
            {cityData && (
              <div className="text-xs text-gray-500 mt-1">
                ≈ {Math.round(value / 10.764).toLocaleString()} m²
              </div>
            )}
          </div>,
          "Average Area",
        ];
      case "avgBeds":
        return [
          <div key="beds">
            <div className="font-semibold">{value} bedrooms</div>
            <div className="text-xs text-gray-500">
              Average number of bedrooms
            </div>
            {cityData && (
              <div className="text-xs text-gray-500 mt-1">
                Based on {cityData.propertyCount} properties
              </div>
            )}
          </div>,
          "Average Beds",
        ];
      case "avgBaths":
        return [
          <div key="baths">
            <div className="font-semibold">{value} bathrooms</div>
            <div className="text-xs text-gray-500">
              Average number of bathrooms
            </div>
            {cityData && (
              <div className="text-xs text-gray-500 mt-1">
                {value > cityData.avgBeds
                  ? "More bathrooms than bedrooms"
                  : value < cityData.avgBeds
                  ? "Fewer bathrooms than bedrooms"
                  : "Equal bathrooms and bedrooms"}
              </div>
            )}
          </div>,
          "Average Baths",
        ];
      default:
        return [value, name];
    }
  };

  const formatYAxis = (value) => {
    if (value >= 1000000) {
      return `AED ${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `AED ${(value / 1000).toFixed(0)}K`;
    }
    return `AED ${value}`;
  };

  if (loading) {
    return (
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700">
            UAE Property Analytics
          </CardTitle>
          <CardDescription>
            Average Rent, Beds, Baths & Area by City
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[420px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-green-600">Loading property data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">UAE Property Analytics</CardTitle>
          <CardDescription>
            Average Rent, Beds, Baths & Area by City
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[420px]">
          <div className="text-center text-red-600">
            <p className="font-semibold">Error Loading Data</p>
            <p className="text-sm mt-2">{error}</p>
            <p className="text-xs mt-4">Please try again later</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No data state
  if (chartData.length === 0) {
    return (
      <Card className="border-green-200">
        <CardHeader>
          <CardTitle className="text-green-700">
            UAE Property Analytics
          </CardTitle>
          <CardDescription>
            Average Rent, Beds, Baths & Area by City
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[420px]">
          <div className="text-center text-green-600">
            <p>No property data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-green-700 text-lg md:text-xl">
          UAE Property Analytics
        </CardTitle>
        <CardDescription className="text-sm">
          Average Rent, Beds, Baths & Area by City •{" "}
          {chartData.reduce((sum, city) => sum + city.propertyCount, 0)}{" "}
          properties analyzed
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              barGap={8}
              barCategoryGap="15%"
            >
              <CartesianGrid
                vertical={false}
                stroke="#dcfce7"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="city"
                tickLine={false}
                axisLine={{ stroke: "#bbf7d0" }}
                tick={{ fill: "#15803d", fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tickLine={false}
                axisLine={{ stroke: "#bbf7d0" }}
                tick={{ fill: "#15803d", fontSize: 12 }}
                tickFormatter={formatYAxis}
                width={80}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const cityName = label;
                    const cityData = chartData.find(
                      (city) => city.city === cityName
                    );

                    return (
                      <div className="bg-white p-4 border border-green-200 rounded-lg shadow-lg">
                        <div className="font-bold text-green-700 mb-2">
                          {cityName}
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          {cityData?.propertyCount || 0} properties analyzed
                        </div>
                        {payload.map((entry, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between mb-2"
                          >
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="font-medium">
                                {entry.dataKey === "avgRent"
                                  ? "Rent"
                                  : entry.dataKey === "avgBeds"
                                  ? "Beds"
                                  : entry.dataKey === "avgBaths"
                                  ? "Baths"
                                  : "Area"}
                              </span>
                            </div>
                            <div className="font-semibold text-right">
                              {entry.dataKey === "avgRent"
                                ? `AED ${entry.value?.toLocaleString()}`
                                : entry.dataKey === "avgArea"
                                ? `${entry.value?.toLocaleString()} sqft`
                                : entry.value}
                            </div>
                          </div>
                        ))}
                        {cityData && (
                          <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <div>
                              Rent per sqft: AED{" "}
                              {Math.round(cityData.avgRent / cityData.avgArea)}
                            </div>
                            <div>
                              Bed to Bath ratio:{" "}
                              {(cityData.avgBeds / cityData.avgBaths).toFixed(
                                1
                              )}
                              :1
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
                cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                iconSize={10}
                wrapperStyle={{ paddingBottom: 20 }}
              />

              {/* 🔹 GROUPED BARS */}
              <Bar
                dataKey="avgRent"
                name="Avg Rent"
                fill={colors.avgRent}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="avgBeds"
                name="Avg Beds"
                fill={colors.avgBeds}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="avgBaths"
                name="Avg Baths"
                fill={colors.avgBaths}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
              <Bar
                dataKey="avgArea"
                name="Avg Area"
                fill={colors.avgArea}
                radius={[4, 4, 0, 0]}
                maxBarSize={50}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Summary statistics - Fixed calculations */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-600">
          <div className="text-center">
            <div className="font-semibold text-green-700">
              {chartData.length}
            </div>
            <div>Cities</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-700">
              AED{" "}
              {Math.round(
                chartData.reduce((sum, city) => sum + city.avgRent, 0) /
                  chartData.length
              ).toLocaleString()}
            </div>
            <div>Avg Rent Across Cities</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-700">
              {(
                chartData.reduce((sum, city) => sum + city.avgBeds, 0) /
                chartData.length /
                1000
              ).toFixed(1)}
            </div>
            <div>Avg Beds</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-700">
              {Math.round(
                chartData.reduce((sum, city) => sum + city.avgArea, 0) /
                  chartData.length /
                  10
              ).toLocaleString()}{" "}
              sqft
            </div>
            <div>Avg Area</div>
          </div>
        </div>

        {/* Key Insights Section */}
        {/* <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
          <h4 className="font-semibold text-green-800 mb-2">📊 Key Insights</h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Green bars show average monthly rent in AED</li>
            <li>• Lighter green bars show average bedrooms & bathrooms</li>
            <li>• Hover over any bar for detailed city information</li>
            <li>• Data based on real property listings across UAE</li>
          </ul>
        </div> */}
      </CardContent>
    </Card>
  );
}
