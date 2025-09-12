"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Profile = {
   username: string;
   full_name: string | null;
   avatar_url: string | null;
   background_url: string | null;
};

type ProfileContextType = {
   profile: Profile | null;
   loading: boolean;
   refresh: () => Promise<void>;
};

const ProfileContext = createContext<ProfileContextType>({
   profile: null,
   loading: true,
   refresh: async () => {},
});

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
   children,
}) => {
   const [profile, setProfile] = useState<Profile | null>(null);
   const [loading, setLoading] = useState(true);

   const fetchProfile = async () => {
      setLoading(true);
      try {
         const res = await fetch("/api/profile", { cache: "no-store" });
         const json = await res.json();
         if (res.ok) {
            setProfile(json.data);
         }
      } catch (err) {
         console.error("Failed to fetch profile", err);
         setProfile(null);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      if (!profile) {
         fetchProfile();
      }
   }, []);

   return (
      <ProfileContext.Provider
         value={{ profile, loading, refresh: fetchProfile }}
      >
         {children}
      </ProfileContext.Provider>
   );
};

export const useProfile = () => useContext(ProfileContext);
