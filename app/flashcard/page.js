'use client';

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { ChevronLeft, ChevronRight, RefreshCw, Trash2 } from 'lucide-react';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [collectionName, setCollectionName] = useState('');

    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcards() {
            if (!user || !search) return;

            const userDocRef = doc(collection(db, 'users'), user.id);
            const userDocSnap = await getDoc(userDocRef);

            if (!userDocSnap.exists()) return;

            const colRef = collection(userDocRef, search);
            const querySnapshot = await getDocs(colRef);
            const flashcardsList = [];

            querySnapshot.forEach((doc) => {
                flashcardsList.push({ id: doc.id, ...doc.data() });
            });

            setFlashcards(flashcardsList);
            setCollectionName(search);
        }

        getFlashcards();
    }, [user, search]);

    const handleCardClick = () => {
        setFlipped(!flipped);
    };

    const handleDelete = async (id) => {
        if (!user || !search) return;

        const userDocRef = doc(collection(db, 'users'), user.id);
        const flashcardDocRef = doc(userDocRef, search, id);

        try {
            await deleteDoc(flashcardDocRef);
            setFlashcards((prev) => prev.filter((card) => card.id !== id));
        } catch (error) {
            console.error("Error deleting flashcard:", error);
        }
    };

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
        setFlipped(false);
    };

    const prevCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
        setFlipped(false);
    };

    const shuffleCards = () => {
        setFlashcards([...flashcards].sort(() => Math.random() - 0.5));
        setCurrentCardIndex(0);
        setFlipped(false);
    };

    if (!isLoaded || !isSignedIn) {
        return null;
    }

    return (
        <div style={{ minHeight: 'calc(100vh - 80px)' }} className="bg-gradient-to-b from-[#F5E4EB] to-[#FAD2DF] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-[#6A1B4D] mb-12">
                    {collectionName} Flashcards
                </h1>
                {flashcards.length > 0 ? (
                    <>
                        <div className="relative h-96 w-full perspective mb-8">
                            <div
                                className={`absolute inset-0 w-full h-full preserve-3d cursor-pointer transition-transform duration-500 ${
                                    flipped ? 'rotate-y-180' : ''
                                }`}
                                onClick={handleCardClick}
                            >
                                <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-purple-400 to-pink-500 p-8 flex items-center justify-center rounded-2xl shadow-lg">
                                    <p className="text-white text-2xl font-semibold text-center">
                                        {flashcards[currentCardIndex].front}
                                    </p>
                                </div>
                                <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-400 to-purple-500  p-8 flex items-center justify-center rounded-2xl shadow-lg rotate-y-180">
                                    <p className="text-white text-2xl font-semibold text-center">
                                        {flashcards[currentCardIndex].back}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <button
                                onClick={prevCard}
                                className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                            >
                                <ChevronLeft size={24} className="mr-2" /> Previous
                            </button>
                            <span className="text-[#7e285e] font-semibold">
                                {currentCardIndex + 1} / {flashcards.length}
                            </span>
                            <button
                                onClick={nextCard}
                                className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                            >
                                Next <ChevronRight size={24} className="ml-2" />
                            </button>
                        </div>
                        <div className="flex justify-center space-x-4 mb-8">
                            <button
                                onClick={shuffleCards}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                            >
                                <RefreshCw size={24} className="mr-2" /> Shuffle
                            </button>
                            <button
                                onClick={() => handleDelete(flashcards[currentCardIndex].id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center"
                            >
                                <Trash2 size={24} className="mr-2" /> Delete
                            </button>
                        </div>
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h2 className="text-2xl font-bold text-[#7e285e] mb-4">Study Progress</h2>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-4">
                                <div className="bg-[#7e285e] h-2.5 rounded-full" style={{width: `${((currentCardIndex + 1) / flashcards.length) * 100}%`}}></div>
                            </div>
                            <p className="text-[#7e285e] font-semibold">
                                You&apos;ve studied {currentCardIndex + 1} out of {flashcards.length} cards
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="text-xl text-gray-600 mb-4">No flashcards found in this collection.</p>
                        <a
                            href="/collections"
                            className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-2 px-4 rounded-full transition duration-300 inline-block"
                        >
                            Back to Collections
                        </a>
                    </div>
                )}
            </div>
            
            
            <div className="mt-8 max-w-4xl mx-auto flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 text-center">
    <a
        href="/generate"
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
        Create New Flashcard
    </a>
    <a
        href="/flashcards"
        className="bg-[#7e285e] hover:bg-[#68234e] text-white font-bold py-2 px-4 rounded-full transition duration-300"
    >
        Back to Collections
    </a>
</div>

        </div>
    );
}