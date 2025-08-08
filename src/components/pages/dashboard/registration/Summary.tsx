"use client";

import { useState, useEffect } from "react";

import SearchableHeader from "@components/shared/form/Searched.header.input";

import RegisterCardSkeleton from "../../../shared/skeleton/RegisterCardSkeleton";

import RegisterCard, { RegisterItem } from "./RegisterCard";

const Summary = () => {
  const [registers, setRegisters] = useState<RegisterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock data
        const data: RegisterItem[] = [
          {
            title: "Training and Development Register",
            dueDate: "22-03-2024",
            status: "incomplete",
          },
          {
            title: "Employee and Worker Register",
            dueDate: "25-03-2024",
            status: "pending",
          },
          {
            title: "Health and Safety Register",
            dueDate: "29-03-2024",
            status: "pending",
          },
          {
            title: "Incident and Complaint Register",
            dueDate: "15-04-2024",
            status: "complete",
          },
        ];

        setRegisters(data);
      } catch (error) {
        console.error("Error fetching registers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRegisterClick = (index: number) => {
    console.log(`Register ${index} clicked`);
  };

  return (
    <div className="space-y-4">
      <SearchableHeader
        title="Summary"
        showSearch={true}
        searchValue={search}
        actions={{
          next: {
            show: true,
          },
          back: {
            show: true,
          },
        }}
        onSearchChange={(val:string)=>{setSearch(val)}}
        searchPlaceholder="Search"
        searchClassName=""
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array(4)
            .fill(0)
            .map((_, index) => <RegisterCardSkeleton key={index} />)
          : registers.map((register, index) => (
            <RegisterCard
              key={index}
              register={register}
              onClick={() => handleRegisterClick(index)}
            />
          ))}
      </div>
    </div>
  );
};

export default Summary;
