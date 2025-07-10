"use client";

import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  BookOpen,
  Gavel,
  FileText,
  Scale,
  Shield,
  Building,
  Home,
  Briefcase,
  Globe,
  Award,
  Users,
  AlertTriangle,
  FileSignature,
  ScrollText,
} from "lucide-react";
import { useState } from "react";

interface ChatSuggestionProps {
  onSelectSuggestion: (suggestion: string) => void;
}

export function ChatSuggestions({ onSelectSuggestion }: ChatSuggestionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "popular"
  );

  const categories = [
    {
      id: "popular",
      name: "Popular",
      icon: <Lightbulb className="h-4 w-4 mr-1.5 sm:mr-2" />,
    },
    {
      id: "contracts",
      name: "Contracts",
      icon: <FileText className="h-4 w-4 mr-1.5 sm:mr-2" />,
    },
    {
      id: "ip",
      name: "IP Law",
      icon: <BookOpen className="h-4 w-4 mr-1.5 sm:mr-2" />,
    },
    {
      id: "business",
      name: "Business",
      icon: <Scale className="h-4 w-4 mr-1.5 sm:mr-2" />,
    },
    {
      id: "litigation",
      name: "Litigation",
      icon: <Gavel className="h-4 w-4 mr-1.5 sm:mr-2" />,
    },
  ];

  // Icons for suggestions to make them visually distinct
  const suggestionIcons = {
    popular: [
      <Shield
        key="shield-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Award
        key="award-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Building
        key="building-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <FileSignature
        key="file-signature-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Home
        key="home-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
    ],
    contracts: [
      <FileSignature
        key="file-signature-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Users
        key="users-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <AlertTriangle
        key="alert-triangle-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Shield
        key="shield-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <ScrollText
        key="scroll-text-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
    ],
    ip: [
      <Award
        key="award-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Globe
        key="globe-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Lightbulb
        key="lightbulb-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <FileText
        key="file-text-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Shield
        key="shield-3"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
    ],
    business: [
      <Building
        key="building-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Users
        key="users-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Globe
        key="globe-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <AlertTriangle
        key="alert-triangle-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <FileText
        key="file-text-2"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
    ],
    litigation: [
      <Gavel
        key="gavel-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Scale
        key="scale-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <AlertTriangle
        key="alert-triangle-3"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <FileSignature
        key="file-signature-3"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
      <Briefcase
        key="briefcase-1"
        className="h-5 w-5 mr-2 sm:mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0"
      />,
    ],
  };

  const suggestions = {
    popular: [
      "What are the key elements of a valid contract?",
      "How can I protect my intellectual property?",
      "What's the difference between an LLC and a corporation?",
      "Can you help me understand non-compete agreements?",
      "What are my rights as a tenant?",
    ],
    contracts: [
      "Draft a simple NDA for a freelance project",
      "What clauses should be in my employment contract?",
      "How can I terminate a contract legally?",
      "Explain force majeure clauses and when they apply",
      "What makes a contract legally binding?",
    ],
    ip: [
      "How do I register a trademark for my business?",
      "What's the difference between copyright and trademark?",
      "How long does patent protection last?",
      "Can I use copyrighted material under fair use?",
      "How do I protect my app idea legally?",
    ],
    business: [
      "What legal documents do I need to start a small business?",
      "Explain the legal risks of hiring contractors vs employees",
      "What are my obligations for collecting sales tax?",
      "How do I handle a customer data breach?",
      "What should be in my website's terms of service?",
    ],
    litigation: [
      "What's the statute of limitations for breach of contract?",
      "How does small claims court work?",
      "What should I do if I receive a demand letter?",
      "Explain the discovery process in a lawsuit",
      "What are the steps in civil litigation?",
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-2">
      {/* Category selector - scrollable on mobile */}
      <div className="flex gap-2 mb-4 sm:mb-6 justify-start overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center shrink-0 ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                : "bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800"
            } rounded-full`}
          >
            {category.icon}
            <span className="whitespace-nowrap">{category.name}</span>
          </Button>
        ))}
      </div>

      {/* Suggestions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 w-full">
        {selectedCategory &&
          suggestions[selectedCategory as keyof typeof suggestions].map(
            (suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="p-3 sm:p-4 h-auto justify-start text-left bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/70 rounded-lg text-gray-200 transition-all"
                onClick={() => onSelectSuggestion(suggestion)}
              >
                <div className="flex items-start w-full overflow-hidden">
                  <div className="shrink-0">
                    {
                      suggestionIcons[
                        selectedCategory as keyof typeof suggestionIcons
                      ][index]
                    }
                  </div>
                  <span className="text-xs sm:text-sm break-words line-clamp-2 sm:line-clamp-none">
                    {suggestion}
                  </span>
                </div>
              </Button>
            )
          )}
      </div>
    </div>
  );
}
