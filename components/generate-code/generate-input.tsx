"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Atom, SearchCheck, SendHorizonal } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

function GenerateInput() {
  const [searchInput, setSearchInput] = useState({
    ask: "",
    think: "",
  });

  const [activeTab, setActiveTab] = useState<"Search" | "Thinking">("Search");

  const input = activeTab === "Search" ? searchInput.ask : searchInput.think;

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = evt.target;
    setSearchInput((prev) => ({ ...prev, [name]: value }));
  };

  const onSearchQuery = () => {
    if (input.trim() === "") return;

    console.log(`Searching for: ${input}`);
    // Reset the input field after search
    setSearchInput({ ask: "", think: "" });
  };

  return (
    <div className="w-full border border-muted/50 rounded-lg bg-transparent p-2 ">
      <Tabs
        defaultValue="Search"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as "Search" | "Thinking")}
      >
        <TabsContent value="Search">
          <Textarea
            name="ask"
            value={searchInput.ask}
            placeholder="Ask anything..."
            className="resize-none border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none bg-transparent"
            onChange={handleChange}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                onSearchQuery();
              }
            }}
          />
        </TabsContent>
        <TabsContent value="Thinking">
          <Textarea
            name="think"
            value={searchInput.think}
            placeholder="Think Before..."
            className="resize-none border-0 focus-visible:ring-0 focus-visible:border-0 shadow-none bg-muted/50"
            onChange={handleChange}
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevent new line
                onSearchQuery();
              }
            }}
          />
        </TabsContent>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="Search" className="text-primary">
              <SearchCheck />
              Search
            </TabsTrigger>
            <TabsTrigger value="Thinking" className="text-primary">
              <Atom />
              Thinking
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={onSearchQuery}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            size={"sm"}
          >
            <SendHorizonal className="" />
          </Button>
        </div>
      </Tabs>
    </div>
  );
}

export default GenerateInput;
