import { NextResponse } from "next/server";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Mendapatkan data header
export async function GET() {
  const headerDocRef = doc(db, "header", "mainHeader");
  const headerSnapshot = await getDoc(headerDocRef);

  if (headerSnapshot.exists()) {
    return NextResponse.json({
      id: headerSnapshot.id,
      ...headerSnapshot.data(),
    });
  } else {
    return NextResponse.json(
      { message: "Header data not found" },
      { status: 404 }
    );
  }
}

// Menambahkan atau mengupdate header
export async function POST(request: Request) {
  const { logo, text, ctaLink } = await request.json();
  const headerDocRef = doc(db, "header", "mainHeader");

  // Periksa apakah dokumen sudah ada
  const headerSnapshot = await getDoc(headerDocRef);
  if (headerSnapshot.exists()) {
    // Jika dokumen sudah ada, update
    await updateDoc(headerDocRef, { logo, text, ctaLink });
    return NextResponse.json({ id: headerSnapshot.id, logo, text, ctaLink });
  } else {
    // Jika dokumen belum ada, buat baru
    const newHeader = await setDoc(headerDocRef, { logo, text, ctaLink });
    return NextResponse.json(
      { id: headerDocRef.id, logo, text, ctaLink },
      { status: 201 }
    );
  }
}

// Menghapus header (opsional, hanya jika diperlukan)
export async function DELETE(request: Request) {
  const headerDocRef = doc(db, "header", "mainHeader");
  await deleteDoc(headerDocRef);
  return NextResponse.json({ message: "Header deleted successfully" });
}
