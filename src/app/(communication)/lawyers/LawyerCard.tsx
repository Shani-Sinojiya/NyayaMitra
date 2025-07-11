import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lawyer } from "./page";
import { Mail, Phone, MapPin, Calendar, Award } from "lucide-react";
import Link from "next/link";

export function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "…";
}

export function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <Card className="group bg-gradient-to-br from-background to-secondary/20 border rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Header Section */}
      <div className="relative p-4 pb-2 sm:p-6 sm:pb-3">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          {/* Profile Image */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full overflow-hidden border-4 border-background shadow-lg flex-shrink-0">
            <Image
              src={lawyer["Profile Pic URL"]}
              alt={lawyer["Full Name"]}
              fill
              sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Basic Info */}
          <div className="flex-1 text-center sm:text-left space-y-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-foreground truncate">
              {lawyer["Full Name"]}
            </h3>
            <p className="text-sm sm:text-base text-primary font-medium">
              {lawyer.Specialization}
            </p>

            {/* Winning Cases Badge */}
            <Badge
              variant="secondary"
              className="mt-2 text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 max-w-full"
              title={lawyer["Winning Cases (Highlights)"]}
            >
              <Award className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {truncateWords(lawyer["Winning Cases (Highlights)"], 8)}
              </span>
            </Badge>
          </div>
        </div>
      </div>

      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        {/* Contact Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{lawyer.Location}</span>
          </div>

          {/* Available Time */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{lawyer["Available Days/Time"]}</span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{lawyer["Contact No"]}</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span className="truncate" title={lawyer.Email}>
              {lawyer.Email}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-border">
          <Button variant="default" className="flex-1" asChild>
            <Link href={`tel:${lawyer["Contact No"]}`}>
              <Phone className="w-4 h-4 mr-2" />
              Contact
            </Link>
          </Button>
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`mailto:${lawyer.Email}`}>
              <Mail className="w-4 h-4 mr-2" />
              Email
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
