"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Percent,
  Calendar,
  Home,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import ContentWrapper from "../components/ContentWrapper";

export default function PaymentPlanCalculator() {
  const [price, setPrice] = useState("");
  const [down, setDown] = useState(10);
  const [construction, setConstruction] = useState(60);
  const [handover, setHandover] = useState(30);
  const [months, setMonths] = useState(36);

  // UAE Common Payment Plans presets
  const paymentPlans = [
    { name: "50/50 Plan", down: 50, construction: 50, handover: 0 },
    { name: "60/40 Plan", down: 60, construction: 40, handover: 0 },
    { name: "70/30 Plan", down: 70, construction: 30, handover: 0 },
    { name: "20-80 Plan", down: 20, construction: 80, handover: 0 },
    { name: "Post Handover", down: 20, construction: 40, handover: 40 },
  ];

  const applyPlan = (plan) => {
    setDown(plan.down);
    setConstruction(plan.construction);
    setHandover(plan.handover);
  };

  const downAmount = (price * down) / 100 || 0;
  const constructionAmount = (price * construction) / 100 || 0;
  const handoverAmount = (price * handover) / 100 || 0;
  const monthly = months ? constructionAmount / months : 0;
  const total = downAmount + constructionAmount + handoverAmount;

  return (
    <ContentWrapper>
      <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex pb-6 items-center gap-2 text-sm text-gray-600 hover:text-emerald-600"
        >
          <ArrowLeft size={16} /> Back to listings
        </Link>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <Calculator className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              UAE Off-Plan Payment Calculator
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg pt-0 border-emerald-100">
                <CardHeader className="bg-emerald-50 py-4 rounded-t-lg">
                  <CardTitle className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                    <Percent className="h-5 w-5" />
                    Common UAE Payment Plans
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {paymentPlans.map((plan, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-auto py-3 hover:bg-emerald-50 hover:border-emerald-300"
                        onClick={() => applyPlan(plan)}
                      >
                        <div className="text-center">
                          <div className="font-semibold text-gray-800">
                            {plan.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {plan.down}/{plan.construction}/{plan.handover}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg pt-0 border-emerald-100">
                <CardHeader className="bg-emerald-50 py-4 rounded-t-lg">
                  <CardTitle className="text-xl font-bold text-emerald-800 flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Custom Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        Property Price (AED)
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">
                          AED
                        </span>
                        <Input
                          type="number"
                          placeholder="1,200,000"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="pl-12 text-lg py-6 border-emerald-200 focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Construction Period (Months)
                      </Label>
                      <Input
                        type="number"
                        value={months}
                        onChange={(e) => setMonths(e.target.value)}
                        className="text-lg py-6 border-emerald-200 focus:border-emerald-400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">
                        Down Payment ({down}%)
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="range"
                          min="0"
                          max="100"
                          value={down}
                          onChange={(e) => setDown(e.target.value)}
                          className="flex-1 accent-emerald-600"
                        />
                        <span className="w-16 text-center font-semibold text-emerald-700">
                          {down}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700 font-medium">
                        During Construction ({construction}%)
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="range"
                          min="0"
                          max="100"
                          value={construction}
                          onChange={(e) => setConstruction(e.target.value)}
                          className="flex-1 accent-emerald-600"
                        />
                        <span className="w-16 text-center font-semibold text-emerald-700">
                          {construction}%
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-gray-700 font-medium">
                        On Handover ({handover}%)
                      </Label>
                      <div className="flex items-center gap-3">
                        <Input
                          type="range"
                          min="0"
                          max="100"
                          value={handover}
                          onChange={(e) => setHandover(e.target.value)}
                          className="flex-1 accent-emerald-600"
                        />
                        <span className="w-16 text-center font-semibold text-emerald-700">
                          {handover}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Note: Total must equal 100% (Current:{" "}
                        {Number(down) + Number(construction) + Number(handover)}
                        %)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-xl pt-0 border-emerald-200 sticky top-24">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl py-4 font-bold flex items-center gap-3">
                    <CreditCard className="h-6 w-6" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Total Price */}
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <div className="text-sm text-emerald-800 font-medium">
                      Total Property Price
                    </div>
                    <div className="text-3xl font-bold text-emerald-700 mt-1">
                      AED {Number(price || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ResultItem
                      label="Down Payment"
                      amount={downAmount}
                      percentage={down}
                      color="from-emerald-500 to-emerald-600"
                    />
                    <ResultItem
                      label="During Construction"
                      amount={constructionAmount}
                      percentage={construction}
                      color="from-emerald-400 to-emerald-500"
                    />
                    <ResultItem
                      label="Monthly Installments"
                      amount={monthly}
                      details={`Over ${months} months`}
                      color="from-emerald-300 to-emerald-400"
                    />
                    <ResultItem
                      label="On Handover"
                      amount={handoverAmount}
                      percentage={handover}
                      color="from-emerald-200 to-emerald-300"
                    />
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-gray-700">Total Payment</span>
                      <span className="text-emerald-700">
                        AED {Number(total).toLocaleString()}
                      </span>
                    </div>

                    {price && (
                      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        <div className="font-medium mb-1">
                          📊 Payment Timeline:
                        </div>
                        <div>• Down Payment: Immediately</div>
                        <div>
                          • Monthly: {months} installments of AED{" "}
                          {Number(monthly).toLocaleString()}
                        </div>
                        <div>• Final Payment: On handover</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 pt-4">
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 text-lg font-semibold">
                      Download Payment Schedule
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50 h-12"
                    >
                      Contact Property Advisor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              💡 Important UAE Off-Plan Information
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-700">
                  RERA Protection
                </h4>
                <p className="text-gray-600 text-sm">
                  All off-plan projects in Dubai are protected by RERA's escrow
                  account system ensuring your payments are secure.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-700">
                  Payment Plans
                </h4>
                <p className="text-gray-600 text-sm">
                  Standard plans range from 50/50 to flexible post-handover
                  plans. Always verify with the developer.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-emerald-700">
                  Additional Costs
                </h4>
                <p className="text-gray-600 text-sm">
                  Remember to account for 4% Dubai Land Dept fee, agency fees
                  (2%), and maintenance charges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
}

function ResultItem({ label, amount, percentage, details, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-medium">{label}</span>
        <div className="text-right">
          <div className="font-bold text-gray-900">
            AED {Number(amount).toLocaleString()}
          </div>
          {percentage && (
            <div className="text-sm text-emerald-600">{percentage}%</div>
          )}
          {details && <div className="text-xs text-gray-500">{details}</div>}
        </div>
      </div>
      {percentage && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`bg-gradient-to-r ${color} h-2 rounded-full`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
