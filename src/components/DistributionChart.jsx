"use client";

import { TrendingUp, Home } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useState, useMemo } from "react";

export function DistributionChart({ chartsData, loading, error }) {
  const chartData = useMemo(() => {
    if (!chartsData.length) return [];

    // Count properties by city
    const cityCounts = {};
    chartsData.forEach((item) => {
      const city = item.City || "Unknown";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    // Sort cities by count and take top 5
    const sortedCities = Object.entries(cityCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    // Colors for the chart (UAE-inspired colors)
    const colors = [
      "#16a34a", // Green for Dubai (most properties)
      "#2563eb", // Blue for Abu Dhabi
      "#7c3aed", // Purple for Sharjah
      "#ea580c", // Orange for Ajman
      "#dc2626", // Red for other/remaining
    ];

    // Create chart data
    return sortedCities.map(([city, count], index) => ({
      city: city,
      properties: count,
      fill: colors[index] || colors[colors.length - 1],
      percentage: Math.round((count / chartsData.length) * 100),
    }));
  }, [chartsData]);

  // Chart configuration
  const chartConfig = {
    properties: {
      label: "Properties",
    },
    dubai: {
      label: "Dubai",
      color: "#16a34a",
    },
    abuDhabi: {
      label: "Abu Dhabi",
      color: "#2563eb",
    },
    sharjah: {
      label: "Sharjah",
      color: "#7c3aed",
    },
    ajman: {
      label: "Ajman",
      color: "#ea580c",
    },
    other: {
      label: "Other",
      color: "#dc2626",
    },
  };

  // Calculate total properties and growth
  const totalProperties = useMemo(() => {
    return chartsData.length;
  }, [chartsData]);

  const growthRate = 12.5; // Simulated growth rate

  if (loading) {
    return (
      <Card className="flex flex-col border-green-200">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-green-700">
            Property Distribution
          </CardTitle>
          <CardDescription>Loading data...</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center h-[250px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-green-600 text-sm">
              Loading property data...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="flex flex-col border-red-200">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-red-700">Property Distribution</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center h-[250px]">
          <div className="text-center text-red-600">
            <p className="font-semibold">Failed to Load</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (chartData.length === 0) {
    return (
      <Card className="flex flex-col border-green-200">
        <CardHeader className="items-center pb-0">
          <CardTitle className="text-green-700">
            Property Distribution
          </CardTitle>
          <CardDescription>No data available</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0 flex items-center justify-center h-[250px]">
          <div className="text-center text-green-600">
            <p>No property data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col border-green-200">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-green-700 text-lg">
          UAE Property Distribution
        </CardTitle>
        <CardDescription className="text-center">
          Property listings by city
          <div className="flex items-center justify-center gap-2 mt-1">
            <Home className="h-4 w-4 text-green-600" />
            <span className="font-medium">
              {totalProperties.toLocaleString()} properties
            </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={40}
            outerRadius={120}
          >
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  nameKey="city"
                  formatter={(value, name, props) => {
                    const dataItem = props.payload;
                    return [
                      <div key={name} className="space-y-1">
                        <div className="font-semibold text-green-700">
                          {dataItem.city}
                        </div>
                        <div className="flex justify-between items-center">
                          <span>Properties:</span>
                          <span className="font-bold">{value}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Share:</span>
                          <span className="font-medium">
                            {dataItem.percentage}%
                          </span>
                        </div>
                      </div>,
                      "",
                    ];
                  }}
                />
              }
            />
            <RadialBar dataKey="properties" background>
              <LabelList
                position="insideStart"
                dataKey="city"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={10}
                formatter={(value) => {
                  // Shorten long city names
                  if (value === "Abu Dhabi") return "Abu Dhabi";
                  if (value === "Ras Al Khaimah") return "RAK";
                  if (value === "Umm Al Quwain") return "UAQ";
                  return value;
                }}
              />
              <LabelList
                position="center"
                dataKey="percentage"
                className="fill-white font-bold"
                fontSize={18}
                formatter={(value) => `${value}%`}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-3 text-sm pt-6">
        <div className="w-full space-y-2">
          {chartData.map((item, index) => (
            <div
              key={item.city}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <span className="font-medium">{item.city}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-600">
                  {item.properties} properties
                </span>
                <span className="font-semibold">{item.percentage}%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-green-700 leading-none font-medium mt-2">
          <TrendingUp className="h-4 w-4" />
          <span>Property listings up {growthRate}% this quarter</span>
        </div>
        <div className="text-muted-foreground leading-none text-xs">
          Based on {totalProperties.toLocaleString()} active rental listings
        </div>
      </CardFooter>
    </Card>
  );
}

export default DistributionChart;
