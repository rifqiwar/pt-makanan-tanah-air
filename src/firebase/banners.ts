import { NextResponse } from 'next/server';
// import { db } from '../../../lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

// Mendapatkan semua banner
export async function GET() {
  const bannersCollection = collection(db, 'banners');
  const snapshot = await getDocs(bannersCollection);
  const banners = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return NextResponse.json(banners);
}

// Menambahkan banner baru
export async function POST(request: Request) {
  const { title, description, imageUrl } = await request.json();
  const bannersCollection = collection(db, 'banners');
  const newBanner = await addDoc(bannersCollection, { title, description, imageUrl });
  return NextResponse.json({ id: newBanner.id, title, description, imageUrl }, { status: 201 });
}

// Mengupdate banner berdasarkan ID
export async function PUT(request: Request) {
  const { id, title, description, imageUrl } = await request.json();
  const bannerRef = doc(db, 'banners', id);
  await updateDoc(bannerRef, { title, description, imageUrl });
  return NextResponse.json({ id, title, description, imageUrl });
}

// Menghapus banner berdasarkan ID
export async function DELETE(request: Request) {
  const { id } = await request.json();
  const bannerRef = doc(db, 'banners', id);
  await deleteDoc(bannerRef);
  return NextResponse.json({ id });
}
