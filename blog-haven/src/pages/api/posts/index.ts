import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { title, content, authorId, tags, imageUrls } = req.body;
        try {
            const newPost = await prisma.post.create({
                data: {
                    title,
                    content,
                    authorId,
                    tags,
                    imageUrls,
                },
            });
            res.status(201).json(newPost);
        } catch (error) {
            res.status(500).json({ error: 'Error creating post' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
