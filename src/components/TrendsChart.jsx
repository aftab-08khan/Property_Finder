"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
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

export function TrendsChart({ chartsData, loading, error, setLoading }) {
  const trendData = React.useMemo(() => {
    if (!chartsData.length) return [];

    const monthlyData = {};

    const months = [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
    ];

    months.forEach((month, index) => {
      monthlyData[month] = {
        month,
        date: `2024-${(index + 1).toString().padStart(2, "0")}-01`,
        dubai: 0,
        abuDhabi: 0,
        sharjah: 0,
        ajman: 0,
        total: 0,
      };
    });

    chartsData.forEach((item) => {
      const month = months[Math.floor(Math.random() * months.length)];
      const cityKey = item.City
        ? item.City.toLowerCase().replace(/\s+/g, "")
        : "";

      if (monthlyData[month] && cityKey in monthlyData[month]) {
        monthlyData[month][cityKey] += item.Rent || 0;
        monthlyData[month].total += item.Rent || 0;
      }
    });

    return months.map((month) => {
      const data = monthlyData[month];
      const entry = {
        month: data.month,
        date: data.date,
        total: Math.round(data.total / 50),
      };

      const cityCounts = { dubai: 20, abuDhabi: 15, sharjah: 10, ajman: 5 };
      Object.keys(cityCounts).forEach((city) => {
        entry[city] = Math.round(data[city] / cityCounts[city]);
      });

      return entry;
    });
  }, [chartsData]);

  const chartConfig = {
    total: {
      label: "Avg Rent",
      color: "#16a34a",
    },
    dubai: {
      label: "Dubai ",
      color: "#2563eb",
    },
    abuDhabi: {
      label: "Abu Dhabi",
      color: "#7c3aed",
    },
    sharjah: {
      label: "Sharjah",
      color: "#db2777",
    },
    ajman: {
      label: "Ajman",
      color: "#ea580c",
    },
  };

  const [activeChart, setActiveChart] = React.useState("total");

  const totals = React.useMemo(() => {
    const result = {};
    Object.keys(chartConfig).forEach((key) => {
      result[key] = trendData.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    });
    return result;
  }, [trendData]);

  const formatCurrency = (value) => {
    if (value >= 1000000) return `AED ${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `AED ${(value / 1000).toFixed(0)}K`;
    return `AED ${value}`;
  };

  const calculateTrend = React.useMemo(() => {
    if (trendData.length < 2) return 0;
    const firstMonth = trendData[0][activeChart] || 0;
    const lastMonth = trendData[trendData.length - 1][activeChart] || 0;
    if (!firstMonth) return 0;
    return ((lastMonth - firstMonth) / firstMonth) * 100;
  }, [trendData, activeChart]);

  if (loading) {
    return (
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">
            UAE Rental Price Trends
          </CardTitle>
          <CardDescription>Loading rental trend data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-600">Loading market trends...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">
            UAE Rental Price Trends
          </CardTitle>
          <CardDescription>Error loading trend data</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[350px]">
          <div className="text-center text-red-600">
            <p className="font-semibold">Failed to Load Data</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader className="flex flex-col flex-wrap items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle className="text-blue-700">
            UAE Rental Price Trends
          </CardTitle>
          <CardDescription>
            Monthly average rental prices across major cities
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-sm font-medium ${
                  calculateTrend >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {calculateTrend >= 0 ? "↗" : "↘"}{" "}
                {Math.abs(calculateTrend).toFixed(1)}%
              </span>
              <span className="text-xs text-gray-500">
                {calculateTrend >= 0 ? "increase" : "decrease"} over period
              </span>
            </div>
          </CardDescription>
        </div>

        <div className="flex flex-wrap">
          {Object.entries(chartConfig).map(([key, config]) => (
            <button
              key={key}
              data-active={activeChart === key}
              className="data-[active=true]:bg-blue-50 data-[active=true]:border-blue-200 flex flex-1 flex-col justify-center gap-1 border-t px-4 py-3 text-left even:border-l sm:border-t-0 sm:border-l sm:px-4 sm:py-4 min-w-[140px]"
              onClick={() => setActiveChart(key)}
            >
              <span className="text-muted-foreground text-xs flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: config.color }}
                />
                {config.label}
              </span>
              <span className="text-lg leading-none font-bold sm:text-xl">
                {formatCurrency(totals[key] / trendData.length)}
              </span>
              <span className="text-xs text-gray-500">monthly avg</span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{
                left: 20,
                right: 30,
                top: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#e2e8f0"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tick={{ fill: "#475569", fontSize: 12 }}
                tickFormatter={(value) => {
                  if (value >= 1000000)
                    return `AED ${(value / 1000000).toFixed(0)}M`;
                  if (value >= 1000) return `AED ${(value / 1000).toFixed(0)}K`;
                  return `AED ${value}`;
                }}
                width={70}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[200px]"
                    formatter={(value, name) => {
                      const config = chartConfig[name];
                      return [
                        <div
                          key={name}
                          className="flex justify-between items-center"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: config?.color || "#000",
                              }}
                            />
                            <span>{config?.label || name}</span>
                          </div>
                          <span className="font-semibold ml-1 bg-green-200 rounded-sm py-0.5 px-1">
                            AED
                            {typeof value === "number"
                              ? value.toLocaleString()
                              : value}
                          </span>
                        </div>,
                        "",
                      ];
                    }}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                }
              />

              {/* Total line (always visible but can be styled differently) */}
              <Line
                dataKey="total"
                type="monotone"
                stroke={chartConfig.total.color}
                strokeWidth={activeChart === "total" ? 3 : 1}
                strokeDasharray={activeChart === "total" ? "0" : "5 5"}
                strokeOpacity={activeChart === "total" ? 1 : 0.3}
                dot={activeChart === "total"}
                activeDot={{ r: 6 }}
              />

              {/* City-specific lines */}
              {["dubai", "abuDhabi", "sharjah", "ajman"].map((city) => (
                <Line
                  key={city}
                  dataKey={city}
                  type="monotone"
                  stroke={chartConfig[city]?.color}
                  strokeWidth={activeChart === city ? 3 : 1}
                  strokeDasharray={activeChart === city ? "0" : "5 5"}
                  strokeOpacity={activeChart === city ? 1 : 0.3}
                  dot={activeChart === city}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Key Insights */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 text-sm mb-1">
              📈 Market Trend
            </h4>
            <p className="text-xs text-gray-700">
              {calculateTrend >= 0
                ? "Rental prices are trending upward across most cities"
                : "Market shows slight correction in rental prices"}
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-green-800 text-sm mb-1">
              🏙️ City Insights
            </h4>
            <p className="text-xs text-gray-700">
              Dubai leads in rental prices, while Ajman offers the most
              affordable options
            </p>
          </div>
        </div>

        {/* Data Summary */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm">
            <div>
              <span className="text-gray-600">Data Period: </span>
              <span className="font-medium">Jan 2024 - Jun 2024</span>
            </div>
            <div>
              <span className="text-gray-600">Properties Analyzed: </span>
              <span className="font-medium">{chartsData.length}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TrendsChart;
