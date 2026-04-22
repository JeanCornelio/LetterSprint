import { collection, query, orderBy, limit, getDocs, where, collectionGroup } from "firebase/firestore";
import { firebaseBD } from "./firebase.utils";
import { MODES } from "../constants";

const normalizeTimestamp = (value: unknown): unknown => {
  if (value && typeof value === 'object' && 'seconds' in value && 'nanoseconds' in value) {
    const timestamp = value as { seconds: number; nanoseconds: number };
    return new Date(timestamp.seconds * 1000).toISOString();
  }
  return value;
};

const normalizeData = (data: unknown): unknown => {
  if (!data || typeof data !== 'object') return data;
  const obj = data as Record<string, unknown>;
  const normalized: Record<string, unknown> = {};
  Object.keys(obj).forEach(key => {
    normalized[key] = normalizeTimestamp(obj[key]);
  });
  return normalized;
};

export const getTests = async (lmt: number = 5 , uid : string) => {
  
  const testsRef = collection(firebaseBD, "users", uid, "tests");
  
  const q = query(testsRef, orderBy("date"), limit(lmt));
  
  
const querySnapshot = await getDocs(q);
     
  return querySnapshot.docs.map(doc => normalizeData(doc.data()));
};


const getBestForMode  = async (modeSelected: string, uid: string, mode: string) =>{


  const timeQuery = query(
  collectionGroup(firebaseBD, "tests"), 
  where("userUid", "==", uid),
  where("modeSelected", "==", modeSelected),   
  where("mode", "==", mode), 
  orderBy("wpm", "desc"),
  limit(4))

  const querySnapshot = await getDocs(timeQuery);

  if(!querySnapshot.empty){
    return normalizeData(querySnapshot.docs[0].data());
  }

  return {
        modeSelected,
        wpm: null,
        precision: null,
        raw: null,
        uid: crypto.randomUUID(),
    }
}

export const getBestTimesAndWords = async (uid : string) => {


   const times = ["15 Seconds", "30 Seconds", "60 Seconds", "120 Seconds"];
   const words = ["10 Words", "25 Words", "50 Words", "100 Words"];
   const timeRecord = [];
   const wordRecord = [];

   for(const timeMode of times){
     const bestScore = await  getBestForMode(timeMode, uid, "Seconds")
    timeRecord.push(bestScore)
   }

    for(const wordMode of words){
     const bestScore = await  getBestForMode(wordMode, uid, "Words")
    wordRecord.push(bestScore)
   }


  return { timeRecord, wordRecord };
};





