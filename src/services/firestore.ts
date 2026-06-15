import {
  collection,
  addDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "./firebase";
const normalizeClaim = (claim: string) => {
  return claim
    .toLowerCase()
    .trim()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ");
};
import { auth } from "./firebase";

export const saveVerificationResult = async (
  claim: string,
  result: any,
) => {
  try {
    const docRef = await addDoc(collection(db, "verifications"), {
      

      
  userId: auth.currentUser?.uid || null,
  userName: auth.currentUser?.displayName || null,
  userEmail: auth.currentUser?.email || null,
  

  claim,
  normalizedClaim: normalizeClaim(claim),

  verdict: result.verdict,
      confidenceScore: result.confidenceScore,
      trustScore: result.trustScore,

      explanation: result.explanation,
      failurePoints: result.failurePoints,

      timeline: result.timeline,
      sources: result.sources,

      verifiedCount: 1,

      createdAt: new Date().toISOString()
    });

    console.log("Verification saved:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Failed to save verification:", error);
    return null;
  }
};

export const getVerificationByClaim = async (claim: string) => {
  try {
    const normalizedClaim = normalizeClaim(claim);

    const q = query(
      collection(db, "verifications"),
      where("normalizedClaim", "==", normalizedClaim)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    return snapshot.docs[0].data();
  } catch (error) {
    console.error("Failed to fetch verification:", error);
    return null;
  }
};

export const getAllVerifications = async () => {
  try {
    if (!auth.currentUser) {
      return [];
    }

    const q = query(
      collection(db, "verifications"),
      where("userId", "==", auth.currentUser.uid)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};