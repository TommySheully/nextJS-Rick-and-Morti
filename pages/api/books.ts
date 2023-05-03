// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const booksDB = [
  {id: 1, title: 'book1'},
  {id: 2, title: 'book2'},
  {id: 3, title: 'book3'},
]


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof booksDB>
) {
  if (req.method === 'GET') {

    let books = booksDB
    const term = req.query.term as string

    if (term) {
      books = books.filter(b => b.title.toLowerCase().includes(term.toLowerCase()))
    }
    res.status(200).json(books)
  }
}
