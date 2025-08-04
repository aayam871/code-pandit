"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { UserProfile } from "@/types/user";
import { Search, User } from "lucide-react";

interface UserSearchProps {
  currentUser: UserProfile;
}

export function UserSearch({ currentUser }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const results = users.filter(
      (user: UserProfile) =>
        user.id !== currentUser.id &&
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setSearchResults(results);
    setHasSearched(true);
  };

  const calculateProgress = (user: UserProfile) => {
    const subjectsCount = Object.keys(user.subjectProgress).length || 1;
    return (
      Object.values(user.subjectProgress).reduce((acc, subject) => {
        return acc + (subject.completed ? 100 : subject.level * 20);
      }, 0) / subjectsCount
    );
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-green-400 mb-4">
          Find Other Developers
        </h2>
        <p className="text-gray-400 text-lg">
          Connect with fellow learners and see their progress
        </p>
      </div>

      {/* Search Card */}
      <Card className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Search className="h-5 w-5" />
            Search Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              aria-label="Search users by name or nickname"
              placeholder="Search by name or nickname..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white focus:ring-green-500 focus:border-green-500 transition"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-500/50 transition"
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {hasSearched && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white">
            {searchResults.length > 0
              ? `Found ${searchResults.length} developer${
                  searchResults.length !== 1 ? "s" : ""
                }`
              : "No developers found"}
          </h3>

          {searchResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((user) => {
                const progress = calculateProgress(user);
                const completedSubjects = Object.values(
                  user.subjectProgress
                ).filter((s) => s.completed).length;

                return (
                  <Card
                    key={user.id}
                    className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 shadow-md hover:scale-[1.02] transition-transform"
                  >
                    <CardHeader className="text-center">
                      <div className="text-5xl mb-2 select-none">
                        {user.avatar}
                      </div>
                      <CardTitle className="text-lg text-green-400">
                        {user.nickname}
                      </CardTitle>
                      <p className="text-gray-400 text-sm truncate">
                        {user.name}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      {/* Level & XP */}
                      <div className="flex justify-between items-center">
                        <Badge
                          variant="secondary"
                          className="text-sm px-3 py-1"
                        >
                          Level {user.level}
                        </Badge>
                        <span className="text-sm text-green-400 font-semibold">
                          {user.totalXP} XP
                        </span>
                      </div>

                      {/* Overall Progress */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm text-gray-400 font-medium">
                          <span>Overall Progress</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress
                          value={progress}
                          className="h-2 rounded bg-gray-700"
                        />
                      </div>

                      {/* Subjects Completed */}
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">
                          {completedSubjects}
                        </div>
                        <p className="text-xs text-gray-400">
                          Subjects Completed
                        </p>
                      </div>

                      {/* Current Subject */}
                      <div className="text-center">
                        <Badge
                          variant="outline"
                          className="capitalize px-4 py-1 text-sm"
                        >
                          Current: {user.currentSubject || "N/A"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : null}
        </div>
      )}

      {/* Before Search - placeholder */}
      {!hasSearched && (
        <Card className="bg-gradient-to-br from-gray-900 to-black border border-green-500/30 shadow-md">
          <CardContent className="text-center py-16">
            <User className="h-16 w-16 text-gray-600 mx-auto mb-4 select-none" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Discover Other Developers
            </h3>
            <p className="text-gray-500">
              Search for other learners to see their coding journey and get
              inspired!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
