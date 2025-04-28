import { db } from "../firebase/admin";

export async function getInterviewByUserId(userId) {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', String(userId))
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}


export async function getFeaturedInterviewByAdmin() {
    const interviews = await db
        .collection('interviews')
        .where('userId', '==', 'admin')
        .orderBy('createdAt', 'desc')
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
}