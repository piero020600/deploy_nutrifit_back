import { Request, Response } from 'express'
import User from '../models/User'

export const registerProfileVisit = async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { visitCount: 1 } }, 
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.status(200).json({
      message: 'Visita registrada',
      visitCount: user.visitCount
    })
  } catch (error) {
    return res.status(500).json({ message: 'Error al registrar la visita', error })
  }
}
