import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import type {
  ConceptProgress,
  EvidenceType,
  MasteryLevel,
  StudySession,
  UserData,
  UserSettings
} from "../types";
import { applySessionToUserData } from "../lib/progress";
import { createDefaultUserData, loadUserData, saveUserData } from "../lib/storage";

interface UserDataContextValue {
  data: UserData;
  setData: (data: UserData) => void;
  updateSettings: (settings: UserSettings) => void;
  updateConcept: (
    conceptId: string,
    change: Partial<ConceptProgress> & {
      mastery?: MasteryLevel;
      evidence?: EvidenceType[];
    }
  ) => void;
  addSession: (session: StudySession) => void;
  reset: () => void;
}

const UserDataContext = createContext<UserDataContextValue | null>(null);

export const UserDataProvider = ({ children }: PropsWithChildren) => {
  const [data, setDataState] = useState<UserData>(() => loadUserData());

  useEffect(() => {
    saveUserData(data);
  }, [data]);

  const setData = useCallback((next: UserData) => setDataState(next), []);

  const updateSettings = useCallback((settings: UserSettings) => {
    setDataState((current) => ({ ...current, settings }));
  }, []);

  const updateConcept = useCallback(
    (
      conceptId: string,
      change: Partial<ConceptProgress> & {
        mastery?: MasteryLevel;
        evidence?: EvidenceType[];
      }
    ) => {
      setDataState((current) => {
        const existing = current.conceptProgress[conceptId] ?? {
          conceptId,
          mastery: "not_started" as const,
          evidence: [],
          confidence: 3 as const
        };
        return {
          ...current,
          conceptProgress: {
            ...current.conceptProgress,
            [conceptId]: { ...existing, ...change, conceptId }
          }
        };
      });
    },
    []
  );

  const addSession = useCallback((session: StudySession) => {
    setDataState((current) => applySessionToUserData(current, session));
  }, []);

  const reset = useCallback(() => setDataState(createDefaultUserData()), []);

  const value = useMemo(
    () => ({ data, setData, updateSettings, updateConcept, addSession, reset }),
    [data, setData, updateSettings, updateConcept, addSession, reset]
  );

  return <UserDataContext.Provider value={value}>{children}</UserDataContext.Provider>;
};

export const useUserData = () => {
  const value = useContext(UserDataContext);
  if (!value) throw new Error("useUserData must be used inside UserDataProvider");
  return value;
};
