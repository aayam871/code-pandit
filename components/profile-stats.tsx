"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { UserProfile } from "@/types/user";
import { Trophy, Star, Target, Calendar } from "lucide-react";

interface ProfileStatsProps {
  user: UserProfile;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const completedSubjects = Object.values(user.subjectProgress).filter(
    (subject) => subject.completed
  ).length;
  const totalSubjects = Object.keys(user.subjectProgress).length;
  const completionRate = Math.round((completedSubjects / totalSubjects) * 100);

  return (
    <div className="space-y-10 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-2">
          Your Profile
        </h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Track your coding journey and achievements
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Avatar Card */}
        <Card className="bg-black border border-green-500/30 shadow-lg">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{user.avatar}</div>
            <CardTitle className="text-xl text-green-400">
              {user.nickname}
            </CardTitle>
            <p className="text-gray-400 text-sm">Level {user.level} Developer</p>
          </CardHeader>
        </Card>

        {/* XP Card */}
        <Card className="bg-black border border-green-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Star className="w-5 h-5" />
              Experience Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">{user.totalXP}</div>
            <p className="text-gray-400 text-sm">Total XP Earned</p>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-1">
                Next Level: {user.level + 1}
              </p>
              <Progress value={((user.totalXP % 500) / 500) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Completion Card */}
        <Card className="bg-black border border-green-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Trophy className="w-5 h-5" />
              Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">{completionRate}%</div>
            <p className="text-gray-400 text-sm">
              {completedSubjects}/{totalSubjects} Subjects
            </p>
            <div className="mt-4">
              <Progress value={completionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Member Since Card */}
        <Card className="bg-black border border-green-500/30 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Calendar className="w-5 h-5" />
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-white mb-2">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <p className="text-gray-400 text-sm">Coding Journey Started</p>
          </CardContent>
        </Card>
      </div>

      {/* Subject Progress Section */}
      <Card className="bg-black border border-green-500/30 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Target className="w-5 h-5" />
            Subject Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(user.subjectProgress).map(([subject, progress]) => (
            <div key={subject} className="space-y-2">
              <div className="flex flex-wrap items-center justify-between">
                <span className="text-white font-medium capitalize">{subject}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={progress.completed ? "default" : "secondary"}>
                    {progress.completed
                      ? "Completed"
                      : `Level ${progress.level}/5`}
                  </Badge>
                  <span className="text-sm text-green-400">{progress.xp} XP</span>
                </div>
              </div>
              <Progress
                value={
                  progress.completed
                    ? 100
                    : (progress.level / 5) * 100
                }
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
