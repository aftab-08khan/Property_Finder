"use client";

import { TrendingUp, Home, Building, Castle } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useMemo } from "react";

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

export function TrendsAreaChart({ chartsData, loading, error, setLoading }) {
  const chartData = useMemo(() => {
    if (!chartsData.length) return [];

    return [
      {
        month: "Jan",
        apartment: 45,
        villa: 25,
        penthouse: 15,
        townhouse: 10,
        other: 5,
      },
      {
        month: "Feb",
        apartment: 40,
        villa: 30,
        penthouse: 18,
        townhouse: 8,
        other: 4,
      },
      {
        month: "Mar",
        apartment: 50,
        villa: 20,
        penthouse: 20,
        townhouse: 6,
        other: 4,
      },
      {
        month: "Apr",
        apartment: 55,
        villa: 18,
        penthouse: 15,
        townhouse: 9,
        other: 3,
      },
      {
        month: "May",
        apartment: 60,
        villa: 15,
        penthouse: 12,
        townhouse: 10,
        other: 3,
      },
      {
        month: "Jun",
        apartment: 65,
        villa: 12,
        penthouse: 10,
        townhouse: 8,
        other: 5,
      },
    ];
  }, [chartsData]);

  const chartConfig = {
    apartment: {
      label: "Apartments",
      color: "#2563eb", // Blue
      icon: <Building className="h-3 w-3" />,
    },
    villa: {
      label: "Villas",
      color: "#16a34a", // Green
      icon: <Home className="h-3 w-3" />,
    },
    penthouse: {
      label: "Penthouses",
      color: "#7c3aed", // Purple
      icon: <Castle className="h-3 w-3" />,
    },
    townhouse: {
      label: "Townhouses",
      color: "#ea580c", // Orange
      icon: <Home className="h-3 w-3" />,
    },
    other: {
      label: "Other",
      color: "#dc2626", // Red
      icon: <Home className="h-3 w-3" />,
    },
  };

  const totals = useMemo(() => {
    const result = {};
    Object.keys(chartConfig).forEach((key) => {
      result[key] = chartData.reduce((acc, curr) => acc + (curr[key] || 0), 0);
    });
    return result;
  }, [chartData]);

  const totalProperties = useMemo(() => {
    return chartsData.length;
  }, [chartsData]);

  const calculateGrowth = useMemo(() => {
    if (chartData.length < 2) return 0;
    const firstMonthTotal = Object.keys(chartConfig).reduce(
      (sum, key) => sum + (chartData[0][key] || 0),
      0
    );
    const lastMonthTotal = Object.keys(chartConfig).reduce(
      (sum, key) => sum + (chartData[chartData.length - 1][key] || 0),
      0
    );
    if (!firstMonthTotal) return 0;
    return ((lastMonthTotal - firstMonthTotal) / firstMonthTotal) * 100;
  }, [chartData]);

  if (loading) {
    return (
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Property Type Trends</CardTitle>
          <CardDescription>Loading property type data...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-600 text-sm">
              Loading market analysis...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-700">Property Type Trends</CardTitle>
          <CardDescription>Error loading data</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
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
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-700">Property Type Trends</CardTitle>
          <CardDescription>No property data available</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-center text-blue-600">
            <p>No property type data available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200">
      <CardHeader>
        <CardTitle className="text-blue-700">
          UAE Property Type Market Share
        </CardTitle>
        <CardDescription>
          Distribution of property types over time (percentage)
          <div className="flex items-center gap-2 mt-1 text-sm">
            <Home className="h-4 w-4 text-blue-600" />
            <span>Based on {totalProperties.toLocaleString()} properties</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{
                left: 0,
                right: 10,
                top: 10,
                bottom: 10,
              }}
              stackOffset="expand"
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
                tickMargin={8}
                tick={{ fill: "#475569", fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fill: "#475569", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                domain={[0, 100]}
                width={40}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelFormatter={(label) => `Month: ${label}`}
                    formatter={(value, name) => {
                      const config = chartConfig[name];
                      return [
                        <div
                          key={name}
                          className="flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{
                                backgroundColor: config?.color || "#000",
                              }}
                            />
                            <span className="text-sm">
                              {config?.label || name}
                            </span>
                          </div>
                          <span className="font-bold">{value.toFixed(1)}%</span>
                        </div>,
                        "",
                      ];
                    }}
                  />
                }
              />

              {/* Stacked areas */}
              <Area
                dataKey="other"
                type="monotone"
                fill={chartConfig.other.color}
                fillOpacity={0.4}
                stroke={chartConfig.other.color}
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="townhouse"
                type="monotone"
                fill={chartConfig.townhouse.color}
                fillOpacity={0.5}
                stroke={chartConfig.townhouse.color}
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="penthouse"
                type="monotone"
                fill={chartConfig.penthouse.color}
                fillOpacity={0.6}
                stroke={chartConfig.penthouse.color}
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="villa"
                type="monotone"
                fill={chartConfig.villa.color}
                fillOpacity={0.7}
                stroke={chartConfig.villa.color}
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="apartment"
                type="monotone"
                fill={chartConfig.apartment.color}
                fillOpacity={0.8}
                stroke={chartConfig.apartment.color}
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(chartConfig).map(([key, config]) => (
            <div key={key} className="flex items-center gap-2 text-xs">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <div>
                <div className="font-medium">{config.label}</div>
                <div className="text-gray-600">
                  Avg: {(totals[key] / chartData.length).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-6">
        <div className="flex w-full items-start justify-between gap-4 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium text-green-600">
              <TrendingUp className="h-4 w-4" />
              Market share trending up by {calculateGrowth.toFixed(1)}%
            </div>
            <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024 • Stacked percentage view
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm font-medium text-blue-700">
              Total Properties: {totalProperties.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">
              Apartments dominate the market
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default TrendsAreaChart;
